import { DifferentTownConfig, SameTownConfig } from '../../interfaces';

export interface AuthData {
  emailPass: string;
  location: string | null | undefined;
  phoneNumber?: number;
}

export interface UserData {
  email: string;
  location: string;
  phoneNumber?: number;
  sameTownConfig?: SameTownConfig;
  differentTownConfig?: DifferentTownConfig;
}
