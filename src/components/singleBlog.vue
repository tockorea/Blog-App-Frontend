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
    <div>
      <button class="btn btn-primary" v-show="!deleted" v-on:click="deleteBlog">Delete</button>
      <router-link class="btn btn-primary" v-bind:to="'/edit/' + this.id" exact>Edit</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      deleted: false
    };
  },
  methods: {
    deleteBlog: function() {
      this.$http
        .delete("http://localhost:4000/api/blogs/" + this.id)
        .then(function(data) {
          this.deleted = true;
        });
    }
  },
  created() {
    this.$http
      .get("http://localhost:4000/api/blogs/" + this.id)
      .then(function(data) {
        // console.log(data);
        this.blog = data.body;
      });
  }
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
}
</style>