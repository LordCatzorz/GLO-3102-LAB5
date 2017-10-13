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
        <input v-model="temporaryTaskName" v-on:blur="createNewTask" v-on:keyup.13="createNewTask"
               placeholder="Insert your task here">
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
        temporaryTaskName: undefined,
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
        if (this.temporaryTaskName !== null && this.temporaryTaskName !== '' && this.temporaryTaskName !== undefined) {
          CreateNewTaskAsync(this.id_user, this.temporaryTaskName).then((response) => {
            this.getUserTasks()
          });
        }

        this.temporaryTaskName = undefined;
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
