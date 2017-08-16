<template>
  <div class="margin">
    Создать задачу:
    <div class="create">
      <div>
        <small>Имя</small>
        <input type="text" v-model="task.name" />
      </div>
      <div>
        <small>Дата</small>
        <span>с: <input type="date" v-model="task.from" /></span>
        <span>по: <input type="date" v-model="task.to" /></span>
      </div>
      <div>
        <small>Тип</small>
        <select v-model="task.typeId">
          <option v-for="key in types" :value="key.id" @click="task.type = key">{{key.name}}</option>
        </select>
      </div>
      <div>
        <small>Статус</small>
        <select v-model="task.statusCode">
          <option v-for="code in codes">{{code}}</option>
        </select>
      </div>
      <div>
        <button @click="create()">
          Создать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'create',
  data () {
    return {
      task: {
        name: '',
        typeId: '',
        statusCode: '',
        from: '',
        to: '',
        type: {
          name: '',
          id: ''
        }
      },
      codes: [
        'QUEUED',
        'RUNNING',
        'CANCELED',
        'FINISHED',
        'FAILED'
      ]
    }
  },
  computed: {
    types () {
      return this.$store.state.types
    }
  },
  methods: {
    ...mapActions(['createTask']),
    create () {
      this.createTask(this.task)
    },
    update () {
      this.getTasks()
    }
  }
}
</script>

<style scoped>
.margin {
  margin-top: 20px;
}
.create {
  border: 1px solid #ccc;
  background: #fff;
  display: inline-block;
  padding: 20px;
  margin: 10px 0;
  width: 100%;
}
.create > div {
  float: left;
  width: 20%;
  border-right: 1px solid #ccc;
  padding-left: 20px;
  height: 100%;
}
.create > div:nth-last-child(1) {
  border-right: none;
}
.create small {
  display: block;
  width: 100%;
  margin-bottom: 5px;
}
.create span {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
.create span input {
  float: right;
  margin-right: 20px;
}
</style>
