const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapa contenido entregado por el usuario antes de incrustarlo en las
 * plantillas HTML de los correos (previene HTML injection en los emails).
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ENTITY_MAP[char] ?? char);
}
