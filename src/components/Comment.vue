<template>
  <div class="d-flex flex-row rounded-lg overflow-hidden my-4 shadow-sm mx-5">
    <div class="d-flex flex-column flex-grow-1 gap-1 p-3 text-justify">
      <span>{{data.email}}</span>
      <h4>{{data.name}}</h4>
      <p>{{data.body}}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Comment",
    props: {
      data: {
        type: Object,
        required: false,
        default: {
          postId: 0,
          id: 0,
          name: "Default Name",
          email: "default@email.com",
          body: "Default Body"
        }
      }
    },
    setup() {
      return {
        
      };
    }
  });
</script>

<style lang="scss" scoped></style>
