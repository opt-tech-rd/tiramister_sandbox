import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { Book, Resolvers } from './generated/graphql';

const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

export interface MyContext {
  dataSources: {
    books: Book[];
  };
}

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers: Resolvers = {
  Query: {
    books: (_, __, contextValue) => contextValue.dataSources.books,
  },
  Mutation: {
    addBook: (_, book, contextValue) => {
      contextValue.dataSources.books.push(book);
      return {
        book,
      }
    }
  }
};

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer<MyContext>(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      dataSources: {
        books,
      },
    };
  }
});

console.log(url);

