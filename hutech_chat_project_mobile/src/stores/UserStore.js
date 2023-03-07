import { makeAutoObservable } from "mobx";

export class UserStore {
    isLogin = false;
    token = "";
    userInfo = {};

    constructor() {
        makeAutoObservable(this);
    }

    fetchUser = () => {

    }

    setIsLogin = () => {
        this.isLogin = true;
    }

    setUserInfo = (params) => {
        this.userInfo = params;
    }

    getUserInfo = () => {
        return this.userInfo;
    }

    setToken = () => {
        
    }

    getToken = () => {
        return this.token
    }

    clearUser = () => {
        this.isLogin = false;
        this.token = "";
        this.userInfo = {};
    }
}