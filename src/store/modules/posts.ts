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
import UsersModule, { IUser } from "./users";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: Array<IComment>;
  author: IUser;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Module({ dynamic: true, namespaced: true, store, name: "PostsModule" })
class Posts extends VuexModule {
  Posts = Array<IPost>();

  private get API_POSTS_URL() {
    // EXAMPLE:  https://jsonplaceholder.typicode.com/posts
    return `/api/posts`;
  }

  private get API_POST_BY_ID_URL() {
    // EXAMPLE:  https://jsonplaceholder.typicode.com/posts/1
    return (id: number): string => `/api/posts/${id}`;
  }

  private get API_POST_COMMENTS_BY_ID_URL() {
    // EXAMPLE:  https://jsonplaceholder.typicode.com/posts/1/comments
    return (id: number): string => `/api/posts/${id}/comments`;
  }

  public get GET_POST_BY_ID() {
    return (id: number): IPost =>
      this.Posts[this.Posts.findIndex(post => post.id == id)];
  }

  @Mutation
  public INIT_POSTS(payload: Array<IPost>) {
    this.Posts = payload.map(post => ({
      ...post,
      author: UsersModule.GET_USER_BY_ID(post.userId)
    }));
  }

  @Mutation
  public INIT_POST_COMMENTS_BY_ID({
    postId,
    comments
  }: {
    postId: number;
    comments: Array<IComment>;
  }) {
    this.Posts = this.Posts.map(post =>
      post.id == postId ? { ...post, comments } : post
    );
  }

  @Action
  @ActionByLocalStorage
  public async GET_POSTS(): Promise<void> {
    await UsersModule.GET_USERS().then(async () => {
      await axios.get(this.API_POSTS_URL).then(res => {
        this.INIT_POSTS(res.data);
      });
    });
  }

  @Action
  @ActionByLocalStorage
  public async GET_POST_COMMENTS_BY_POST_ID(payload: number): Promise<void> {
    await axios.get(this.API_POST_COMMENTS_BY_ID_URL(payload)).then(res => {
      this.INIT_POST_COMMENTS_BY_ID({ postId: payload, comments: res.data });
    });
  }
}

export default getModule(Posts);
