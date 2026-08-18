import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const port = Number(process.env.PORT || 5173);
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.mp3':'audio/mpeg' };
createServer(async (req, res) => {
  try {
    const path = normalize(req.url === '/' ? 'index.html' : req.url.split('?')[0].replace(/^\//,''));
    if (path.startsWith('..')) throw new Error('bad path');
    const data = await readFile(join(process.cwd(), path));
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' }); res.end(data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port, () => console.log(`Truco de Barrio: http://localhost:${port}`));
