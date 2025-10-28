import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/courses/search', async (req, res) => {
  try {
    const city = req.query.city;
    const apiUrl = `https://api.golfcourseapi.com/v1/search?search_query=${encodeURIComponent(city)}`;
    
    console.log('Attempting to fetch:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Key TDWTSDTMYKNVFOP5AS4M47HOFQ'
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response body:', errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Success! Full course data:', JSON.stringify(data, null, 2));
    res.json(data);
  } catch (error) {
    console.error('Full error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const apiUrl = `https://api.golfcourseapi.com/v1/course/${courseId}`;
    
    console.log('Fetching course details:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Key TDWTSDTMYKNVFOP5AS4M47HOFQ'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Course detail data:', JSON.stringify(data, null, 2));
    res.json(data);
  } catch (error) {
    console.error('Course detail error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});