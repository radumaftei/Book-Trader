import { PageOptions } from './interfaces';

export const NO_PREFERENCE = 'NO_PREFERENCE';
export const FEW_MATCH = 'FEW_MATCH';
export const NO_MATCH = 'NO_MATCH';

export const HOME_URL = 'http://localhost:3000/api';
export const MY_BOOKS_URL = 'personal-book-page';
export const USER_SIGNUP_URL = 'signup';
export const DELIVERY_CONFIG = 'deliveryConfig';
export const USER_LOGIN_URL = 'login';
export const HOMEPAGE = 'homepage';

export const TRADING_PREFERENCES_STATUS = {
  NO_PREFERENCE,
  FEW_MATCH,
  NO_MATCH,
};

export const defaultPageOptions: PageOptions = {
  pageIndex: 0,
  pageSize: 10,
};
