export const NO_PREFERENCE = 'NO_PREFERENCE';
export const FEW_MATCH = 'FEW_MATCH';
export const NO_MATCH = 'NO_MATCH';

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



export const getBookCategoriesArr = (): string[] => Object.values(BOOK_CATEGORIES);
