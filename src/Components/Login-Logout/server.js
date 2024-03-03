import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/api/quotes', async (req, res) => {
  try {
    const response = await fetch('https://api.quotable.io/');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
