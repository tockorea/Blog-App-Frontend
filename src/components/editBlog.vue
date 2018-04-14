<template>
  <div id="edit-blog">
    <h2>Edit a Blog Post</h2>
    <form v-if="!submitted">
      <label>Blog Title:</label>
      <input type="text" required v-model.lazy="blog.title" />
      <label>Blog Content:</label>
      <textarea rows="10" v-model.lazy="blog.content"></textarea>
      <div id="checkboxes">
        <label>Ninjas</label>
        <input type="checkbox" value="ninjas" v-model="blog.categories" />
        <label>Wizards</label>
        <input type="checkbox" value="wizards" v-model="blog.categories" />
        <label>Mario</label>
        <input type="checkbox" value="mario" v-model="blog.categories" />
        <label>Cheese</label>
        <input type="checkbox" value="cheese" v-model="blog.categories" />
      </div>
      <label>Author:</label>
      <select v-model="blog.author">
        <option v-for="(author, index) in authors" :key="index">{{ author }}</option>
      </select>
      <button class="btn btn-primary" v-on:click.prevent="updateBlog">Update</button>
    </form>
    <div v-if="submitted">
      <h3>Thanks for updating your post</h3>
    </div>
    <div id="preview">
      <h3>Preview Blog</h3>
      <p>Blog title: {{ blog.title }}</p>
      <p>Blog content:</p>
      <p>{{ blog.content }}</p>
      <p>Blog Categories:</p>
      <ul>
        <li v-for="(category, index) in blog.categories" :key="index">{{ category }}</li>
      </ul>
      <p>Author: {{ blog.author }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      authors: ["The Net Ninja", "The Angular Avenger", "The Vue Vindicator"],
      submitted: false
    };
  },
  methods: {
    updateBlog: function() {
      this.$http
        .put("http://localhost:4000/api/blogs/" + this.id, this.blog)
        .then(function(data) {
          console.log(data);
          this.submitted = true;
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
#edit-blog * {
  box-sizing: border-box;
}
#edit-blog {
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