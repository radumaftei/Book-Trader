import { DifferentTownConfig, SameTownConfig } from '../../interfaces';

export interface AuthData {
  email: string;
  password: string;
  location: string | null | undefined;
}

export interface UserData {
  email: string;
  location: string;
  sameTownConfig?: SameTownConfig;
  differentTownConfig?: DifferentTownConfig;
}
