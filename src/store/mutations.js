import * as TYPES from './types'
export default {
  [TYPES.GET_TASKS] (state, data) {
    let arr = []
    data.forEach(
      (element, index, array) => {
        element.typeId = element.type.id
        arr.push(element)
      }
    )
    state.tasks = arr
  },
  [TYPES.PUT_TASK] (state) {
  },
  [TYPES.DELETE_TASK] (state) {
  },
  [TYPES.GET_TYPES] (state, data) {
    state.types = data
  },
  [TYPES.CREATE_TASK] (state, task) {
    state.tasks.push(task)
  },

  [TYPES.GET_FAIL] (state, options) {
    console.log('ERROR IN GET WITH OPTIONS: ' + options)
  }
}
