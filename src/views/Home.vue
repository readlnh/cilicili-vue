<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="4"
        v-for="video in videos"
        :key="video.id"
      >
        <el-card
          class="card"
          @click.native="goVideo(video)"
        >
          <div class="atoming">
            <img
              class="avatar"
              :src="video.avatar_url"
              width="100%"
            >
          </div>
          <div class="videoInfo">
            <div style="padding: 4px;">
              <!-- <span class="video-title">{{video.title}}</span> -->
              <div class="video-title">{{video.title}}</div>
              <div class="bottom clearfix">
                <span class="video-info">{{video.info.substring(0, 40)}}</span>
              </div>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as API from '@/api/video'

export default {
  name: 'home',
  data () {
    return {
      videos: []
    }
  },
  methods: {
    async load () {
      var res = await API.getVideos()
      this.videos = res.data
      console.log(this.videos)
    },
    goVideo (video) {
      this.$router.push({ name: 'showVideo', params: { videoID: video.id } })
    }
  },
  beforeMount () {
    this.load()
    // console.log(this.videos[1].avatar)
  }
}
</script>

<style scoped>
.videoInfo {
  margin-top: 10px;
  width: 100%;
  height: 0;
  padding-bottom: 30%;
  overflow: hidden;
}
.video-title {
  margin: 4px 0px 4px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.video-info {
  color: #909399;
  margin: 4px;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
}
.card {
  margin: 10px;
  cursor: pointer;
}
.atoming {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}
</style>
