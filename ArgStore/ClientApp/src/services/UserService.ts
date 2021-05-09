import { action, computed, makeObservable, observable } from "mobx";
import { getAuthInfo, signin, signout, signup } from "../api/Auth";
import { addGameToBasket, deleteGameToBasket, clearBasket } from "../api/BasketApi";
import {
    AuthInfo,
    Game,
    SigninForm,
    SignupForm,
    User,
} from "../models/ApiModel";
import { Notify } from "./SnackBarProvider";

export class UserService {
  @observable
  public AuthInfo: AuthInfo = {
      isAuth: false,
      user: null,
      role: "noload",
  };

  public notify: Notify;
  constructor(
      notify: Notify = (mes): void => {
          console.log(mes);
      }
  ) {
      this.notify = notify;
      makeObservable(this, {
          AuthInfo: observable,
          signin: action.bound,
          signout: action.bound,
          signup: action.bound,
          addGameToBasket: action.bound,
          deleteGameToBasket: action.bound,
          clearBasket: action.bound,
      });
      this.getAuthInfo();
  }

  public async signin(signinForm: SigninForm): Promise<void> {
      try {
          await signin(signinForm);
          await this.getAuthInfo();
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async signout(): Promise<void> {
      try {
          await signout();
          await this.getAuthInfo();
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async signup(signupForm: SignupForm): Promise<void> {
      try {
          await signup(signupForm);
          await this.getAuthInfo();
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async addGameToBasket(game: Game): Promise<void> {
      try {
          this.AuthInfo.user = await addGameToBasket(game);
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async deleteGameToBasket(id: string): Promise<void> {
      try {
          this.AuthInfo.user = await deleteGameToBasket(id);
      } catch (e) {
          this.notify(e.message, "error");
      }
  }

  public async clearBasket() {
    try {
        this.AuthInfo.user = await clearBasket();
    } catch (e) {
        this.notify(e.message, "error");
    }
}

  private async getAuthInfo(): Promise<void> {
      try {
          this.AuthInfo = await getAuthInfo();
      } catch (e) {
          this.notify(e.message, "error");
      }
  }
}
