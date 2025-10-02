const express = require('express');
const axios = require('axios');
const app = express();
const port = 6969;
app.use(express.json());

// Root route
app.get('/', async (req, res) => {
  res.send("Api is running");
});
app.get('/mj', async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Please provide a prompt" });
  }

  const u = `https://dev.oculux.xyz/api/mj-proxy-pub?prompt=${prompt}`;
const r = await axios.get(u);
res.send(r.data);
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Animate API running at port ${port}`);
});
