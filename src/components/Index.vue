<template>
  <div class="table">

    <!-- Search bar -->

    <tasks-create>
    </tasks-create>

    <!-- Search bar -->

    <search-field>
    </search-field>

    <!-- Tasks list -->

    <tasks-table>
    </tasks-table>
  </div>
</template>

<script>
import SearchField from '@/components/Search/Field'
import TasksTable from '@/components/Tasks/Table'
import TasksCreate from '@/components/Tasks/Create'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {
    SearchField,
    TasksTable,
    TasksCreate
  }
}
</script>

<style scoped>
</style>
