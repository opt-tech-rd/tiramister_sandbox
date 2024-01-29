import { createContext } from "react";

type Context = { count: number; increment: () => void };
const init: Context = {
  count: 0,
  increment: () => { },
};

export const CounterContext = createContext<Context>(init);

