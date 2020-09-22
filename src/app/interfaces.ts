export interface BookHomepage extends BookProfile {
  username: string;
}

export interface BookProfile {
  id: number;
  title: string;
  category: string;
  description: string;
  tradingPreference: string;
}
