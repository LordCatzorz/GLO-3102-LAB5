<template>
  <div>
    <input type="button" value="edit" v-on:click="editThis"/>
    <input type="button" value="delete" v-on:click="deleteThis"/>
    <span>{{ task.name }}</span>
  </div>
</template>

<script>
  export default {
    name: 'task',
    props: ['task', 'user'],

    methods: {
      editThis: function (event) {
        let newName = prompt("What do you REALLY want to accomplish?", this.task.name);

        if (newName !== this.task.name) {
          this.task.name = newName;
          let jsonTask = JSON.stringify(this.task);

          let headers = new Headers();
          headers.append('Content-Type', 'application/json');

          let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.user + "/tasks/" + this.task.id, {
            method: "PUT",
            headers: headers,
            body: jsonTask
          });

          fetch(myRequest).then((response) => {
            if (response.ok) {
              return response.json();
            }
          }).then((data) => {
            this.task.id = data.id;
            this.task.name = data.name;
          }).catch((error) => {
            alert('Error. Error. Error.' + error);
          })
        }

      },

      deleteThis: function (event) {
        let myRequest = new Request("https://glo3102lab4.herokuapp.com/" + this.user + "/tasks/" + this.task.id, {
          method: "DELETE"
        });

        fetch(myRequest).then((response) => {
          if (response.ok) {
            this.$emit('delete-task');
          }
        })
      }
    }
  }

</script>

<style>

</style>
