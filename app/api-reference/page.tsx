"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiReferencePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">API Reference</h1>

      <SwaggerUI url="/openapi.json" />
    </div>
  );
}