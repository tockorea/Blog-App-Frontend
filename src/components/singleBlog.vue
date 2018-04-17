<template>
  <div id="single-blog">
    <h1>{{ blog.title }}</h1>
    <article>{{ blog.content }}</article>
    <p>Author: {{ blog.author }}</p>
    <p>Categories:</p>
    <ul>
      <li v-for="(category, index) in blog.categories" :key="index">
        {{ category }}
      </li>
    </ul>
    <div v-if="!deleted">
      <button class="btn btn-primary" v-on:click="deleteBlog">Delete</button>
      <router-link class="btn btn-primary" v-bind:to="'/edit/' + this.id" exact>Edit</router-link>
    </div>
  </div>
</template>

<script>
import eventBus from "../EventBus.js";

export default {
  props: ["blog"],
  data() {
    return {
      id: this.$route.params.id,
      deleted: false
    };
  },
  methods: {
    deleteBlog: function() {
      eventBus.$emit("deleteBlog", this.id);
      this.deleted = true;
    }
  },
  created() {
    eventBus.$emit("fetchBlogOne", this.id);
  }
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
}
</style>