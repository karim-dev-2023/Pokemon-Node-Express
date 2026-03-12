// Model ¨Pokemon¨

export function getUniqueId(pokemon) {
  const pokemonIds = pokemon.map((p) => p.id);
  const maxId = pokemonIds.reduce((a, b) => Math.max(a, b));
  return maxId + 1;
}
