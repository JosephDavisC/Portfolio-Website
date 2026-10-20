// WCAG contrast helpers for colours that come from JSON data (company theme colours),
// which cannot be checked once in a stylesheet.

const toRgb = (hex: string) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const luminance = ([r, g, b]: number[]) => {
  const c = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

const ratio = (a: number[], b: number[]) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const toHex = (rgb: number[]) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/**
 * Darkens `hex` just enough to read at 4.5:1 on `bg`, and on a chip of `hex` at
 * 12.5% over `bg` (the `${color}20` tint the experience pages use). Returns `hex`
 * unchanged when it already passes.
 */
export function readableOn(hex: string, bg = "#F9F7F2", min = 4.5): string {
  const base = toRgb(hex), paper = toRgb(bg);
  const chip = paper.map((p, i) => p + (base[i] - p) * 0.125);
  for (let k = 0; k <= 1; k += 0.04) {
    const c = base.map((v) => v * (1 - k));
    if (ratio(c, paper) >= min && ratio(c, chip) >= min) return toHex(c);
  }
  return "#000000";
}

/** Espresso or paper, whichever reads better on a solid `bg` (for buttons filled with a company colour). */
export function textOn(bg: string): string {
  const b = toRgb(bg);
  return ratio(toRgb("#3D2B1F"), b) >= ratio(toRgb("#F9F7F2"), b) ? "#3D2B1F" : "#F9F7F2";
}
