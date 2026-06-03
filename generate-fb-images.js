const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const assets = path.join(__dirname, 'src', 'assets');

function svgToPng(svgFile, pngFile, width) {
  const svg = fs.readFileSync(svgFile, 'utf-8');
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(pngFile, pngBuffer);
  const kb = (pngBuffer.length / 1024).toFixed(1);
  console.log(`✅ ${path.basename(pngFile)} — ${width}×${pngData.height}px — ${kb} KB`);
}

svgToPng(path.join(assets, 'facebook-profile.svg'), path.join(assets, 'facebook-profile.png'), 360);
svgToPng(path.join(assets, 'facebook-cover.svg'),   path.join(assets, 'facebook-cover.png'),   820);
