import app from "./app.js";
import { env } from "./configs/envConfig.js";

const port = env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
