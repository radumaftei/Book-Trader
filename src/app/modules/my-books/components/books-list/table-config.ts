export const headerConfig = [
  { field_name: 'Image', column_name: 'image', type: 'IMAGE' },
  { field_name: 'Title', column_name: 'title', type: 'STRING' },
  { field_name: 'Author', column_name: 'author', type: 'STRING' },
  { field_name: 'Category', column_name: 'category', type: 'DROPDOWN' },
  {
    field_name: 'Description',
    column_name: 'description',
    type: 'STRING',
  },
  {
    field_name: 'Trading Preference Authors',
    column_name: 'tradingPreferenceAuthor',
    type: 'STRING',
  },
  {
    field_name: 'Trading Preference Books',
    column_name: 'tradingPreferenceBook',
    type: 'STRING',
  },
  {
    field_name: 'Trading Preference Genres',
    column_name: 'tradingPreferenceGenre',
    type: 'STRING',
  },
  {
    field_name: 'Trading Preference Description',
    column_name: 'tradingPreferenceDescription',
    type: 'STRING',
  },
  { field_name: '', column_name: 'delete', type: 'BUTTON' },
];

export const displayedColumns: string[] = [
  'image',
  'title',
  'author',
  'category',
  'description',
  'tradingPreferenceAuthor',
  'tradingPreferenceBook',
  'tradingPreferenceGenre',
  'tradingPreferenceDescription',
  'delete',
];
