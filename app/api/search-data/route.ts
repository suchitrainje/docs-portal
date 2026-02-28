import fs from "fs";
import path from "path";

export async function GET() {
  const docsRoot = path.join(process.cwd(), "_docs");

  const docs: any[] = [];

  const locales = fs.readdirSync(docsRoot);

  locales.forEach((locale) => {
    const localePath = path.join(docsRoot, locale);
    const versions = fs.readdirSync(localePath);

    versions.forEach((version) => {
      const versionPath = path.join(localePath, version);
      const files = fs.readdirSync(versionPath);

      files.forEach((file) => {
        if (file.endsWith(".md")) {
          const filePath = path.join(versionPath, file);
          const content = fs.readFileSync(filePath, "utf8");

          docs.push({
            id: `${locale}-${version}-${file}`,
            title: file.replace(".md", ""),
            content,
            url: `/${locale}/docs/${version}/${file.replace(
              ".md",
              ""
            )}`,
          });
        }
      });
    });
  });

  return Response.json(docs);
}