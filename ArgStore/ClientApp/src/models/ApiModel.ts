export type BaseEntity = {
  id: string | undefined;
};

export type Basket = BaseEntity & {
  games: Game[];
  user: User;
};

export type Comment = BaseEntity & {
  text: string;
  user: User;
  game: Game;
};

export type Game = BaseEntity & {
  name: string;
  description: string;
  releaseDate: Date;
  price: number;
  priceIncludingDiscount: number;
  coverPath: string;
  rating: Rating | undefined;
  comments: Comment[] | undefined;
  genres: Genre[] | undefined;
};

export type Genre = BaseEntity & {
  name: string;
  games: Game[];
};

export type Mark = BaseEntity & {
  value: string;
  user: User;
  rating: Rating;
};

export type PurchasedGame = BaseEntity & {
  price: number;
  date: Date;
  game: Game;
  purchaseHistory: PurchaseHistory;
};

export type PurchaseHistory = BaseEntity & {
  purchasedGame: PurchasedGame[];
  user: User;
};

export type Rating = BaseEntity & {
  marks: Mark[];
};

export type User = BaseEntity & {
  firstName: string;
  lastName: string;
  login: string;
  userName: string;
  password: string;
  basket: Basket;
  marks: Mark[];
  comments: Comment[];
};

export type RegisterForm = {
  login: string;
  password: string;
  passwordConfirm: string;
};

export type LoginForm = {
  login: string;
  password: string;
  rememberMe: boolean;
};

export type AuthInfo = {
  isAuth: boolean;
  user: User;
  role: Role;
};

export type Role = "admin" | "user" | "noauth";
