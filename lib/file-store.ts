import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "content");

function safePath(filename: string): string {
  const resolved = path.resolve(DATA_DIR, filename);
  if (!resolved.startsWith(DATA_DIR)) {
    throw new Error("Invalid file path");
  }
  return resolved;
}

export function readJsonFile<T>(filename: string, fallback: T): T {
  const filePath = safePath(filename);
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = safePath(filename);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function writeTextFile(filepath: string, content: string): void {
  const fullPath = path.join(process.cwd(), filepath);
  const resolved = path.resolve(fullPath);
  if (!resolved.startsWith(path.join(process.cwd(), "content"))) {
    throw new Error("Invalid file path");
  }
  const dir = path.dirname(resolved);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(resolved, content, "utf-8");
}

export function deleteFile(filepath: string): void {
  const fullPath = path.join(process.cwd(), filepath);
  const resolved = path.resolve(fullPath);
  if (!resolved.startsWith(path.join(process.cwd(), "content"))) {
    throw new Error("Invalid file path");
  }
  if (fs.existsSync(resolved)) {
    fs.unlinkSync(resolved);
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
