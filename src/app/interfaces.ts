export interface BookProfile extends CommonBook {
  changed: boolean;
  lineNumber?: number;
}

export interface BookProfileDTO extends CommonBook {
  _id: string;
}

type CommonBook = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  imagePath: string;
  username: string;
  location: string;
  tradingPreferenceAuthor: string | null;
  tradingPreferenceBook: string | null;
  tradingPreferenceGenre: string | null;
  tradingPreferenceDescription: string | null;
  userId: string;
};
