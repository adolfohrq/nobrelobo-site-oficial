/**
 * Converte uma string em um slug URL-friendly
 *
 * @param text - Texto para converter em slug
 * @returns String formatada como slug (ex: "Design Gráfico" -> "design-grafico")
 *
 * @example
 * slugify("SEO Estratégico") // "seo-estrategico"
 * slugify("Marketing Digital & Social Media") // "marketing-digital-social-media"
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens duplicados
    .trim(); // Remove espaços nas extremidades
};

/**
 * Converte um slug de volta para texto legível
 *
 * @param slug - Slug para converter em texto
 * @returns String formatada com capitalização (ex: "design-grafico" -> "Design Grafico")
 *
 * @example
 * unslugify("seo-estrategico") // "Seo Estrategico"
 */
export const unslugify = (slug: string): string => {
  return slug
    .replace(/-/g, ' ') // Substitui hífens por espaços
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza primeira letra de cada palavra
};

/**
 * Valida se uma string é um slug válido
 *
 * @param slug - String para validar
 * @returns true se for um slug válido, false caso contrário
 *
 * @example
 * isValidSlug("design-grafico") // true
 * isValidSlug("Design Gráfico") // false
 * isValidSlug("design--grafico") // false
 */
export const isValidSlug = (slug: string): boolean => {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
};
