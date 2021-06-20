import { PageOptions } from './interfaces';

export const HOME_URL = 'http://localhost:3000/api';
export const MY_BOOKS_URL = 'personal-book-page';
export const USER_SIGNUP_URL = 'signup';
export const DELIVERY_CONFIG = 'deliveryConfig';
export const USER_LOGIN_URL = 'login';
export const USER_URL = 'user';
export const HOMEPAGE = 'homepage';
export const TRADE_URL = 'trade';
export const READ_BY = 'readBy';

export const defaultPageOptions: PageOptions = {
  pageIndex: 0,
  pageSize: 10,
  filterText: '',
};
