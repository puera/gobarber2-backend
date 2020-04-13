import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Heelo WOlrd' }));

app.listen(3333, () => {
  console.log('Server running 3333');
});
