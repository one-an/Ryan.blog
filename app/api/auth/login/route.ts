import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/admin-auth";
import https from "https";

// In-memory rate limiter (resets on restart, fine for single-instance blog)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;  // max requests
const RATE_WINDOW = 60_000; // per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function httpsRequest(
  url: string,
  options: https.RequestOptions & { body?: string }
): Promise<{ status: number; data: any }> {
  // Only skip TLS verification when behind local proxy (GitHub API via proxy)
  const behindProxy = !!process.env.https_proxy;

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { ...options, rejectUnauthorized: !behindProxy },
      (res) => {
        let respBody = "";
        res.on("data", (chunk) => (respBody += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode || 500, data: JSON.parse(respBody) });
          } catch {
            resolve({ status: res.statusCode || 500, data: respBody });
          }
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
    if (options.body) req.write(options.body);
    req.end();
  });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  // Step 1: no code → redirect to GitHub
  if (!code) {
    const clientId = process.env.GITHUB_ID;
    if (!clientId) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }
    const redirectUri = `${req.nextUrl.origin}/api/auth/login`;
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
    return NextResponse.redirect(githubUrl);
  }

  // Step 2: rate limit
  const ip = req.headers.get("x-forwarded-for") ||
             req.headers.get("x-real-ip") ||
             "127.0.0.1";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    // Exchange code for access token
    const tokenResult = await httpsRequest(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_ID,
          client_secret: process.env.GITHUB_SECRET,
          code,
        }),
      }
    );

    const accessToken = tokenResult.data.access_token;
    if (!accessToken) {
      return NextResponse.json(
        { error: "GitHub OAuth failed" },
        { status: 401 }
      );
    }

    // Get GitHub user
    const userResult = await httpsRequest("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "april-blog",
      },
    });

    const user = userResult.data;

    if (user.login !== process.env.GITHUB_ALLOWED_USER) {
      return NextResponse.json(
        { error: `User ${user.login} not allowed` },
        { status: 403 }
      );
    }

    // Sign JWT and set cookie
    const jwt = await signToken(user.login);
    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.redirect(new URL("/admin/posts", req.url));
    response.cookies.set("admin_token", jwt, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
