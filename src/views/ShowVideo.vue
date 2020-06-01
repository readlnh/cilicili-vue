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

import * as API from '@/api/video'

export default {
  name: 'ShowVideo',
  data () {
    return {
      video: {},
      playerOptions: {
        muted: false,
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: ''
        }]
      }
    }
  },
  methods: {
    async load () {
      console.log(this.$route.params.videoID)
      try {
        var res = await API.getVideo(this.$route.params.videoID)
        console.log(11111111111111111111111111)
        console.log(res)
        this.video = res.data
        this.playerOptions.sources[0].src = this.video.video_url
      } catch (err) {
        this.$notify.error({
          title: '投稿失败，网络或服务器错误',
          message: err
        })
      }
    }
  },
  components: {
    videoPlayer
  },
  beforeMount () {
    this.load()
  }
}
</script>

<style scoped>
</style>
