<template>
  <div>
    <app-header></app-header>
    <router-view v-bind:blogs="blogs" v-bind:blog="blog"></router-view>
  </div>
</template>

<script>
import axios from "axios";
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
  mounted() {
    this.fetchBlogs();
    eventBus.$on("addBlog", blog => {
      this.addBlog(blog);
    });
    eventBus.$on("fetchBlogOne", id => {
      this.fetchBlogOne(id);
    });
    eventBus.$on("updateBlog", blog => {
      this.updateBlog(blog);
    });
    eventBus.$on("deleteBlog", id => {
      this.deleteBlog(id);
    });
    eventBus.$on("initBlog", () => {
      this.initBlog();
    });
  },
  methods: {
    fetchBlogs: function() {
      axios
        .get(`http://localhost:4000/api/blogs`)
        .then(data => {
          this.blogs = data.data;
        })
        .catch(ex => {
          console.log("fetchBlogs failed", ex);
          this.blogs = [];
        });
    },
    addBlog: function(blog) {
      axios
        .post(`http://localhost:4000/api/blogs`, blog)
        .then(data => {
          this.fetchBlogs();
        })
        .catch(ex => {
          console.log("addBlog failed : ", ex);
        });
    },
    fetchBlogOne: function(id) {
      axios
        .get(`http://localhost:4000/api/blogs/${id}`)
        .then(data => {
          this.blog = data.data;
        })
        .catch(ex => {
          console.log("fetchBlogOne failed", ex);
          this.blog = {};
        });
    },
    updateBlog: function(blog) {
      axios
        .put(`http://localhost:4000/api/blogs/${blog._id}`, blog)
        .then(data => {
          this.fetchBlogs();
        })
        .catch(ex => {
          console.log("updateBlog failed : ", ex);
        });
    },
    deleteBlog: function(id) {
      axios
        .delete(`http://localhost:4000/api/blogs/${id}`)
        .then(data => {
          this.fetchBlogs();
        })
        .catch(ex => {
          console.log("deleteBlog failed", ex);
        });
    },
    initBlog: function() {
      this.blog = {
        title: "",
        content: "",
        categories: [],
        author: ""
      };
    }
  }
};
</script>

<style>

</style>