const express = require('express');
const app = express();
const port = 6969;
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send("/animate?character=&action=");
});

// Animate route (POST)
app.get('/animate', (req, res) => {
  const { character, action } = req.query;

  if (!character || !action) {
    return res.status(400).json({ error: "Please provide `character` and `action`" });
  }

  const animationUrl = `https://dev.oculux.xyz/api/mj-proxy-pub?prompt=`;

  res.json({
    character,
    action,
    animation: animationUrl,
    message: "✅ Animation generated successfully!"
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Animate API running at port ${port}`);
});
