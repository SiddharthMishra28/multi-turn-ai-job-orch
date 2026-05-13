import { resolveTemplate } from './templateEngine';

export type Step = { id: string; dependencies: string[]; enabled: boolean; userPrompt: string; retryCount: number };

export function topoSort(steps: Step[]): Step[] {
  const map = new Map(steps.map((s) => [s.id, s]));
  const visited = new Set<string>(); const temp = new Set<string>(); const out: Step[] = [];
  const dfs = (id: string) => { if (temp.has(id)) throw new Error('Cycle detected'); if (visited.has(id)) return; temp.add(id); const s = map.get(id); if (!s) throw new Error(`Missing dependency ${id}`); s.dependencies.forEach(dfs); temp.delete(id); visited.add(id); out.push(s); };
  steps.forEach((s) => dfs(s.id));
  return out;
}

export async function executeWorkflow(steps: Step[], invoke: (step: Step, prompt: string) => Promise<string>) {
  const ordered = topoSort(steps).filter((s) => s.enabled);
  const results: Record<string, { output: string }> = {};
  for (const step of ordered) {
    const { output } = resolveTemplate(step.userPrompt, { steps: Object.fromEntries(Object.entries(results).map(([k,v]) => [k,{ output: v.output }])) });
    let attempt = 0;
    while (true) {
      try { results[step.id] = { output: await invoke(step, output) }; break; }
      catch (e) { attempt++; if (attempt > step.retryCount) throw e; await new Promise(r => setTimeout(r, 250 * 2 ** attempt)); }
    }
  }
  return results;
}
