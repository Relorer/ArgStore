import { action, computed, makeObservable, observable } from "mobx";
import { deleteGame, getGames, insertGame, updateGame } from "../api/GamesApi";
import { Game } from "../models/ApiModel";
import { Notify } from "./SnackBarProvider";

export class GamesService {
  @observable
  public games: Game[] = [];

  public notify: Notify;
  constructor(
      notify: Notify = (mes): void => {
          console.log(mes);
      }
  ) {
      this.notify = notify;
      makeObservable(this, {
          games: observable,
          refreshGames: action.bound,
          update: action.bound,
          remove: action.bound,
          create: action.bound,
      });
  }

  public async create(): Promise<void> {
      try {
          const _game: Game = {
              id: undefined,
              name: "Nameless",
              description: "",
              price: 0,
              discount: 0,
              cover: "/images/notfound.png",
              releaseDate: new Date(),
              marks: [],
              comments: undefined,
              genres: undefined,
          };
          await insertGame(_game);
          await this.refreshGames();
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async update(game: Game): Promise<void> {
      try {
          await updateGame(game);
          await this.refreshGames();
          this.notify("Updated", "success");
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async remove(game: Game): Promise<void> {
      try {
          await deleteGame(game.id || "");
          this.games = this.games.filter((element) => element !== game);
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async refreshGames(): Promise<void> {
      try {
          this.games = await getGames();
      } catch (e) {
          this.games = [];
          this.notify(e.message, "error");
      }
  }
}
