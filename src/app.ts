import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './schemas/index.js';
import { resolvers } from './resolvers/index.js';
import { getContext } from './context.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

export async function startApp() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: getContext,
    }),
  );

  return app;
}
