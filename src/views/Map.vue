<template>
  <div>
    <div class="main-toolbar">
      <h1 class="page-title">地图</h1>
    </div>
    <div class="main-content">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">百度地图</h5>
          <p class="card-text">启用围栏功能</p>
        </div>
        <div style="height: 600px;position:relative">
          <baidu-map
            height="100%"
            ref="map"
            :fencing-tools-options="{enableContextMenu: true}"
            @ready="mapReady">
          </baidu-map>
          <loading-cover :init-show="true" :status="status"></loading-cover>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BaiduMap from 'components/map/Baidu'
  import LoadingCover from 'components/LoadingCover'
  import { BMap } from 'utils/BaiduMap'
  import statusMixin from 'mixins/status'

  export default {
    name: 'MapView',
    mixins: [statusMixin],
    components: {
      BaiduMap,
      LoadingCover
    },
    data(){
      this.fm = null;
      return {
      }
    },
    created () {
      this.statusPending()
    },
    methods: {
      mapReady(map){
        let center = new BMap.Point(116.403838, 39.992921)
        map.centerAndZoom(center, 14)

        this.fm = this.$refs.map.fencingManager

        this.fm.createRadiusFencing({
          draggable: false,
          changeable: false,
          deletable: false
        }).render(center, 2500).highlight()

        this.statusResolved()
      }
    }
  }
</script>
