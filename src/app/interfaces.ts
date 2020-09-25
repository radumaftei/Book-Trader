// FE
export interface BookHomepage extends BookProfile {
  username: string;
}

export interface BookProfile {
  id: string;
  title: string;
  category: string;
  description: string;
  tradingPreferenceList: string | null;
}

export interface BookProfileDTO {
  _id: string;
  title: string;
  category: string;
  description: string;
  tradingPreferenceList: string | null;
}
