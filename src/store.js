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
  },

  mutations: {
    addTask(state, {name}) {
      state.tasks.push({
        id: state.nextTaskId,
        name: name,
        dane: false
      })
      state.nextTaskId++
    },
    toggleTaskStatus(state, {id}) {
      const target_tasks = state.tasks.filter(task => {
        return task.id === id
      })

      target_tasks.forEach(task => {
        task.done = !task.done
      })
    }
  }

})

// ストアをエクスポート
export default store
