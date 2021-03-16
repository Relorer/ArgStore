export type BaseEntity = {
  id: number;
};

export type Basket = BaseEntity & {
  Games: Game[];
  User: User;
};

export type Comment = BaseEntity & {
  Text: string;
  User: User;
  Game: Game;
};

export type Game = BaseEntity & {
  Name: string;
  Description: string;
  ReleaseDate: Date;
  Price: number;
  PriceIncludingDiscount: number;
  CoverPath: string;
  Rating: Rating;
  Comments: Comment[];
  Genres: Genre[];
};

export type Genre = BaseEntity & {
  Name: string;
  Games: Game[];
};

export type Mark = BaseEntity & {
  Value: string;
  User: User;
  Rating: Rating;
};

export type PurchasedGame = BaseEntity & {
  Price: number;
  Date: Date;
  Game: Game;
  PurchaseHistory: PurchaseHistory;
};

export type PurchaseHistory = BaseEntity & {
  PurchasedGame: PurchasedGame[];
  User: User;
};

export type Rating = BaseEntity & {
  Marks: Mark[];
};

export type User = BaseEntity & {
  FirstName: string;
  LastName: string;
  Login: string;
  Password: string;
  Basket: Basket;
  Marks: Mark[];
  Comments: Comment[];
};
