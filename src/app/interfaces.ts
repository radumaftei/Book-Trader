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
  courier: string;
  onFoot: string;
  destinationType: DestinationType;
  description: string;
  imagePath: string;
  username: string;
  location: string;
  tradingPreferenceAuthor: string;
  tradingPreferenceBook: string;
  tradingPreferenceGenre: string;
  tradingPreferenceDescription: string;
  userId: string;
};

export type DestinationType = 'sameLocation' | 'otherLocation' | '0';
