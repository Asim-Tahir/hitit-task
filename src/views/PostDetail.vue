<template>
  <div class="d-flex flex-column container-md w-auto">
    <h3 class="mt-2">
      <router-link class="text-decoration-none text-dark" to="/">← Back to Home</router-link>
    </h3>
    <Post :data="PostData" />
    <h3 class="text-center mt-5">Comments</h3>
    <Comment
      v-for="comment in PostData.comments"
      :key="comment.id"
      :data="comment"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useRoute } from "vue-router";

  import PostsModule from "@/store/modules/posts";

  import Post from "@/components/Post.vue";
  import Comment from "@/components/Comment.vue";

  export default defineComponent({
    name: "PostDetail",
    components: {
      Post,
      Comment
    },
    setup() {
      const route = useRoute();

      const PostData = computed(() =>
        PostsModule.GET_POST_BY_ID(parseInt(route.params.id[0]))
      );

      (async () => {
        if (PostsModule.Posts.length < 1) await PostsModule.GET_POSTS();
        await PostsModule.GET_POST_COMMENTS_BY_POST_ID(
          parseInt(route.params.id[0])
        );
      })();

      return {
        PostData
      };
    }
  });
</script>

<style lang="scss" scoped></style>
