<template>
  <div>
    <input type="button" value="edit" v-on:click="editThis"/>
    <input type="button" value="delete" v-on:click="deleteThis"/>
    <span>{{ task.name }}</span>
  </div>
</template>

<script>
  import {EditTaskASync, DeleteTaskASync} from './api.js';

  export default {
    name: 'task',
    props: ['task', 'user'],

    methods: {
      editThis: function (event) {
        let newName = prompt("What do you REALLY want to accomplish?", this.task.name);

        if (newName !== this.task.name && newName !== null && newName != '') {
          EditTaskASync(this.user, this.task.id, newName).then((response) => {
            this.task.name = response.name;
          });
        }
      },

      deleteThis: function (event) {
        DeleteTaskASync(this.user, this.task.id).then((response) => {
          if (response.ok) {
            this.$emit('delete-task');
          }
        });
      }
    }
  }

</script>

<style>

</style>
