import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ストアの定義
const store = new Vuex.Store({
  state: {
    // タスクの初期ステート
    tasks: [
      {
        id: 1,
        name: '牛乳を買う',
        labelIds: [1, 2],
        done: false
      },
      {
        id: 2,
        name: 'Vue の本を買う',
        labelIds: [1, 3],
        done: true
      }
    ],
    nextTaskId: 3,
    labels: [
      {
        id: 1,
        text: '買い物',
      },
      {
        id: 2,
        text: '食料',
      },
      {
        id: 3,
        text: '本',
      }
    ],
    nextLabelId: 4,
    filter: null,
  },

  getters: {
    filteredTasks(state) {
      if (!state.filter) {
        return state.tasks
      }

      return state.tasks.filter(task => {
        // 引数の値がArrayに存在しない場合は -1 を返す
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
        return task.labelIds.indexOf(state.filter) >= 0
      })
    }
  },

  mutations: {
    addTask(state, {name, labelIds}) {
      state.tasks.push({
        id: state.nextTaskId,
        name: name,
        labelIds: labelIds,
        dane: false
      })
      state.nextTaskId++
    },
    addLabel(state, {text}) {
      state.labels.push({
        id: state.nextLabelId,
        text: text,
      })
      state.nextLabelId++
    },
    toggleTaskStatus(state, {id}) {
      const target_tasks = state.tasks.filter(task => {
        return task.id === id
      })

      target_tasks.forEach(task => {
        task.done = !task.done
      })
    },
    changeFilter(state, {filter}) {
      state.filter = filter
    }
  }
})

// ストアをエクスポート
export default store
