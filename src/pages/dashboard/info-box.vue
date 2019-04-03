<template>
  <div>
    <q-toolbar color="primary" inverted >
      <q-btn flat round dense icon="info" />
      <q-toolbar-title>
        Animation 
        <q-chip :icon="statusIcon.icon" :color="statusIcon.color">
          {{statusIcon.label}}
        </q-chip>
      </q-toolbar-title>
      <q-btn flat round dense :loading="approveLoad" icon="far fa-check-circle" @click="confirmApprove" v-if="parseInt(enscene.status) === 2">
        <q-tooltip>
          Approve
        </q-tooltip>
      </q-btn>

      <q-btn flat round dense color= "warning" :loading="approveLoad" icon="fas fa-ban" v-if="parseInt(enscene.status) === 1" @click="confirmDeactivate">
        <q-tooltip>
          deactivate
        </q-tooltip>
      </q-btn>
      
      <q-btn flat round dense color="red" icon="fas fa-trash" >
        <q-tooltip>
          delete
        </q-tooltip>
      </q-btn>
    </q-toolbar>
    <div class = "row">

      <div class = "col-xs-12 col-md-6">
        <q-list no-border>
          <q-item>
            <q-item-side right>
              <q-item-tile icon="perm_identity" />
            </q-item-side>
            <q-item-main :label="enscene.user.name" :sublabel = "enscene.user.email" >
            </q-item-main>
          </q-item>

          <q-item >
            <q-item-side right>
              <q-item-tile icon="calendar_today" />
            </q-item-side>
            <q-item-main label="Date created " >
              <small>
                {{enscene.created_at}}
              </small>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-side right>
              <q-item-tile icon="code" />
            </q-item-side>
            <q-item-main label="animation type" :sublabel = "enscene.reftype" >
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-side right>
              <q-item-tile icon="far fa-object-group" />
            </q-item-side>
            <q-item-main label="Scene Group" sublabel = "N/A" >
            </q-item-main>
          </q-item>

          <!-- Inset separator example -->
        </q-list>
      </div>

      <div class = "col-xs-12 col-md-6">
        <q-list no-border>
          <q-item>
            <q-item-side right>
              <q-item-tile icon="fas fa-weight-hanging" />
            </q-item-side>
            <q-item-main label="size" :sublabel = "getByte" >
            </q-item-main>
          </q-item>

          <q-item >
            <q-item-side right>
              <q-item-tile icon="photo_size_select_large" />
            </q-item-side>

            <q-item-main label="base dimension" >
              <small>
                1280 x 760
              </small>
            </q-item-main>
          </q-item>


          <!-- Inset separator example -->
        </q-list>
      </div>
    </div>
  </div>
</template>
<script >
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/assets/purl'
import {_glob} from 'src/assets/global'
import {route} from 'src/assets/backend'
export default {
  props: ['enscene'],
  computed: {
    ...mapGetters(['active']),
    getByte () {
      let bit =  _glob.getByt(this.enscene.data + this.enscene.init);
      return parseInt( bit ).toLocaleString() + ' b';

    },
    statusIcon() {
      return _glob.map_status(this.enscene.status)
    }
  },
  data () {
    return {
      approveLoad: false
    }
  },
  methods: {
    ...mapActions(['_modals', '_active']),
    confirmApprove () {
      this._modals({'confirm': {
        'open': true,
        'label': 'confirm status approval for this animation ?',
        'callback': this.callConfirm
      }})
    },
    confirmDeactivate () {
      this._modals({'confirm': {
        'open': true,
        'label': 'confirm deactivation for this animation ?',
        'callback': this.callDeactivate
      }})
    },
    callConfirm() {
      this.approveLoad = true
      _purl.post(route.scenes.approve(this.enscene.id)).then(r => {
        this.approveLoad = false
        this.active.scene.loader.callback(this.enscene.id)
      }).catch(e => {
        this.approveLoad = false
        _glob.notify(e.response.data.message, 'negative');
      })
    },
    callDeactivate() {
      this.approveLoad = true
      _purl.post(route.scenes.deactivate(this.enscene.id)).then(r => {
        this.approveLoad = false
        this.active.scene.loader.callback(this.enscene.id)
      }).catch(e => {
        this.approveLoad = false
        _glob.notify(e.response.data.message, 'negative');
      })
    }
  }

}
</script>