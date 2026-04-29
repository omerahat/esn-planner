const toKebabCase = (name: string): string =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toLooseFileName = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const withBaseUrl = (relativePath: string): string => {
  const base = import.meta.env.BASE_URL;
  return `${base}${relativePath}`;
};

export const getMemberAvatarCandidates = (name: string): string[] => {
  const slug = toKebabCase(name);
  const loose = toLooseFileName(name);
  return [
    withBaseUrl(`avatars/${encodeURIComponent(slug)}.jpg`),
    withBaseUrl(`avatars/${encodeURIComponent(slug)}.png`),
    withBaseUrl(`avatars/${encodeURIComponent(loose)}.jpg`),
    withBaseUrl(`avatars/${encodeURIComponent(loose)}.png`),
    withBaseUrl("avatars/default.png"),
  ];
};
