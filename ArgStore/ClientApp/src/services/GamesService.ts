import { action, computed, makeObservable, observable } from "mobx";
import { getGames } from "../api/GamesApi";
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
        });
  }

//   @computed get sortedRooms() {
//       return this.rooms.slice().sort((n1, n2) => {
//           const name1 = n1.name.toLocaleLowerCase();
//           const name2 = n2.name.toLocaleLowerCase();
//           if (name1 > name2) {
//               return 1;
//           }
//           if (name1 < name2) {
//               return -1;
//           }
//           return 0;
//       });
//   }

//   @action.bound
//   public async add(
//       name: string,
//       ipAddress: string,
//       port: string,
//       roomID: string
//   ) {
//       try {
//           const newDetector: IDetector = {
//               id: "",
//               name,
//               ipAddress,
//               port,
//               roomID,
//           };
//           const addedDetector: IDetector = await saveDetector(newDetector);
//           this.detectors.push(addedDetector);
//       } catch (e) {
//           this.notify(e.message, "error");
//       }
//   }

//   @action.bound
//   public async update(detector: IDetector) {
//       try {
//           await updateDetector(detector);
//       } catch (e) {
//           this.notify(e.message, "error");
//       }
//   }

//   @action.bound
//   public async remove(detector: IDetector) {
//       try {
//           await deleteDetector(detector);
//           this.detectors = this.detectors.filter((element) => element !== detector);
//       } catch (e) {
//           this.notify(e.message, "error");
//       }
//   }

//   @action.bound
//   public async refreshDetectors() {
//       try {
//           this.detectors = await detectors();
//       } catch (e) {
//           this.detectors = [];
//           this.notify(e.message, "error");
//       }
//   }

  public async refreshGames() {
      try {
          this.games = await getGames();
      } catch (e) {
          this.games = [];
          this.notify(e.message, "error");
      }
  }
}
