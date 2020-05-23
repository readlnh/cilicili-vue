<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col
        :span="4"
        v-for="video in videos"
        :key="video.id"
      >
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div style="padding: 4px;">
            <!-- <span class="video-title">{{video.title}}</span> -->
            <div class="video-title">{{video.title}}</div>
            <div class="bottom clearfix">
              <span class="video-info">{{video.info.substring(0, 35)}}</span>
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
    }
  },
  beforeMount () {
    this.load()
  }
}
</script>

<style scoped>
.card {
  margin: 10px;
}
.image {
  width: 100%;
}
.video-title {
  margin: 4px;
}
.video-info {
  color: #909399;
  margin: 4px;
  /* width: 90%; */
}
</style>
