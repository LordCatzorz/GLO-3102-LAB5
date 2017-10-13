<template>
  <div>
    <div>
      <span>SERVING USER:</span>
      <span>{{ id_user }}</span>
    </div>
    <div>
      <div>TASKS</div>
      <task v-on:delete-task="getUserTasks()" v-for="aTask in theTasks" :key="aTask.id" :task="aTask" :user="id_user">
      </task>
      <div>
        <input type="button" value="+" v-on:click="createNewTask">
      </div>
    </div>
  </div>
</template>

<script>
  import Task from './Task'
  import {CreateNewUserASync, GetUserTasksASync, CreateNewTaskAsync} from './api.js'

  export default {
    components: {Task},
    name: 'ToDo',
    data: function () {
      return {
        id_user: undefined,
        theTasks: []
      }
    },

    methods: {
      createNewUser: function () {
        CreateNewUserASync().then((response) => {
          this.id_user = response
        });
      },

      getUserTasks: function () {
        GetUserTasksASync(this.id_user).then((response) => {
          this.theTasks = response
        });
      },

      createNewTask: function () {
        let newTaskName = prompt("What do you want to accomplish?", "Be a better cat");
        if (newTaskName !== null && newTaskName !== '') {
          CreateNewTaskAsync(this.id_user, newTaskName).then((response) => {
            this.getUserTasks()
          });
        }
      }
    },

    watch: {
      id_user: function (newUser) {
        this.getUserTasks();
      }
    },

    beforeMount() {
      this.createNewUser();
    }

  }
</script>

<style>

</style>
