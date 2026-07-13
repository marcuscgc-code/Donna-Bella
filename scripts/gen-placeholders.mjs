import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "imagens", "produtos");
fs.mkdirSync(dir, { recursive: true });

const palettes = [
  ["#E8C4B8", "#C86B54"],
  ["#F1DCD3", "#B8975A"],
  ["#DDB9AC", "#3A2E2A"],
  ["#F0E4DC", "#C86B54"],
];

function silhouette(cx, cy, scale, stroke) {
  return `<g transform="translate(${cx} ${cy}) scale(${scale})" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    <path d="M0,-60 C-14,-60 -22,-48 -22,-36 C-22,-24 -14,-14 0,-10 C14,-14 22,-24 22,-36 C22,-48 14,-60 0,-60 Z"/>
    <path d="M-22,-10 C-40,10 -46,60 -50,140 C-30,150 0,155 0,155 C0,155 30,150 50,140 C46,60 40,10 22,-10"/>
    <path d="M-22,-10 L-60,70 M22,-10 L60,70"/>
  </g>`;
}

function svg(name, [bg, fg], label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800">
  <rect width="600" height="800" fill="${bg}"/>
  <rect x="0" y="0" width="600" height="800" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="2"/>
  ${silhouette(300, 420, 1.6, fg)}
  <text x="300" y="740" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${fg}" opacity="0.7">${label}</text>
</svg>`;
}

const products = ["vestido-terracota", "conjunto-linho", "blusa-seda", "saia-midi"];

products.forEach((p, i) => {
  const palette = palettes[i % palettes.length];
  fs.writeFileSync(path.join(dir, `${p}-1.svg`), svg(p, palette, "Donna Bella"));
  fs.writeFileSync(path.join(dir, `${p}-2.svg`), svg(p, [...palette].reverse(), "Donna Bella"));
});

fs.writeFileSync(
  path.join(dir, "hero.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
    <rect width="1600" height="1000" fill="#F1DCD3"/>
    ${silhouette(800, 560, 3.6, "#C86B54")}
  </svg>`
);

console.log("Placeholders generated in", dir);
