<template>
  <div>
    <input type="button" value="delete" v-on:click="deleteThis"/>
    <span v-if="readMode==true" v-on:click="toggleReadMode">{{ task.name }}</span>
    <input id="task_name_input" v-focus v-if="readMode==false" v-on:blur="leaveInput" v-on:keyup.13="loseFocus"
           v-model="task.name">
  </div>
</template>

<script>
  import {EditTaskASync, DeleteTaskASync} from './api.js';

  const focus = {
    inserted(el) {
      el.focus()
    },
  };

  export default {
    name: 'task',
    directives: {focus},
    props: ['task', 'user'],
    data: function () {
      return {
        oldTaskName: '',
        readMode: true
      }
    },

    methods: {
      editThis: function (event) {
        if (this.oldTaskName !== this.task.name && this.task.name !== null && this.task.name != '') {
          EditTaskASync(this.user, this.task.id, this.task.name).then((response) => {
            this.task.name = response.name;
            this.oldTaskName = response.name;
          });
        } else {
          this.task.name = this.oldTaskName;
        }
      },

      deleteThis: function (event) {
        DeleteTaskASync(this.user, this.task.id).then((response) => {
          if (response.ok) {
            this.$emit('delete-task');
          }
        });
      },

      toggleReadMode: function (event) {
        this.readMode = false;
      },

      leaveInput: function (event) {
        this.loseFocus(event);
        this.editThis(event)
      },

      loseFocus: function (event) {
        this.readMode = true;
      }
    },

    beforeMount: function () {
      this.oldTaskName = this.task.name;
    }
  }

</script>

<style>

</style>
