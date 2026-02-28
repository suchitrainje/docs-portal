"use client";

import { useState } from "react";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        data-testid="feedback-success-message"
        className="mt-6 text-green-600"
      >
        Thanks for your feedback!
      </div>
    );
  }

  return (
    <div
      data-testid="feedback-widget"
      className="mt-10 border-t pt-6"
    >
      <h3 className="font-semibold mb-2">
        Was this helpful?
      </h3>

      <button
        data-testid="feedback-submit"
        className="mr-2 border px-3 py-1 rounded"
        onClick={() => setSubmitted(true)}
      >
        Yes
      </button>

      <button
        data-testid="feedback-submit"
        className="border px-3 py-1 rounded"
        onClick={() => setSubmitted(true)}
      >
        No
      </button>
    </div>
  );
}