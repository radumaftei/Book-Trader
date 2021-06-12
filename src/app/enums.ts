export enum BOOK_CATEGORIES {
  ADVENTURE = 'Adventure',
  ACTION = 'Action',
  SCIENCE = 'Science',
  FANTASY = 'Fantasy',
  ROMANCE = 'Romance',
  CONTEMPORARY = 'Contemporary',
  DYSTOPIAN = 'Dystopian',
  MYSTERY = 'Mystery',
  HORROR = 'Horror',
  THRILLER = 'Thriller',
  PARANORMAL = 'Paranormal',
  SF = 'SF',
  MEMOIR = 'Memoir',
  COOKING = 'Cooking',
  ART = 'Art',
  DEVELOPMENT = 'Development',
  MOTIVATIONAL = 'Motivational',
  HEALTH = 'Health',
  HISTORY = 'History',
  TRAVEL = 'Travel',
  GUIDE_HOW_TO = 'Guide / How to',
  FAMILIES_RELATIONSHIPS = 'Families & Relationships',
  HUMOR = 'Humor',
  CHILDREN = 'Children',
}

export enum DIALOG_POPUP_MESSAGES {
  DELETE_BOOK = 'Are you sure you want to delete this book?',
  TRADE_BOOK = 'Trading details',
  UNSAVED_CHANGES = 'Are you sure you want to exit this page?',
  SHOW_INFORMATION = 'Notification trade details',
}

export enum DIALOG_POPUP_ACTIONS {
  DELETE = 'Delete',
  SEND_TRADE_OFFER = 'Send Trade offer',
  LOSE_CHANGES = 'Lose changes',
}

export enum COLUMN_TYPES {
  STRING = 'STRING',
  IMAGE = 'IMAGE',
  DROPDOWN = 'DROPDOWN',
  BUTTON = 'BUTTON',
}

export enum TRADE_STATUSES {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}
