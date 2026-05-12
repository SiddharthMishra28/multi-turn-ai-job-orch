import { z } from 'zod';

export const ProviderSchema = z.object({
  id: z.string(), name: z.string().min(1), type: z.enum(['azure','openai-compatible']),
  baseUrl: z.string().url(), deploymentOrModel: z.string().min(1), apiKey: z.string().min(1),
  optionalHeaders: z.record(z.string()).default({}), optionalQueryParams: z.record(z.string()).default({}),
  apiVersion: z.string().optional(), enabled: z.boolean().default(true), isDefault: z.boolean().default(false),
  createdAt: z.string(), updatedAt: z.string()
});

export const StepSchema = z.object({
  id: z.string(), name: z.string(), description: z.string().default(''), providerId: z.string(),
  model: z.string(), systemPrompt: z.string().default(''), userPrompt: z.string(), temperature: z.number().default(0.2),
  topP: z.number().default(1), maxTokens: z.number().int().optional(), enabled: z.boolean().default(true),
  dependencies: z.array(z.string()).default([]), retryCount: z.number().int().default(1), timeoutMs: z.number().int().default(30000)
});

export const WorkflowSchema = z.object({
  id: z.string(), name: z.string(), description: z.string().default(''), tags: z.array(z.string()).default([]),
  steps: z.array(StepSchema), executionHistoryRefs: z.array(z.string()).default([]), createdAt: z.string(), updatedAt: z.string()
});
