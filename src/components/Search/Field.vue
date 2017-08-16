<template>
  <div class="search">
    <div class="tab">
      <small>Имя задачи</small>
      <input type="text" @change="update()" v-model="options.name"/>
    </div>
    <div class="tab">
      <small>Загрузить задачи</small>
      с:
      <input type="date" @change="update()" v-model="options.from">
      по:
      <input type="date" @change="update()" v-model="options.to">
    </div>
    <div class="tab">
      <small>Статус:</small>
      <select v-model="options.statusCode" @change="update()">
        <option disabled>Статус задачи</option>
        <option v-for="code in codes">{{code}}</option>
      </select>
    </div>
    <div class="tab">
      <button @click="clear()">Сбросить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'field',
  data () {
    return {
      codes: [
        'QUEUED',
        'RUNNING',
        'CANCELED',
        'FINISHED',
        'FAILED'
      ],
      options: {
        name: '',
        typeId: '',
        statusCode: '',
        from: '',
        to: '',
        progress: ''
      }
    }
  },
  methods: {
    ...mapActions(['getTasks']),
    update () {
      this.getTasks(this.options)
    },
    clear () {
      this.options = {
        name: '',
        typeId: '',
        statusCode: '',
        from: '',
        to: '',
        progress: ''
      }
      this.getTasks()
    }
  }
}
</script>

<style scoped>
.search {
  border: 1px solid #ccc;
  background: #f7f7f7;
  display: inline-block;
  width: 100%
}
.tab {
  float: left;
  margin: 18px;
  padding-right: 20px;
  border-right: 2px solid #ccc;
}
.tab:nth-last-child(1) {
  border-right: none;
}
.tab small {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}
</style>
