import { http } from '../api'
import * as TYPES from './types'

export const getTasks = ({ commit }, options) => {
  // Array of parameters:

  let arr = []
  let params = ''

  if (options) {
    // Create parameters array from strings by template 'key=value':

    Object.entries(options).forEach(
      ([key, value]) => {
        if (value) {
          arr.push(key + '=' + value)
        }
      }
    )

    params = arr.join('&')
  }

  return http.get(`/tasks?` + params)

  .then(({ data }) => {
    commit(TYPES.GET_TASKS, data)
    return http.get(`/tasks/types`)

    .then(({ data }) => {
      commit(TYPES.GET_TYPES, data)
    })
    .catch((e) => commit(TYPES.GET_FAIL, 'types'))
  })
  .catch((e) => commit(TYPES.GET_FAIL, options))
}

export const updateTask = ({ commit }, task) => {
  return http.put(`/tasks/` + task.id, task)

  .then(({ data }) => {
    commit(TYPES.PUT_TASK, data)
  })
  .catch((e) => commit(TYPES.GET_FAIL, task))
}

export const createTask = ({ commit }, task) => {
  return http.post(`/tasks/`, task)

  .then(({ data }) => {
    task.id = data.id
    commit(TYPES.CREATE_TASK, task)
  })
  .catch((e) => commit(TYPES.GET_FAIL, task))
}

export const deleteTask = ({ commit }, id) => {
  return http.delete(`/tasks/` + id)

  .then(({ data }) => {
    commit(TYPES.DELETE_TASK, data)
  })
  .catch((e) => commit(TYPES.GET_FAIL))
}
