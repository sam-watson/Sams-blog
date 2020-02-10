// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@rails/ujs").start()
// require("turbolinks").start()
// require("@rails/activestorage").start()
// require("channels")
//
// import '../css/application.css'

import Vue from 'vue/dist/vue.esm';

import App from '../app.vue';
Vue.component('app', App);

Vue.directive('focus', {
  inserted: function (el, binding) {
    if (binding.arg == 'active' && binding.value) {
      el.focus();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '[data-behavior="vue"]',
  })
})


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
