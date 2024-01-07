import EngJSON from './eng.json';
import RuJSON from './ru.json';
import ByJSON from './by.json';

export const locale = {
  eng: EngJSON,
  ru: RuJSON,
  by: ByJSON,
};

export type Locale = typeof EngJSON | typeof RuJSON | typeof ByJSON;
