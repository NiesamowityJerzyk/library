export interface IBook {
  bookID: number;
  title: string;
  releaseYear: number;
  publisher: number;
  publisherName: string;
  numberOfCopies: number;
  author: number;
  authorFirstName: string;
  authorLastName: string;
}

export interface IPublisher {
  publisherID: number;
  publisherName: string;
}
export interface IAuthor {
  authorID: number;
  firstName: string;
  lastName: string;
  yearOfBirth: number;
}

export interface IBorrow {
  bookID: number;
  bookTitle: string;
  borrowDate: string;
  borrowID: number;
  borrowStatusID: number;
  borrowStatusName: string;
  copyID: number;
  copyStatusName: string;
  penalty: number;
  returnDate: string;
  userFirstName: string;
  userID: number;
  userLastName: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
