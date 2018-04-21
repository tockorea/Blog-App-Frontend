<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import addBlog from "./components/addBlog";
import showBlogs from "./components/showBlogs";
import header from "./components/header";
import editBlog from "./components/editBlog";

export default {
  components: {
    "add-blog": addBlog,
    "show-blogs": showBlogs,
    "app-header": header,
    "edit-blog": editBlog
  },
  mounted() {
    this.$store.dispatch("fetchBlogs");
  }
};
</script>

<style>

</style>