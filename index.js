const express = require('express');
const app = express();
const port = 6969;
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send("Hello World — Animate API is running!");
});

// Animate route (POST)
app.get('/animate', (req, res) => {
  const { character, action } = req.query;

  if (!character || !action) {
    return res.status(400).json({ error: "Please provide `character` and `action`" });
  }

  const animationUrl = `https://myapi.fake/animations/${encodeURIComponent(character)}_${encodeURIComponent(action)}.gif`;

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
