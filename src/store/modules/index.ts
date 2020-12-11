import UsersModule from '@/store/modules/users';
import PostsModule from '@/store/modules/posts';

export function ActionByLocalStorage(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  const method = descriptor.value;
  const vuexLocalStorage = localStorage.getItem("vuex");
  descriptor.value = function(...args: Array<any>) {
    if (!vuexLocalStorage){
      method.apply(this, args);
    } else {
      const data = JSON.parse(vuexLocalStorage);
      UsersModule.INIT_USERS(data.UsersModule.Users);
      PostsModule.INIT_POSTS(data.PostsModule.Posts);
    }
    return;
  };
}