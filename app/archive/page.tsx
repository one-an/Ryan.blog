import { getArchive } from "@/lib/posts";
import ArchivePageClient from "./ArchivePageClient";

export default function ArchivePage() {
  const archive = getArchive();
  const years = Array.from(archive.keys()).sort((a, b) => b - a);
  const archiveData = years.map((year) => ({
    year,
    posts: archive.get(year)!,
  }));

  return <ArchivePageClient archiveData={archiveData} />;
}
