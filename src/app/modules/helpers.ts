import { BookApi, BookProfileDTO } from '../interfaces';
import {BOOK_CATEGORIES} from '../enums';

export const areObjectDifferent = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
): boolean => {
  if (!obj1 || !obj2) return;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return;
  let objectsDifferent = false;
  Object.keys(obj1).map((key) => {
    if (obj1[key] !== obj2[key]) {
      objectsDifferent = true;
    }
  });
  return objectsDifferent;
};

export const transformDTOBooks = (
  books: BookProfileDTO[],
  length: number
): BookApi => ({
  books: books.map(
    ({
      _id,
      title,
      category,
      description,
      imagePath,
      location,
      author,
      tradingPreferenceAuthor,
      tradingPreferenceBook,
      tradingPreferenceDescription,
      tradingPreferenceGenre,
      userId,
      username,
    }) => ({
      id: _id,
      title,
      author,
      category,
      description,
      imagePath,
      location,
      tradingPreferenceGenre,
      tradingPreferenceDescription,
      tradingPreferenceBook,
      tradingPreferenceAuthor,
      username,
      userId,
      changed: false,
    })
  ),
  length,
});


export const getBookCategoriesArr = (): string[] =>
  Object.values(BOOK_CATEGORIES);
