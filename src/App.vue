<template>
  <div id="app">
    <h1>{{title}}</h1>
    <input class="inputbox" v-model="newItem" @keyup.enter="addNew" placeholder="What needs to be done?">
    <br><br>
    <transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
      <li v-for="(item) in items" v-bind:class="{finished:item.isFinished}" v-bind:key="item.label">
        <span v-on:click="toggleFinish(item)">{{item.label}}</span>
        
        <transition name="times">
          <span v-if="on" class="do-times">
            finish {{ item.counter }} times
            <button @click="addTimes(item)" class="addTimes">+</button>
            <button @click="reduceTimes(item)" class="reduceTimes">-</button>
            <button @click="resetTimes(item)">reset</button>
          </span>
        </transition>
        <button class="destroy" @click="removeTodo(item)"></button>
      </li>
    </transition-group>
    <transition name="with-mode-fade" mode="out-in">
      <button class="toggle" v-if="on" key="on" @click="on = false">
        hide times
      </button>
      <button class="toggle" v-else key="off" @click="on = true">
        show times
      </button>
    </transition>  
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
      on: true,
      query: '',
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
        isFinished:false,
        counter:0,
      })
      this.newItem = ''
    },
    removeTodo: function (item) {
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);
    },
    addTimes:function (item) {
      item.counter += 1
    },
    reduceTimes:function(item) {
      item.counter -= 1
    },
    resetTimes:function(item) {
      item.counter = 0
    },
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

.do-times {
  font-size: 0.5em;
}

.reduceTimes {
  background-color: rgb(218, 218, 218);
}

.reduceTimes:focus {
  outline: none;
}

.addTimes {
  background-color: rgb(218, 218, 218);
}

.addTimes:focus {
  outline: none;
}

.times-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.times-leave-active {
  transition: all .3s ease;
}
.times-enter, .times-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.toggle {
  width: 100px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(218, 218, 218);
}

.toggle:focus {
  outline: none;
}

</style>
