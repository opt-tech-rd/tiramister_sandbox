import React from "react";
import CounterComponent from "../components/Counter";

export default function Counter() {
  console.log("Counter Page");
  return <div>
    <h1>Counter</h1>
    <CounterComponent />
    <CounterComponent />
    <CounterComponent />
  </div>;
}

