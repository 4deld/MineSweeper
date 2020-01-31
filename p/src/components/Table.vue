<template>
  <div>
      <tr v-for="(rowData, rowidx) in tabledata":key rowidx>
          <td v-for="(colData, colidx) in rowData":key colidx>
              {{colData}}
          </td>
      </tr>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(['tabledata'])
    }
}
</script>

<style>

</style>