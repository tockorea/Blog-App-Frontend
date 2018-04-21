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
export default {
  data() {
    return {
      id: this.$route.params.id,
      deleted: false
    };
  },
  computed: {
    blog() {
      return this.$store.state.blog;
    }
  },
  methods: {
    deleteBlog: function() {
      this.$store.dispatch("deleteBlog", this.id);
      this.deleted = true;
    }
  },
  created() {
    this.$store.dispatch("fetchBlogOne", this.id);
  }
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
}
</style>