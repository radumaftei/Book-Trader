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
  accepted?: boolean;
  rejected?: boolean;
  tradeMethod: string;
  status?: TRADE_STATUSES;
  completedBy?: string;
}

export enum TRADE_STATUSES {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
