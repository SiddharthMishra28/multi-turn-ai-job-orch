import { describe, expect, it } from 'vitest';
import { resolveTemplate } from '../src/engine/templateEngine';
import { topoSort } from '../src/engine/orchestrator';
import { buildAzureChatRequest } from '../src/providers/adapters';
import { exportData, importData } from '../src/storage/serialization';

describe('template', () => { it('resolves step output', () => { const r = resolveTemplate('Hello {{steps.a.output}}', { steps: { a: { output: 'world' } } }); expect(r.output).toBe('Hello world'); }); });
describe('topo', () => { it('orders dependencies', () => { const r = topoSort([{id:'b',dependencies:['a'],enabled:true,userPrompt:'',retryCount:0},{id:'a',dependencies:[],enabled:true,userPrompt:'',retryCount:0}]); expect(r.map(x=>x.id)).toEqual(['a','b']); }); });
describe('provider url', () => { it('builds azure url', () => { expect(buildAzureChatRequest('https://x.openai.azure.com','dep','2024-10-21')).toContain('/openai/deployments/dep/chat/completions'); }); });
describe('storage', () => { it('round trips', () => { const text = exportData({x:1}); expect(importData(text).data.x).toBe(1); }); });
