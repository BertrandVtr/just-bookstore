import express, { Application } from 'express';
import cors from 'cors'
import routes from "./routes";

const app: Application = express();
const port = process.env.VITE_NODE_PORT || 3000;

app.use(cors({ origin: '*' }))
app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});
