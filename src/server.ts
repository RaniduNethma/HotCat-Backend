import app from './app.js';
import { SERVER_PORT } from './configs/envConfig.js';

const port = SERVER_PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
