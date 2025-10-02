const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'GoatBot Animate API Proxy is running 🚀' });
});

// Animate route
app.post('/animate', async (req, res) => {
  try {
    const { prompt, expandPrompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Field `prompt` is required" });
    }

    const baseUrl = 'https://dev.oculux.xyz/api/hailuo01';
    const params = new URLSearchParams();
    params.append('prompt', prompt);
    if (expandPrompt) params.append('expandPrompt', expandPrompt);

    const targetUrl = `${baseUrl}?${params.toString()}`;

    const response = await axios.get(targetUrl);

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
