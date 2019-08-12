<template>
  <div id="app">
    <h2>タスク一覧</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox"
               v-bind:checked="task.done"
               v-on:change="toggleTaskStatus(task)">
        {{task.name}}
        <span v-for="id in task.labelIds" v-bind:key="id">
          {{getLabelText(id)}}
        </span>
      </li>
    </ul>
    <!--prevent: リロードしない-->
    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="新しいタスク">
    </form>

    <h2>ラベル一覧</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="checkbox"
               v-bind:value="label.id"
               v-model="newLabelIds">
        {{label.text}}
      </li>
    </ul>
    <!--prevent: リロードしない-->
    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="新しいラベル">
    </form>

    <h2>ラベルでフィルタ</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input type="radio"
               v-bind:checked="label.id === filter"
               v-on:change="changeFilter(label.id)">
        {{label.text}}
      </li>
      <li>
        <input type="radio"
               v-bind:checked="filter === null"
               v-on:change="changeFilter(null)">
        フィルタしない
      </li>
    </ul>

    <h2>保存と復元</h2>
    <button type="button" v-on:click="save">保存</button>
    <button type="button" v-on:click="restore">復元</button>
  </div>
</template>

<script>

  export default {
    name: 'app',

    data() {
      return {
        // 書かないでも動いた。この先で使うのだろうか？
        newTaskName: '',
        newLabelText: '',
        newLabelIds: []
      }
    },

    computed: {
      tasks() {
        return this.$store.getters.filteredTasks
      },
      labels() {
        return this.$store.state.labels
      },
      filter() {
        return this.$store.state.filter
      }
    },

    methods: {
      toggleTaskStatus(task) {
        this.$store.commit('toggleTaskStatus', {id: task.id})
      },
      addTask() {
        this.$store.commit('addTask', {name: this.newTaskName, labelIds: this.newLabelIds})
        this.newTaskName = ''
        this.newLabelIds = []
      },
      addLabel() {
        this.$store.commit('addLabel', {text: this.newLabelText})
        this.newLabelText = ''
      },
      getLabelText(id) {
        const label = this.labels.filter(label =>
          label.id === id
        )[0]
        return label ? label.text : ''
      },
      changeFilter(labelId) {
        this.$store.commit('changeFilter', {filter: labelId})
      },
      save() {
        // dispatch: Actions呼び出す
        // >アクションは、状態を変更するのではなく、ミューテーションをコミットします。
        // >アクションは任意の非同期処理を含むことができます。
        // >https://vuex.vuejs.org/ja/guide/actions.html
        this.$store.dispatch('save')
      },
      restore() {
        this.$store.dispatch('restore')
      }
    }
  }
</script>
