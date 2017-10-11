<template>
  <div>
    <div>
      <span>SERVING USER:</span>
      <span>{{ id_user }}</span>
    </div>
    <div>
      <div>TASKS</div>
      <div id="task-container"></div>
      <div>
        <input type="button" value="+">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ToDo',
    data () {
      return {
        id_user: 'NOT YET IMPLMENTED'
      }
    }
  }
</script>

<style>

</style>
