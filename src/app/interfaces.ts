// FE
export interface BookHomepage extends BookProfile {
  username: string;
}

export interface BookProfile {
  title: string;
  category: string;
  description: string;
  tradingPreferenceList: string | null;
}

// DTOs

// export interface BookProfileDTO {
//   title: string;
//   category: string;
//   description: string;
//   tradingPreferenceList: string | null;
// }
