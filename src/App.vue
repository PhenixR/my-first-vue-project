<template>
  <div id="app">
    <h1>{{title}}</h1>
    <input class="inputbox" v-model="newItem" @keyup.enter="addNew" placeholder="What needs to be done?">
    <ul>
      <li v-for="item in items" v-bind:class="{finished:item.isFinished}">
        <span v-on:click="toggleFinish(item)">{{item.label}}</span>
        <transition name="times">
        <times v-if="show"></times>
        </transition>
        <button class="destroy" @click="removeTodo(item)"></button>
      </li>
      <button @click="show = !show" class="hide"></button>
    </ul>
  </div>
</template>

<script>
import Store from './store.js'
export default {
  data: function () {
    return {
      title:'This is a todo list',
      items: Store.fetch(),
      newItem: '',
      show:true,
    }    
  },
  watch: {
    items: {
      handler: function (items) {
        Store.save(items)
      },
      deep:true
    }
  },
  methods: {
    toggleFinish: function (item) {
      item.isFinished = !item.isFinished
    },
    addNew: function () {
      this.items.push ({
        label:this.newItem,
        isFinished:false
      })
      this.newItem = ''
    },
    removeTodo: function (item) {
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
    hideTimes: function (toggle) {
      show = !show;
      toggle.isHide = !toggle.isHide;

    }
  }
}
</script>

<style>
.finished {
  text-decoration: line-through;
  color: rgb(204, 204, 204);
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.inputbox {
  width: 250px;
  height: 30px;
  border-radius: 5px;
	font-weight: bold;
  font-size: 20px;
}

.inputbox:focus {
  outline: none;
}

.inputbox::-webkit-input-placeholder{
  font-style: italic;
	font-weight: bold;
	color: #d4d0d0;
  font-size: 20px;
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

li {
  font-size: 20px;
  position: relative;
  right: 20px;
  margin-bottom: 20px;
}

li:hover .destroy {
  display: inline-block;
}

.destroy {
  position: absolute;
	top: -7px;
  display: none;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
  background-color: #fff;
  border: none;
  width: 40px;
  height: 40px;
}

.destroy:hover {
	color: #af5b5e;
}

.destroy:after {
	content: '×';
}

.destroy:focus {
  outline: none;
}

.times {
  border: none;
}

.times:focus {
  outline: none;
}

.times-enter-active {
  transition: all .3s ease;
}
.times-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.times-enter, .times-leave-to
/* .times-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.hide {
  width: 100px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(218, 218, 218);
}

.hide:focus {
  outline: none;
}
.hide:after {
	content: 'toggle times display';
}
</style>
