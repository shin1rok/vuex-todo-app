<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox"
               v-bind:checked="task.done"
               v-on:change="toggleTaskStatus(task)">
        {{task.name}}
      </li>
    </ul>
    <!--prevent: リロードしない-->
    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <!--<input type="checkbox"-->
        <!--v-bind:value="label.id"-->
        <!--v-bind:model="newLabelIds">-->
        {{label.text}}
      </li>
    </ul>
    <!--prevent: リロードしない-->
    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelName" placeholder="新しいラベル">
    </form>
  </div>
</template>

<script>

  export default {
    name: 'app',

    data() {
      return {
        // 書かないでも動いた。この先で使うのだろうか？
        newTaskName: ''
      }
    },

    computed: {
      tasks() {
        return this.$store.state.tasks
      },
      labels() {
        return this.$store.state.labels
      },
    },

    methods: {
      toggleTaskStatus(task) {
        this.$store.commit('toggleTaskStatus', {id: task.id})
      },
      addTask() {
        this.$store.commit('addTask', {name: this.newTaskName})
        this.newTaskName = ''
      },
      addLabel() {
        this.$store.commit('addLabel', {text: this.newLabelName})
        this.newLabelName = ''
      },
    }
  }
</script>
