export interface IBorrow {
  borrowStatusID: number;
  borrowStatusName: string;
}
export interface ICopyStatus {
  copyStatusID: number;
  copyStatusName: string;
}

export interface ICreateBorrow {
  copyID: number;
  userID: number;
  borrowStatusID: number;
}
