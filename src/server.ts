import express, {json} from "express";
import { SERVER_PORT } from './configs/envConfig.js';

const server = express();
const port = SERVER_PORT

server.use(express.json());

//routers

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
