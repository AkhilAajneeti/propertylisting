// Configuration values are typed into the CMS by hand, so they arrive in
// whatever case someone used - "Studio Apartments", "STUDIO APARTMENTS",
// "studio apartments". CSS text-transform:capitalize cannot fix the shouty
// ones (it only touches the first letter of each word and leaves the rest
// uppercase), so the tidying has to happen here.
//
// The catch is that plain title-casing wrecks the real values: "4 BHK" would
// come out as "4 Bhk" and "3 BHK + 2T" as "3 Bhk + 2t".

// Short forms that must stay fully uppercase.
const ACRONYMS = new Set([
  "BHK",
  "RK",
  "T",
  "S",
  "BR",
  "SQ",
  "FT",
  "EWS",
  "LIG",
  "MIG",
  "HIG",
]);

function formatWord(word) {
  if (!word) return word;

  const upper = word.toUpperCase();
  if (ACRONYMS.has(upper)) return upper;

  // Anything carrying a digit is a unit, not prose: 2T, 3BHK, 4.5, +4T
  if (/\d/.test(word)) return upper;

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Title-cases a configuration label while leaving acronyms and unit tokens
 * alone. Separators (spaces, +, /, -, commas) are preserved as typed.
 */
export function formatConfiguration(value) {
  if (!value) return "";
  // Split on separators but keep them, so "Court/Restaurants" and "4 BHK +4T"
  // round-trip exactly as written.
  return String(value)
    .split(/([^A-Za-z0-9.]+)/)
    .map((part, i) => (i % 2 === 0 ? formatWord(part) : part))
    .join("");
}

export function formatConfigurationList(list) {
  if (!Array.isArray(list) || list.length === 0) return "";
  return list.filter(Boolean).map(formatConfiguration).join(", ");
}
