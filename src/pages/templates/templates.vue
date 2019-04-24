<template>
  <q-table
    class="shadow-0"
    :grid="gridMode"
    :hide-header="gridMode"
    :loading="tableLoad"
    :data="data"
    :columns="column"
    :filter="filter"
    @request="loadTableData"
    row-key="name"
    :pagination.sync="paginationControl"
  >
  <q-td slot="body-cell-actions" slot-scope="props" :props="props">
    <q-btn flat round icon="close" size="sm" color ="red" >
      <q-tooltip> 
        delete
      </q-tooltip>
    </q-btn>
    <q-btn flat round icon="fas fa-download" size="sm" color ="primary"  >
      <q-tooltip> 
        download
      </q-tooltip>
    </q-btn>
    <q-btn flat round icon="fas fa-pen" size="sm" color ="orange"  @click="newTemp(props.row)">
      <q-tooltip> 
        update 
      </q-tooltip>
    </q-btn>
  </q-td>
  <template slot="top-left" slot-scope="props">
    <q-search hide-underline v-model="filter" />
  </template>
    <div slot="top-right" slot-scope="props" >
      <div >
        <q-toggle
          v-model="gridMode"
          checked-icon="view_carousel"
          unchecked-icon="view_agenda"
          color="secondary"
          style = "font-size:80%;margin:5px"
        />
          
        <q-btn round icon="add_circle"  color ="primary" style = "margin:5px"  @click="_modals({'newTemplate':{'open': true, 'data': '', id: 0}})">
          <q-tooltip> 
            New
          </q-tooltip>
        </q-btn>
      </div>

    </div>
  <div
    slot="item"
    slot-scope="props"
    class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 transition-generic"
    :style="props.selected ? 'transform: scale(0.95);' : ''"
  >

    <q-card class="transition-generic" :class="props.selected ? 'bg-grey-2' : ''">
      <q-card-title class=" flex" style = "margin:0;padding:3px;">
        <q-btn flat round icon="close" size="sm" color ="red" >
          <q-tooltip> 
            delete
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="fas fa-download" size="sm" color ="primary"  >
          <q-tooltip> 
            download
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="fas fa-pen" size="sm" color ="orange" >
          <q-tooltip> 
            update
          </q-tooltip>
        </q-btn>
      </q-card-title>
      <q-card-separator />
      <q-card-main class="q-pa-none">
        <q-list no-border>
          <q-item v-for="col in props.cols.filter(col => col.name !== 'actions')" :key="col.name">
            <q-item-main>
              <q-item-tile label>{{ col.label }}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-item-tile>{{ col.value }}</q-item-tile>
            </q-item-side>
          </q-item>
        </q-list>
      </q-card-main>
    </q-card>
  </div>
</q-table>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/assets/purl'
import {route} from 'src/assets/backend'
import { Loading } from 'quasar'

export default {
  computed : {
    ...mapGetters(['tables', 'config']),
    column () {
      return this.tables.jsscenes.columns
    }
  },
  data () {
    return {
      filter: '',
      paginationControl: { 
        rowsNumber: 0,
        rowsPerPage: 15,
        page: 1,
        current_page: 0,
      },
      gridMode: false,
      tableLoad: false,
      data: []
    }
  },
  methods: {
    ...mapActions(['_modals', '_config']),
    newTemp (row) {
      this._modals({'newTemplate':{'open': true, 'data': row.data, 'id': row.js_id}})
    },
    nextPage() {
      this.paginationControl.page = this.paginationControl.page + 1;
      this.loadTableData({
        pagination: this.paginationControl,
        filter: this.filter
      })
    },
    loadTableData({ pagination, filter }) {
      this.tableLoad = true
      _purl.get(route.scenes.get, {page: pagination.page}).then (r => {
        this.tableLoad = false
        this.paginationControl.rowsNumber = r.data.total
        this.paginationControl.rowsPerPage = r.data.per_page
        this.paginationControl.page = r.data.current_page
        this.data = r.data.data
      })
    },
    test () {
      alert()
    },
    getTypes() {
      Loading.show({
        spinner: 'QSpinnerBars',
        message: '<small>loading up configurations...</small>',
        spinnerColor: 'white',
        spinnerSize: 60,
      })
      _purl.get(route.config.types).then(r => {
        r.data.map(res => {
          Loading.hide()
          res.val = JSON.parse(res.val);
          return res;
        })
        console.log(r.data)
        this._config({'templates': {'types': r.data}});
      }).catch(e => {
        Loading.hide()
      })
    }
  },
  mounted () {
    this.loadTableData({
      pagination: this.paginationControl,
      filter: this.filter
    })
    this.getTypes()
  }
}
</script>