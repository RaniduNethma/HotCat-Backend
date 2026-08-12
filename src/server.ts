import { env } from './configs/envConfig.js';
import { startApp } from './app.js';

const port = env.SERVER_PORT;

async function startServer() {
  try {
    const { httpServer } = await startApp();
    httpServer.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/graphql`);
      console.log(`Websockets ready at ws://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error('Error when starting server', error);
  }
}

startServer();
