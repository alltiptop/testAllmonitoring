<template>
  <div class="search">
    <div class="tab">
      <input type="text" @change="update()" placeholder="Название задачи" v-model="options.name"/>
    </div>
    <div class="tab">
      с:
      <input type="date" @change="update()" v-model="options.from">
      по:
      <input type="date" @change="update()" v-model="options.to">
    </div>
    <div class="tab">
      <small>Статус:</small>
      <select v-model="options.statusCode" @change="update()">
        <option disabled="disabled">Статус задачи</option>
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
      dateFrom: [],
      dateTo: [],
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
h1 {
  font-weight: normal;
  margin-bottom: 50px;
  font-size: 24px;
}
.search {
  display: inline-block;
  float: left;
  width: 100%;
  top: 0;
  left: 0;
  background: #f7f7f7;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-bottom: 0;
  margin-bottom: 0;
}
.tab {
  background: #f7f7f7;
  float: left;
  line-height: 60px;
  height: 60px;
  padding-right: 20px;
  margin-right: 10px;
  position: relative;
}
.tab small {
  font-size: 12px;
}
</style>
