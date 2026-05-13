export type NormalizedResponse = { text: string; raw: unknown; finishReason?: string; usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number } };

export function buildAzureChatRequest(baseUrl: string, deployment: string, apiVersion: string) {
  return `${baseUrl.replace(/\/$/, '')}/openai/deployments/${deployment}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`;
}

export function buildOpenAICompatRequest(baseUrl: string) {
  return `${baseUrl.replace(/\/$/, '')}/chat/completions`;
}
