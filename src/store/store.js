import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  // strict: true,
  state: {
    blog: {
      title: "",
      content: "",
      categories: [],
      author: ""
    },
    blogs: []
  },
  mutations: {
    fetchBlogs: (state, payload) => {
      state.blogs = payload;
    },
    fetchBlogOne: (state, payload) => {
      state.blog = payload;
    },
    initBlog: state => {
      state.blog = {
        title: "",
        content: "",
        categories: [],
        author: ""
      };
    },
    initBlogs: state => {
      state.blogs = [];
    }
  },
  actions: {
    fetchBlogs: context => {
      axios.get(`http://localhost:4000/api/blogs`)
        .then(response => {
          context.commit('fetchBlogs', response.data);
        })
        .catch(ex => {
          console.log('fetchBlogs failed', ex);
          context.commit('initBlogs');
        });
    },
    addBlog: (context, payload) => {
      axios
        .post(`http://localhost:4000/api/blogs`, payload)
        .then(response => {
          context.dispatch('fetchBlogs');
        })
        .catch(ex => {
          console.log("addBlog failed : ", ex);
        });
    },
    fetchBlogOne: (context, payload) => {
      axios
        .get(`http://localhost:4000/api/blogs/${payload}`)
        .then(response => {
          context.commit('fetchBlogOne', response.data);
        })
        .catch(ex => {
          console.log("fetchBlogOne failed", ex);
          context.commit('initBlog');
        });
    },
    updateBlog: (context, payload) => {
      axios
        .put(`http://localhost:4000/api/blogs/${payload._id}`, payload)
        .then(response => {
          context.dispatch('fetchBlogs');
        })
        .catch(ex => {
          console.log("updateBlog failed : ", ex);
        });
    },
    deleteBlog: (context, payload) => {
      axios
        .delete(`http://localhost:4000/api/blogs/${payload}`)
        .then(response => {
          context.dispatch('fetchBlogs');
        })
        .catch(ex => {
          console.log("deleteBlog failed", ex);
        });
    }
  }
})