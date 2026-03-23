"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { NeuralNetwork } from "@/components/flexui/neural-network";

const code = `import { NeuralNetwork } from "@/components/flexui/neural-network";

export function Demo() {
  return (
    <NeuralNetwork
      nodeCount={30}
      className="flex min-h-[400px] items-center justify-center rounded-2xl bg-black"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Neural Network</h1>
        <p className="mt-2 text-zinc-400">Nodes pulse and connections fire like synapses.</p>
      </div>
    </NeuralNetwork>
  );
}`;

export function NeuralNetworkPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <NeuralNetwork
            nodeCount={30}
            className="flex min-h-[400px] w-full items-center justify-center rounded-2xl bg-black"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Neural Network
              </h1>
              <p className="mt-2 text-zinc-400">
                Nodes pulse and connections fire like synapses.
              </p>
            </div>
          </NeuralNetwork>
        }
        code={code}
        filename="neural-network-demo.tsx"
      />
    </div>
  );
}
