interface DataKeeperInterface {
  data_stored: Record<string, DesirableDataInterface>;
  name_list: Array<string>;
  last_collected_date: Date;
}

interface GetPokemonsDataInterface {
  name_list: Array<string>;
  pokemons_data: Record<string, DesirableDataInterface>;
}
interface SpritesInterface {
  back_default: string;
  front_default: string;
}

interface StatusInterface {
  hp: number;
  attack: number;
  defence: number;
  special_atack: number;
  special_defence: number;
  speed: number;
}

interface DesirableDataInterface {
  sprites: SpritesInterface;
  stats: StatusInterface;
  types: Array<string>;
}

const status_map_order = [
  'hp',
  'attack',
  'defence',
  'special_atack',
  'special_defence',
  'speed',
] as const;

export {
  DesirableDataInterface,
  StatusInterface,
  SpritesInterface,
  status_map_order,
  DataKeeperInterface,
  GetPokemonsDataInterface,
};
