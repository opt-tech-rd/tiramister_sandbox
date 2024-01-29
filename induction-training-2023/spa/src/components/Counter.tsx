import React, { useState } from "react";

export default function Counter() {
  console.log("Counter Component");
  const [count, setCount] = useState(0);

  const onClick = () => setCount(count + 1);

  return <div>
    <p>You clicked {count} times</p>
    <button onClick={onClick}>Click me</button>
  </div>;
}

