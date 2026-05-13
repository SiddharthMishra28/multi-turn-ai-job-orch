const TOKEN = /(?<!\\)\{\{\s*([\w.]+)(?:\s*\|\|\s*([^}]+))?\s*\}\}/g;

export function resolveTemplate(template: string, ctx: Record<string, unknown>) {
  const unresolved: string[] = [];
  const output = template.replace(TOKEN, (_, path: string, fallback?: string) => {
    const value = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), ctx);
    if (value === undefined || value === null) {
      if (fallback) return fallback.trim();
      unresolved.push(path);
      return `{{${path}}}`;
    }
    return typeof value === 'string' ? value : JSON.stringify(value);
  }).replace(/\\\{\{/g, '{{').replace(/\\\}\}/g, '}}');
  return { output, unresolved };
}
