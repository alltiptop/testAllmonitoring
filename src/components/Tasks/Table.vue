<template>
  <div class="table">
    <div class="title">
      <div class="sort" @click="sortIt('id')">Id
        <span v-if="sortBy !== 'id'">▸</span>
        <span v-else>
          <span v-if="sortTop">▴</span>
          <span v-else>▾</span>
        </span>
      </div>
      <div class="sort" @click="sortIt('name')">Имя
        <span v-if="sortBy !== 'name'">▸</span>
        <span v-else>
          <span v-if="sortTop">▴</span>
          <span v-else>▾</span>
        </span></div>
      <div>Дата</div>
      <div class="sort" @click="sortIt('typeId')">Тип
        <span v-if="sortBy !== 'typeId'">▸</span>
        <span v-else>
          <span v-if="sortTop">▴</span>
          <span v-else>▾</span>
        </span></div>
      <div class="sort" @click="sortIt('statusCode')">Статус
        <span v-if="sortBy !== 'statusCode'">▸</span>
        <span v-else>
          <span v-if="sortTop">▴</span>
        <span v-else>▾</span>
      </span></div>
      <div class="sort" @click="sortIt('progress')">Прогресс
        <span v-if="sortBy !== 'progress'">▸</span>
        <span v-else>
          <span v-if="sortTop">▴</span>
          <span v-else>▾</span>
        </span></div>
      <div>Действия</div>
    </div>
    <virtual-scroller class="scroll" :items="sorted" item-height="40" content-tag="div" v-if="sorted.length > 0">
      <template scope="props">
        <div class="tr">

          <div>
            <span>{{props.item.id}}</span>
          </div>

          <div>
            <span v-if="props.item.id !== editable.id">{{props.item.name}}</span>
            <input type="text" v-model="editable.name" v-else />
          </div>

          <div>
            с: {{ getDate(props.item.creationDate) }}
            <span v-if="props.item.endDate">по: {{ getDate(props.item.endDate) }}</span>
          </div>

          <div>
            <span v-if="props.item.id !== editable.id">{{props.item.type.name}}</span>
            <select v-else v-model="editable.typeId">
              <option disabled selected>{{props.item.type.name}}</option>
              <option v-for="key in types" :value="key.id">{{key.name}}</option>
            </select>
            <input type="text" v-model="editable.type.name" v-else />
          </div>

          <div>
            <span v-if="props.item.id !== editable.id">{{props.item.statusCode}}</span>
            <select v-else v-model="editable.statusCode">
              <option v-for="code in codes">{{code}}</option>
            </select>
          </div>

          <div class="progress">
            <span v-if="props.item.id !== editable.id">
              {{props.item.progress}}
            </span>
            <input type="number" v-model="editable.progress" min="0" max="100" v-else />
            <div v-bind:style="{ width: props.item.progress + '%' }"></div>
          </div>

          <div>
            {{ isEdit }}
            <button class="red" @click="deleteIt(props.item)">Удалить</button>
            <button class="green" @click="toEdit(props.item)" v-if="props.item.id !== editable.id">
              Изменить
            </button>
            <button class="green" @click="update(editable)" v-else>
              Сохранить
            </button>
          </div>
        </div>
      </template>
    </virtual-scroller>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { VirtualScroller } from 'vue-virtual-scroller'
export default {
  name: 'table',
  data () {
    return {
      list: [],
      typ: {
        'type': 'id'
      },
      put: {
        id: '',
        typeId: ''
      },
      codes: [
        'QUEUED',
        'RUNNING',
        'CANCELED',
        'FINISHED',
        'FAILED'
      ],
      isEdit: false,
      editable: {},
      sortBy: '',
      sortTop: false,
      dateOptions: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
    }
  },
  computed: {
    types () {
      return this.$store.state.types
    },
    sorted () {
      if (this.sortBy !== '') {
        return this.$store.state.tasks.sort((a, b) => {
          if (!this.sortTop) {
            if (a[this.sortBy] < b[this.sortBy]) return -1
            else if (a[this.sortBy] > b[this.sortBy]) return 1
            return 0
          } else {
            if (a[this.sortBy] > b[this.sortBy]) return -1
            else if (a[this.sortBy] < b[this.sortBy]) return 1
            return 0
          }
        })
      } else return this.$store.state.tasks
    }
  },
  methods: {
    toEdit (item) {
      if (!this.isEdit) {
        this.editable = item
        this.isEdit = true
      } else {
        this.editable = {}
        this.isEdit = false
      }
    },
    getDate (date) {
      if (date) {
        let time = new Date(date)
        return time.toLocaleString('ru', this.dateOptions)
      } else return
    },
    getType (name) {
      this.types.filter(function (obj) {
        if (obj.name === name) return obj.id
      })
    },
    sortIt (field) {
      this.sortTop = !this.sortTop
      this.sortBy = field
    },
    ...mapActions(['updateTask', 'deleteTask']),
    update (task) {
      this.updateTask(task)
      this.isEdit = false
      this.editable = {}
    },
    deleteIt (task) {
      this.deleteTask(task.id)
      let index = this.sorted.indexOf(task)
      this.sorted.splice(index, 1)
    }
  },
  components: {
    VirtualScroller
  }
}
</script>

<style scoped>
button:hover {
  cursor: pointer;
}
.table {
  margin-top: 40px;
  border: 1px solid #ccc;
  border-right: none;
  position: relative;
  padding-top: 60px;
  overflow: hidden;
}
.scroll {
  overflow-y: scroll;
  height: calc(100vh - 300px);
}
.table table {
  width: 100%;
  border-spacing: 0;
}
.tr {
  height: 40px;
  width: 100%;
  margin: 0;
  padding: 0;
}
.title {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 0;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 0 10px rgba(0,0,0,.2)
}
.title > div {
  height: 100%;
  float: left;
  text-align: center;
  font-weight: bold;
}
.sort {
  cursor: pointer;
}
.tr:nth-child(2n+1) {
  background: rgba(0,0,0,.05);
}
.tr div, .title > div {
  height: 100%;
  display: inline-block;
  border-right: 1px solid #ccc;
  float: left;
  width: 15%
}

.items > div > div:nth-child(1), .title > div:nth-child(1) {
  width: 5%;
  text-align: center;
}

.items > div > div:nth-last-child(1), .title > div:nth-last-child(1) {
  width: 20%;
  text-align: center;
}

.items > div > div:nth-last-child(1) {
  float: right;
}
.tr > div {
  padding: 5px 10px;
}
.progress {
  position: relative;
  text-align: center;
  background: rgba(0,0,0,.2);
  color: #fff;
}
.progress span {
}
.progress div {
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  background: #4e9a06;
  z-index: -1;
}
</style>
