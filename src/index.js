import Vue from 'vue';
const Game = require('./game');

const vm = new Vue({
  el: '#app',
  data: {
    message: 'hello vue',
    inGame: true,
    inMenu: false,
    test: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']
  },
  mounted : function(){
    console.log('Hello Webpack and Vue !');  
  }
});