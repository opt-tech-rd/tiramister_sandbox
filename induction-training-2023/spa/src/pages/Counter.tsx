import React, { useState } from "react";
import CounterComponent from "../components/Counter";
import { CounterContext } from "../contexts/CounterContext";

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  return <div>
    <h1>Counter</h1>
    <CounterContext.Provider value={{ count, increment }}>
      <CounterComponent />
      <CounterComponent />
      <CounterComponent />
    </CounterContext.Provider>
  </div>;
}

