import { useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import React from "react";

export default function Pokemon() {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemon(Number(id));

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>failed to load</p>;

  return <div>
    <p>id: {id}</p>
    <p>name: {pokemon?.name}</p>
    <p>weight: {pokemon?.weight}</p>
    <p>height: {pokemon?.height}</p>
  </div>;
}

