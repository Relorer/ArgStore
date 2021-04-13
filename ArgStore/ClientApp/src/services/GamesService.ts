import { action, computed, makeObservable, observable } from "mobx";
import { deleteGame, getGames, insertGame, updateGame } from "../api/GamesApi";
import { Game } from "../models/ApiModel";
import { Notify } from "./SnackBarProvider";

export class GamesService {
  @observable
  public games: Game[] = [];

  public notify: Notify;
  constructor(notify: Notify = (mes) => console.log(mes)) {
      this.notify = notify;
      makeObservable(this, {
        games: observable,
        refreshGames: action.bound,
        update: action.bound,
        remove: action.bound,
        create: action.bound,
        });
  }

  public async create() {
      try {
        const _game: Game = {
          id: undefined,
          name: "Nameless",
          description: "",
          price: 0,
          priceIncludingDiscount: 0,
          coverPath: "",
          releaseDate: new Date(),
          rating: undefined,
          comments: undefined,
          genres: undefined,
        };
          await insertGame(_game);
          await this.refreshGames();
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async update(game: Game) {
      try {
          await updateGame(game);
          this.notify("Updated", "success");
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async remove(game: Game) {
      try {
          await deleteGame(game.id || 0);
          this.games = this.games.filter((element) => element !== game);
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async refreshGames() {
      try {
          this.games = await getGames();
      } catch (e) {
          this.games = [];
          this.notify(e.message, "error");
      }
  }
}
