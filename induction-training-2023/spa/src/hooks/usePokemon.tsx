import useSWR from "swr";

type Result = {
  name: string;
  weight: number;
  height: number;
};

const fetcher = (key: string) => fetch(`https://pokeapi.co/api/v2/${key}`)
  .then(res => res.ok ? res.json() : Promise.reject(res))
  .then(res => res as Result);

export function usePokemon(id?: number) {
  const key = id ? `pokemon/${id}` : null;
  // key が falsy の場合、useSWR は fetcher を呼び出さない
  return useSWR(key, fetcher);
}
