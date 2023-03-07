import { makeAutoObservable } from "mobx";
 
 export class ServicesStore {
  services = [];

  constructor() {
    makeAutoObservable(this);
  }
 
  setServices = (services) => {
    this.services = services;
  };
 
  getServices = () => {
    return this.services;
  };
}
