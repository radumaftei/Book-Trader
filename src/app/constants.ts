export const NO_PREFERENCE = 'NO_PREFERENCE';
export const FEW_MATCH = 'FEW_MATCH';
export const NO_MATCH = 'NO_MATCH';

export const HOME_URL = 'http://localhost:3000/api';
export const MY_BOOKS_URL = 'personal-book-page';
export const USER_SIGNUP_URL = 'signup';
export const USER_LOGIN_URL = 'login';
export const HOMEPAGE = 'homepage';

export const TRADING_PREFERENCES_STATUS = {
  NO_PREFERENCE,
  FEW_MATCH,
  NO_MATCH
};

export const BOOK_CATEGORIES = {
  ADVENTURE: 'Adventure',
  ACTION: 'Action',
  SCIENCE: 'Science'
};

export const DIALOG_POPUP_MESSAGES = {
  DELETE_BOOK: 'Are you sure you want to delete this book?',
  TRADE_BOOK: 'Trading details'
}



export const getBookCategoriesArr = (): string[] => Object.values(BOOK_CATEGORIES);
