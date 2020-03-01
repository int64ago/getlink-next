require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const next = require('next');
const AV = require('leancloud-storage');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

if (!AV.applicationId) {
  AV.init({
    appId: process.env.AV_AK,
    appKey: process.env.AV_SK,
  });
}

const staticFiles = fs.readdirSync(path.join(__dirname, 'public'));

app.prepare().then(() => {
  const server = express();

  server.get('/:shortId', async (req, res) => {
    if (/\/api/.test(req.path) || staticFiles.includes(req.path.substr(1))) {
        return handle(req, res);
    }

    if (req.path === '/service-worker.js') {
      const filePath = path.join(__dirname, '.next', req.path);
      return res.sendFile(filePath);
    }

    if (req.path === '/ip') {
      const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
      return res.send(ip);
    }

    const { shortId } = req.params;
    const query = new AV.Query('Url');
    query.equalTo('shortId', shortId);
    const json = await query.first();
    if (json) {
        res.redirect(json.toJSON().longUrl);
        json.increment('clickCount', 1).save();
    } else {
        res.status(400).send('Invalid url');
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
  });
});
