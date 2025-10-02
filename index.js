const express = require('express');
const axios = require('axios');
const app = express();
const port = 6969;

app.use(express.json()); // to parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send("Hello World — My API is running!");
});

// Animate route (proxy to mj-proxy-pub)
app.post('/animate', async (req, res) => {
  try {
    const { prompt, usePolling } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Field `prompt` is required" });
    }

    // Build URL
    const baseUrl = 'https://dev.oculux.xyz/api/mj-proxy-pub';
    const params = new URLSearchParams();
    params.append('prompt', prompt);
    if (usePolling !== undefined) {
      // If user passed usePolling, use that; else default true
      params.append('usePolling', usePolling.toString());
    } else {
      params.append('usePolling', 'true');
    }

    const targetUrl = `${baseUrl}?${params.toString()}`;

    // You might need headers (if required by the external API)
    const headers = {
      'Content-Type': 'application/json',
      // add any required authorization headers if needed
    };

    // Make the GET request
    const externalResponse = await axios.get(targetUrl, { headers });

    // Forward the data from external API
    res.status(externalResponse.status).json(externalResponse.data);
  } catch (err) {
    console.error('Error in /animate:', err.response?.data || err.message);
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: 'Internal server error' };
    res.status(status).json(data);
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
