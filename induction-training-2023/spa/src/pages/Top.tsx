import React from "react";
import Hello from "../components/Hello";
import { Link } from "react-router-dom";

export default function Top() {
  return <>
    <Hello name="world" />
    <Link to="/counter">counter</Link>
  </>;
}
