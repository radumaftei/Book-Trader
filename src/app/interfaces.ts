import { TRADE_STATUSES } from './enums';

export interface BookProfile extends CommonBook {
  changed: boolean;
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
  tradingPreferenceAuthor: string;
  tradingPreferenceBook: string;
  tradingPreferenceGenre: string;
  tradingPreferenceDescription: string;
  userId: string;
  hidden: boolean;
};

export interface DifferentTownConfig {
  courier: boolean;
}

export interface SameTownConfig extends DifferentTownConfig {
  onFoot: boolean;
}

export interface PageOptions {
  pageIndex: number;
  pageSize: number;
}

export interface BookApi {
  books: BookProfile[];
  length: number;
}

export interface TradeDetails {
  _id?: string;
  fromUser: string;
  toUser: string;
  description: string;
  tradedBookTitle: string;
  tradedWithBookTitle: string;
  tradedBookId: string;
  tradedWithBookId: string;
  status?: TRADE_STATUSES;
  completedBy?: string;
  readBy?: string;
  tradeMethod: string;
}
