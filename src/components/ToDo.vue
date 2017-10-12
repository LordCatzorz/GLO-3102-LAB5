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
        let myRequest = new Request("https://glo3102lab4.herokuapp.com/users", {method: "POST"});

        fetch(myRequest).then((response) => {
          if (response.ok) {
            return response.json();
          }
        }).then((theData) => {
          this.id_user = theData["id"];
        }).catch((error) => {
          alert('Error. Error. Error.' + error);
        });
      },

      getUserTasks: function () {
        let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.id_user + "/tasks", {
          method: "GET"
        });
        fetch(myRequest).then((response) => {
          if (response.ok) {
            return response.json();
          }
        }).then((theData) => {
          this.theTasks = theData.tasks;
        }).catch((error) => {
          alert('Error. Error. Error.' + error);
        })
      },

      createNewTask: function () {
        let newTaskName = prompt("What do you want to accomplish?", "Be a better cat");
        if (newTaskName !== null) {
          let jsonTask = JSON.stringify({name: newTaskName});

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');

          let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.id_user + "/tasks", {
            method: "POST",
            headers: headers,
            body: jsonTask
          });

          fetch(myRequest).then((response) => {
            if (response.ok) {
              this.getUserTasks();
            }
          }).catch((error) => {
            alert('Error. Error. Error.' + error);
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
