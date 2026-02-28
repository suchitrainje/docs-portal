import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Feedback from "@/components/Feedback";
export const revalidate = 60;

/* ===============================
   Generate Static Paths (ISR)
================================ */
export async function generateStaticParams() {
  const docsRoot = path.join(process.cwd(), "_docs");

  if (!fs.existsSync(docsRoot)) return [];

  const locales = fs.readdirSync(docsRoot);

  const params: {
    locale: string;
    version: string;
    slug: string;
  }[] = [];

  locales.forEach((locale) => {
    const localePath = path.join(docsRoot, locale);
    if (!fs.statSync(localePath).isDirectory()) return;

    const versions = fs.readdirSync(localePath);

    versions.forEach((version) => {
      const versionPath = path.join(localePath, version);
      if (!fs.statSync(versionPath).isDirectory()) return;

      const files = fs.readdirSync(versionPath);

      files.forEach((file) => {
        if (file.endsWith(".md")) {
          const slug = file.replace(".md", "");
          params.push({ locale, version, slug });
        }
      });
    });
  });

  return params;
}

/* ===============================
   Page Component
================================ */
export default async function DocPage({
  params,
}: {
  params: Promise<{
    locale: string;
    version: string;
    slug: string;
  }>;
}) {
  const { locale, version, slug } = await params;

  if (!locale || !version || !slug) {
    return <div>Invalid parameters</div>;
  }

  const filePath = path.join(
    process.cwd(),
    "_docs",
    locale,
    version,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return <div>Document not found</div>;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <div className="prose max-w-none p-6">
      <div
        data-testid="doc-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <Feedback />
    </div>
  );
}