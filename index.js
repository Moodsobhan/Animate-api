const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: '🔥 My Animate API is running!' });
});

// Animate API
app.post('/animate', (req, res) => {
  const { character, action, style } = req.body;

  // Validation
  if (!character || !action) {
    return res.status(400).json({ error: "Fields `character` and `action` are required" });
  }

  // Simulate making an animation (in real life you’d plug into AI or database)
  const animationUrl = `https://myapi.fake/animations/${encodeURIComponent(character)}_${encodeURIComponent(action)}_${encodeURIComponent(style || "default")}.gif`;

  // Response
  res.json({
    character,
    action,
    style: style || "default",
    animation: animationUrl,
    message: "✅ Animation generated successfully!"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
