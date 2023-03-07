import { makeAutoObservable } from "mobx";

export class RoomStore {
  rooms = [];

  constructor() {
    makeAutoObservable(this);
  }

  setRooms = (rooms) => {
    this.rooms = rooms;
  };

  getRooms = () => {
    return this.rooms;
  };
}
