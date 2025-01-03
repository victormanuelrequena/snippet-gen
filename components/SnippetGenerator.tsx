"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function SnippetGenerator() {
  const [description, setDescription] = useState("");
  const [tabTrigger, setTabTrigger] = useState("");
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateSnippet = () => {
    const snippet = {
      [description]: {
        prefix: tabTrigger,
        body: code.split("\n"),
        description: description,
      },
    };
    return JSON.stringify(snippet, null, 2);
  };

  const copySnippet = () => {
    const snippetText = generateSnippet();
    navigator.clipboard
      .writeText(snippetText)
      .then(() => alert("Snippet copied to clipboard!"))
      .catch((err) => console.error("Failed to copy snippet: ", err));
  };

  if (!mounted) return null;

  return (
    <div className="w-full bg-[#F0EFE7] dark:bg-[#000] flex flex-row justify-between gap-10">
      <div className="w-full h-full flex flex-col flex-1">
        <div className="flex min-h-20 max-h-20 items-center flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              label="Tab Trigger"
              value={tabTrigger}
              onChange={(e) => setTabTrigger(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 rounded-md overflow-hidden">
          <MonacoEditor
            height="600px"
            language="javascript"
            theme={theme}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
            }}
          />
        </div>
        {/* <Button
            className="mt-10"
            color="primary"
            onPress={() =>
              setTheme(theme === "vs-dark" ? "one-dark" : "vs-dark")
            }
          >
            Toggle Theme
          </Button> */}
      </div>
      <div className="w-full h-full flex flex-col flex-1">
        <div className="w-full flex min-h-20 max-h-20 flex-row items-center justify-between">
          <h2 className="text-2xl font-light">Snippet Preview</h2>
          <Button color="primary" onPress={copySnippet} className="mt-4">
            Copy Snippet
          </Button>
        </div>
        <div className="mt-8 rounded-md overflow-hidden">
          <MonacoEditor
            height="600px"
            language="json"
            theme="vs-dark"
            value={generateSnippet()}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
            }}
          />
        </div>
      </div>
    </div>
  );
}
