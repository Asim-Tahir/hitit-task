<template>
  <div class="d-flex flex-column container-md w-auto">
    <Post v-for="post in PostsData" :key="post.id" :data="post" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  import PostsModule from "@/store/modules/posts";
  import UsersModule from "@/store/modules/users";

  import Post from "@/components/Post.vue";

  export default defineComponent({
    name: "Home",
    components: {
      Post
    },
    setup() {
      const PostsData = computed(() => PostsModule.Posts);

      const localData = localStorage.getItem("vuex");
      if (!localData) {
        PostsModule.GET_POSTS();
      } else {
        const moduleData = JSON.parse(localData);

        UsersModule.INIT_USERS(moduleData.UsersModule.Users);
        PostsModule.INIT_POSTS(moduleData.PostsModule.Posts);
      }

      return {
        PostsData,
      };
    }
  });
</script>
