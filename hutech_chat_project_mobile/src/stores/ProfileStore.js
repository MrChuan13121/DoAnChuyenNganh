import { makeAutoObservable } from "mobx";

export class ProfileStore {
  profiles = [];

  constructor() {
    makeAutoObservable(this);
  }

  setProfiles = (profiles) => {
    this.profiles = profiles;
  };

  getProfiles = () => {
    return this.profiles;
  };
}
