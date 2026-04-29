const toKebabCase = (name: string): string =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getMemberAvatarCandidates = (name: string): string[] => {
  const slug = toKebabCase(name);
  return [`/avatars/${slug}.jpg`, `/avatars/${slug}.png`, "/avatars/default.png"];
};
