<template>
  <div
    class="row"
  >
    <ul
      class="col s8 offset-s2 card-panel grey lighten-5"
    >
    <h3
    >
      To-Do List
    </h3>
      <li
        class="left-align"
        v-for="todo in todos"
        :key="todo.id"
      >
        <todo-item
          :todo="todo"
          @remove="removeTodo"
        >
        </todo-item>
      </li>
      <div
        class="input-field col s12"
      >
        <input
          id="new_todo"
          type="text"
          v-model="newTodoText"
        >
        <label
          for="new_todo"
        >
          Title
        </label>
      </div>
      <div
        class="input-field col s12"
      >
        <input
          id="new_todo"
          type="text"
          v-model="newTodoDescription"
        >
        <label
          for="new_todo"
        >
          Description
        </label>
      </div>
      <div
        class="input-field col s12"
      >
        <input
          id="new_todo"
          type="text"
          v-model="newTodoDeadLine"
          v-mask="'##/##/####'"
        >
        <label
          for="new_todo"
        >
          Dead Line
        </label>
      </div>
      <div class="input-field col s12">
        <button v-on:click="createTodo"> Salvar </button>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import TodoItem from './TodoItem'

export default {
  name: 'TodoList',
  data () {
    return {
      todos: [],
      errors: [],
      newTodoText: '',
      newTodoDescription: '',
      newTodoDeadLine : '',
      newTodoDeadLine2 : '',
    }
  },
  components: { TodoItem },
  methods: {
    getTodos: function () {
      axios.get('http://localhost:8000/todos/')
        .then(response => {
          this.todos = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    createTodo: function () {
      this.newTodoDeadLine2 = this.newTodoDeadLine.split("/").reverse().join("-");
      console.log(this.newTodoDeadLine2)
      axios.post('http://localhost:8000/todos/', {
        title : this.newTodoText,
        description : this.newTodoDescription,
        created_at : this.newTodoDeadLine2,
        status : false
      })
        .then(response => {
          this.todos.push(response.data)
          this.newTodoText = '',
          this.newTodoDeadLine = '',
          this.newTodoDescription = ''
        })
        .catch(e => {
          console.log(e);
        })
    },
    removeTodo: function (id) {
      let index = this.todos.findIndex(todo => { return todo.id === id})
      this.todos.splice(index, 1)
    }
  },
  created () {
    this.getTodos()
  }
}
</script>

<style scoped>
li {
  list-style: none;
  padding-left: 10px;
}
</style>
