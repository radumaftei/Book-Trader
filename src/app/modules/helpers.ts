import { BookApi, BookProfileDTO } from '../interfaces';
import { BOOK_CATEGORIES } from '../enums';

export const transformDTOBooks = (
  books: BookProfileDTO[],
  length: number
): BookApi => ({
  books: books
    .filter((book: BookProfileDTO) => !book.hidden)
    .map(
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
        hidden,
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
        hidden,
      })
    ),
  length,
});

export const getBookCategoriesArr = (): string[] =>
  Object.values(BOOK_CATEGORIES);
