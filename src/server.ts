import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Heelo WOlrd' }));

app.listen(3333, () => {
  console.log('Server running 3333');
});
