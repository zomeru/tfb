export type Resolvers = {
  Query: {
    hello: () => string;
  };
};

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello Zoms!',
  },
};
