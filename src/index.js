import Vue from 'vue';
const Game = require('./game');

const vm = new Vue({
  el: '#app',
  data: {
    message: 'hello vue',
    inGame: true,
    inMenu: false,
    test: ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
  },
  mounted : function(){
    console.log('Hello Webpack and Vue !');  
  }
});