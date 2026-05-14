'use client';

import { useMemo, useState } from 'react';
import { executeWorkflow, type Step } from '../engine/orchestrator';

type ResultMap = Record<string, { output: string }>;

const defaultSteps: Step[] = [
  {
    id: 'summarize',
    dependencies: [],
    enabled: true,
    userPrompt: 'Summarize this request in one sentence: {{input}}',
    retryCount: 1
  },
  {
    id: 'next_actions',
    dependencies: ['summarize'],
    enabled: true,
    userPrompt: 'Using {{steps.summarize.output}}, list 3 next actions.',
    retryCount: 1
  }
];

export default function Page() {
  const [input, setInput] = useState('Build a customer support response for a delayed shipment case.');
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResultMap | null>(null);

  const steps = useMemo(
    () => defaultSteps.map((step) => ({ ...step, userPrompt: step.userPrompt.replace('{{input}}', input) })),
    [input]
  );

  const run = async () => {
    setRunning(true);
    setError(null);
    setResults(null);
    try {
      const out = await executeWorkflow(steps, async (step, prompt) => {
        await new Promise((r) => setTimeout(r, 250));
        return `Step: ${step.id}\nPrompt: ${prompt}\n\n(Mock provider output)`;
      });
      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setRunning(false);
    }
  };

  return (
    <main style={{ padding: 24, fontFamily: 'Inter, system-ui', maxWidth: 900, margin: '0 auto' }}>
      <h1>AI Inference Orchestrator</h1>
      <p>Interactive client-side workflow demo (mock provider output).</p>

      <label htmlFor="input" style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
        Input
      </label>
      <textarea
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: '100%', padding: 10, marginBottom: 12 }}
      />

      <button onClick={run} disabled={running} style={{ padding: '8px 14px', cursor: running ? 'not-allowed' : 'pointer' }}>
        {running ? 'Running…' : 'Run Workflow'}
      </button>

      {error && <p style={{ color: 'crimson', marginTop: 14 }}>Error: {error}</p>}

      {results && (
        <section style={{ marginTop: 20 }}>
          <h2>Results</h2>
          {Object.entries(results).map(([id, data]) => (
            <article key={id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <h3 style={{ marginTop: 0 }}>{id}</h3>
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{data.output}</pre>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
