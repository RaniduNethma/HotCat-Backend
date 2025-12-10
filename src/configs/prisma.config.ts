import { env } from "./envConfig.js";

export default {
  datasource: {
    url: env.DATABASE_URL,
  },
};
