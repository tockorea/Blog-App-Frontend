<template>
  <div>
    <app-header></app-header>
    <router-view v-bind:blogs="blogs" v-bind:blog="blog"></router-view>
  </div>
</template>

<script>
import addBlog from "./components/addBlog";
import showBlogs from "./components/showBlogs";
import listBlogs from "./components/listBlogs";
import header from "./components/header";
import editBlog from "./components/editBlog";
import eventBus from "./EventBus.js";

export default {
  components: {
    "add-blog": addBlog,
    "show-blogs": showBlogs,
    "list-blogs": listBlogs,
    "app-header": header,
    "edit-blog": editBlog
  },
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      blogs: []
    };
  },
  mounted: function() {
    this.fetchBlogs();
    eventBus.$on("addBlog", blog => {
      this.addBlog(blog);
    });
  },
  methods: {
    fetchBlogs: function() {
      this.$http
        .get("http://localhost:4000/api/blogs")
        .then(data => {
          this.blogs = data.body;
        })
        .catch(ex => {
          console.log("fetchBlogs failed", ex);
          this.blogs = [];
        });
    },
    addBlog: function(blog) {
      this.$http
        .post("http://localhost:4000/api/blogs", blog)
        .then(data => {
          console.log(data.body);
          this.fetchBlogs();
        })
        .catch(ex => {
          console.log("addBlog failed : ", ex);
        });
    },
    fetchBlogOne: function(id) {
      this.$http
        .get("http://localhost:4000/api/blogs/" + id)
        .then(data => {
          this.blog = data.body;
        })
        .catch(ex => {
          console.log("fetchBlogOne failed", ex);
        });
    }
  }
};
</script>

<style>

</style>
