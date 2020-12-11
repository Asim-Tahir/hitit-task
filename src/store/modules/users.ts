import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import axios from "axios";

import store from "@/store";
import { ActionByLocalStorage } from "@/store/modules";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Module({ dynamic: true, namespaced: true, store, name: "UsersModule" })
class Users extends VuexModule {
  public Users = Array<IUser>();

  private get API_USERS_BY_ID_URL() {
    // EXAMPLE:  https://jsonplaceholder.typicode.com/users/1
    return (id: number): string => `/api/users/${id}`;
  }

  private get API_USERS_URL() {
    // EXAMPLE:  https://jsonplaceholder.typicode.com/users
    return `/api/users`;
  }

  public get GET_USER_BY_ID() {
    return (id: number): IUser =>
      this.Users[this.Users.findIndex(user => user.id == id)];
  }

  @Mutation
  public INIT_USERS(payload: Array<IUser>) {
    this.Users = payload;
  }

  @Action
  @ActionByLocalStorage
  public async GET_USERS(): Promise<void> {
    await axios.get(this.API_USERS_URL).then(res => {
      this.INIT_USERS(res.data);
    });
  }
}

export default getModule(Users);
