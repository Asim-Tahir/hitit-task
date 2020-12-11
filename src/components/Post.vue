<template>
  <div class="d-flex flex-row rounded-lg overflow-hidden my-4 shadow-lg">
    <div class="d-flex flex-column flex-grow-1 gap-1 p-3 text-justify">
      <div
        class="d-flex flex-row gap-1 align-items-center mb-2 font-weight-bold"
      >
        <img
          :src="`https://randomuser.me/api/portraits/women/${data.userId}.jpg`"
          width="32"
          height="32"
          alt="User Profile Photo"
          class="rounded-pill"
        />

        <router-link
          class="text-decoration-none text-secondary"
          :to="`/user/${data.userId}`"
        >
          {{ data.author.username }}
        </router-link>

        <span>
          in
        </span>

        <router-link to="/">
          <b>{{ data.author.company.name }}</b>
        </router-link>
      </div>
      <router-link
        class="text-decoration-none text-dark"
        :to="`/post/${data.id}`"
      >
        <h3 class="text-capitalize">
          <b>{{ data.title }}</b>
        </h3>
      </router-link>
      <p>{{ data.body }}</p>
    </div>
    <img
      :src="`https://source.unsplash.com/random/256x256?sig=${sigId}`"
      width="256"
      height="256"
      alt="Post Image"
    />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";

  export default defineComponent({
    name: "Post",
    props: {
      data: {
        type: Object,
        required: false,
        default: {
          userId: 0,
          id: 0,
          title: "Default Title",
          body: "Default Body",
          comments: [],
          author: {
            username: "Default Username",
            company: {
              name: "Default Compony Name"
            }
          }
        }
      }
    },
    setup({ data }) {
      const sigId = computed(() => Math.floor(Math.random() * 1000 + data.id));

      return {
        sigId
      };
    }
  });
</script>

<style lang="scss" scoped></style>
