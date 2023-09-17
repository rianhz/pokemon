import { TPokemonResultApi } from "./api";

export interface IAbilities {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IGameIndices {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}
export interface IForms {
  name: string;
  url: string;
}
export interface IStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
export interface ITypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
export interface IVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}
export interface IVersionDetails {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
}
export interface IHeldItems {
  item: {
    name: string;
    url: string;
  };
  version_details: IVersionDetails[];
}
export interface IMoves {
  move: {
    name: string;
    url: string;
  };
  version_group_details: IVersionGroupDetails[];
}

export type TPokemon = {
  abilities: IAbilities[];
  base_experience: number;
  forms: IForms[];
  game_indices: IGameIndices[];
  height: number;
  held_items: IHeldItems[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IMoves[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: null | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
    version: IVersion;
  };
  stats: IStats[];
  types: ITypes[];
  weight: number;
};

export type IVersion = {
  "generation-i": {
    "red-blue": {
      back_default: string;
      back_gray: string;
      back_transparent: string;
      front_default: string;
      front_gray: string;
      front_transparent: string;
    };
    yellow: {
      back_default: string;
      back_gray: string;
      back_transparent: string;
      front_default: string;
      front_gray: string;
      front_transparent: string;
    };
  };
  "generation-ii": {
    crystal: {
      back_default: string;
      back_shiny: string;
      back_shiny_transparent: string;
      back_transparent: string;
      front_default: string;
      front_shiny: string;
      front_shiny_transparent: string;
      front_transparent: string;
    };
    gold: {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
    silver: {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
  };
  "generation-iii": {
    emerald: {
      front_default: string;
      front_shiny: string;
    };
    "firered-leafgreen": {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
    "ruby-sapphire": {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
  };
  "generation-iv": {
    "diamond-pearl": {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
    "heartgold-soulsilver": {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
    platinum: {
      back_default: string;
      back_shiny: string;
      front_default: string;
      front_shiny: string;
      front_transparent: string;
    };
  };
  "generation-v": {
    "black-white": {
      animated: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
      };
      back_default: string;
      back_female: string;
      back_shiny: string;
      back_shiny_female: string;
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
  "generation-vi": {
    "omegaruby-alphasapphire": {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    "x-y": {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
  " generation-vii": {
    icons: {
      front_default: string;
      front_female: string;
    };
    "ultra-sun-ultra-moon": {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
  "generation-viii": {
    icons: {
      front_default: string;
      front_female: string;
    };
  };
};

export type TCorrectPokemon = {
  name: string;
  url: string;
};

export type TList = {
  name: string;
  img: string;
};

export type TPokemon = {
  name: string;
  url: string;
};

export type TPokemonFiltered = {
  slot: number;
  pokemon: TPokemonsResult;
};

export type TPokemonFilter = {
  name: string;
  pokemon: TPokemonFiltered[];
};

export type TPokemonsResult = {
  name: string;
  url: string;
};
