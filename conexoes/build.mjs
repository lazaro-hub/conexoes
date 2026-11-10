// Gera dist/conexoes.html: uma única página com CSS e JS embutidos.
// React é carregado da CDN (cdnjs), o restante fica no próprio arquivo.
import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';

const REACT_VERSAO = '18.3.1';
mkdirSync('dist/vendor', { recursive: true });

// Mapeia "react" e "react-dom" para as variáveis globais da versão UMD.
const globais = {
  name: 'react-global',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?(\/client)?$/ }, (a) => ({ path: a.path, namespace: 'global' }));
    b.onLoad({ filter: /.*/, namespace: 'global' }, (a) => ({
      contents: a.path.startsWith('react-dom') ? 'module.exports = window.ReactDOM;' : 'module.exports = window.React;',
      loader: 'js',
    }));
  },
};

await build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2019'],
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  outfile: 'dist/app.js',
  plugins: [globais],
  legalComments: 'none',
});

execSync('npx tailwindcss -i src/styles.css -o dist/app.css --minify', { stdio: 'inherit' });

const css = readFileSync('dist/app.css', 'utf8');
const js = readFileSync('dist/app.js', 'utf8').replace(/<\/script/gi, '<\\/script');

const pagina = (scriptsReact) => `<title>CONEXÕES</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Serious game para aprendizagem de soft skills por estudantes de Enfermagem.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>${css}</style>
<div id="raiz"></div>
<noscript>Ative o JavaScript para jogar CONEXÕES.</noscript>
${scriptsReact}
<script>${js}</script>
`;

const cdn = `<script src="https://cdnjs.cloudflare.com/ajax/libs/react/${REACT_VERSAO}/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/${REACT_VERSAO}/umd/react-dom.production.min.js"></script>`;
writeFileSync('dist/conexoes.html', pagina(cdn));

// Versão para testes locais, sem internet (React copiado para dist/vendor).
copyFileSync('node_modules/react/umd/react.production.min.js', 'dist/vendor/react.production.min.js');
copyFileSync('node_modules/react-dom/umd/react-dom.production.min.js', 'dist/vendor/react-dom.production.min.js');
const local = `<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>`;
writeFileSync('dist/teste-local.html', `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>${pagina(local)}</body></html>`);

// Versão completa para hospedagem própria (GitHub Pages usa a pasta docs/).
mkdirSync('docs', { recursive: true });
writeFileSync('docs/index.html', `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}</style></head><body>${pagina(cdn)}</body></html>`);
writeFileSync('docs/.nojekyll', '');

console.log(`dist/conexoes.html: ${(readFileSync('dist/conexoes.html').length / 1024).toFixed(0)} KB`);
