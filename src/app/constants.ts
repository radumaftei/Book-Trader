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

export const BOOK_CATEGORIES = {
  ADVENTURE: 'Adventure',
  ACTION: 'Action',
  SCIENCE: 'Science',
  FANTASY: 'Fantasy',
  ROMANCE: 'Romance',
  CONTEMPORARY: 'Contemporary',
  DYSTOPIAN: 'Dystopian',
  MYSTERY: 'Mystery',
  HORROR: 'Horror',
  THRILLER: 'Thriller',
  PARANORMAL: 'Paranormal',
  SF: 'SF',
  MEMOIR: 'Memoir',
  COOKING: 'Cooking',
  ART: 'Art',
  DEVELOPMENT: 'Development',
  MOTIVATIONAL: 'Motivational',
  HEALTH: 'Health',
  HISTORY: 'History',
  TRAVEL: 'Travel',
  GUIDE_HOW_TO: 'Guide / How to',
  FAMILIES_RELATIONSHIPS: 'Families & Relationships',
  HUMOR: 'Humor',
  CHILDREN: 'Children',
};

export const DIALOG_POPUP_MESSAGES = {
  DELETE_BOOK: 'Are you sure you want to delete this book?',
  TRADE_BOOK: 'Trading details',
  UNSAVED_CHANGES: 'Are you sure you want to exit this page?',
};

export const getBookCategoriesArr = (): string[] =>
  Object.values(BOOK_CATEGORIES);

export enum COLUMN_TYPES {
  INDEX = 'INDEX',
  STRING = 'STRING',
  IMAGE = 'IMAGE',
  DROPDOWN = 'DROPDOWN',
  BUTTON = 'BUTTON',
}
