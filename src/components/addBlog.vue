<template>
  <div id="add-blog">
    <h2>Add a New Blog Post</h2>
    <form v-if="!submitted">
      <label>Blog Title:</label>
      <input type="text" required v-model.lazy="title" />
      <label>Blog Content:</label>
      <textarea v-model.lazy="content"></textarea>
      <div id="checkboxes">
        <label>Ninjas</label>
        <input type="checkbox" value="ninjas" v-model="categories" />
        <label>Wizards</label>
        <input type="checkbox" value="wizards" v-model="categories" />
        <label>Mario</label>
        <input type="checkbox" value="mario" v-model="categories" />
        <label>Cheese</label>
        <input type="checkbox" value="cheese" v-model="categories" />
      </div>
      <label>Author:</label>
      <select v-model="author">
        <option v-for="(author, index) in authors" :key="index">{{ author }}</option>
      </select>
      <button class="btn btn-primary" v-if="title !== ''" v-on:click.prevent="post">Add Blog</button>
    </form>
    <div v-if="submitted">
      <h3>Thanks for adding your post</h3>
    </div>
    <div id="preview">
      <h3>Preview Blog</h3>
      <p>Blog title: {{ title }}</p>
      <p>Blog content:</p>
      <p>{{ content }}</p>
      <p>Blog Categories:</p>
      <ul>
        <li v-for="(category, index) in categories" :key="index">{{ category }}</li>
      </ul>
      <p>Author: {{ author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authors: ["The Net Ninja", "The Angular Avenger", "The Vue Vindicator"],
      submitted: false
    };
  },
  computed: {
    blog() {
      return this.$store.state.blog;
    },
    title: {
      get() {
        return this.$store.state.blog.title;
      },
      set(value) {
        this.$store.commit("updateTitle", value);
      }
    },
    content: {
      get() {
        return this.$store.state.blog.content;
      },
      set(value) {
        this.$store.commit("updateContent", value);
      }
    },
    categories: {
      get() {
        return this.$store.state.blog.categories;
      },
      set(value) {
        this.$store.commit("updateCategories", value);
      }
    },
    author: {
      get() {
        return this.$store.state.blog.author;
      },
      set(value) {
        this.$store.commit("updateAuthor", value);
      }
    }
  },
  methods: {
    post: function() {
      this.$store.dispatch("addBlog", this.blog);
      this.submitted = true;
    }
  },
  created() {
    this.$store.commit("initBlog");
    this.submitted = false;
  }
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 500px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea {
  display: block;
  width: 100%;
  padding: 8px;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
#checkboxes label {
  display: inline-block;
}
</style>