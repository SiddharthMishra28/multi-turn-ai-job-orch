export function exportData(data: unknown) { return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data }, null, 2); }
export function importData(text: string) { const parsed = JSON.parse(text); if (typeof parsed.version !== 'number') throw new Error('Invalid backup file'); return parsed; }
