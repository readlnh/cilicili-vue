<template>
  <div class="show-video">
    <el-row :gutter="20">
      <el-col :span="15">
        <video-player
          class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
        >
        </video-player>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

export default {
  name: 'ShowVideo',
  data () {
    return {
      playerOptions: {
        muted: false,
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }]
      }
    }
  },
  methods: {
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    videoPlayer
  }
}
</script>

<style scoped>
</style>
