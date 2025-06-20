interface FavoriteEventInterface {
  name: string;
  type: 'remotion' | 'insertion';
  pokemon_data: Record<string, any> | undefined;
}

export default FavoriteEventInterface;
