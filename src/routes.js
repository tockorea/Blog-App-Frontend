import showBlogs from './components/showBlogs.vue';
import addBlog from './components/addBlog.vue';
import singleBlog from './components/singleBlog.vue';
import editBlog from './components/editBlog.vue';

export default [
  { path: '/', component: showBlogs },
  { path: '/add', component: addBlog },
  { path: '/blog/:id', component: singleBlog },
  { path: '/edit/:id', component: editBlog }
]