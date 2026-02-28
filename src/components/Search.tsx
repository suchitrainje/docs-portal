"use client";

import { useEffect, useState } from "react";
import { Index } from "flexsearch";

type DocItem = {
  id: string;
  title: string;
  content: string;
  url: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocItem[]>([]);
  const [docs, setDocs] = useState<DocItem[]>([]);

  const index = new Index({ tokenize: "forward" });

  useEffect(() => {
    async function loadDocs() {
      const res = await fetch("/api/search-data");
      const data = await res.json();

      setDocs(data);

      data.forEach((doc: DocItem) => {
        index.add(doc.id, doc.content);
      });
    }

    loadDocs();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const ids = index.search(query);
    const matched = docs.filter((doc) =>
      ids.includes(doc.id)
    );

    setResults(matched);
  }, [query]);

  return (
    <div className="relative w-80">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search..."
        className="w-full border px-3 py-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div
          data-testid="search-results"
          className="absolute bg-white dark:bg-gray-800 border mt-1 w-full max-h-60 overflow-y-auto p-2 rounded shadow"
        >
          {results.length === 0 ? (
            <p data-testid="search-no-results">
              No results found
            </p>
          ) : (
            results.map((result) => (
              <a
                key={result.id}
                href={result.url}
                className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {result.title}
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}