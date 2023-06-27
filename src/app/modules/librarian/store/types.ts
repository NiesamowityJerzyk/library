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
