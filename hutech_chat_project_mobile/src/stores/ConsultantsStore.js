import { makeAutoObservable } from "mobx";

export class ConsultantsStore {
    consultants = []

    constructor() {
        makeAutoObservable(this);
    }

    setConsultants = (consultants) => {
        this.consultants = consultants;
    }

    getConsultants = () => {
        return this.consultants;
    }
}