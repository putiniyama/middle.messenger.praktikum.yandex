
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const distDir = `${__dirname}/dist/`;
app.use(express.static(distDir));

app.get('/*', function (req, res) {
  res.sendFile(`${distDir}/index.html`);
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});