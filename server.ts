import express, { Express } from 'express';
import Router from './routes'
import bodyParser from 'body-parser';

const app: Express  = express();
const port: number = Number(process.env.PORT) || 8080;

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());
app.use(Router);

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});