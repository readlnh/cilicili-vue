<template>
  <div class="post-video">
    <h2>欢迎投稿：</h2>

    <el-form
      ref="submitForm"
      :model="submitForm"
      label-width="80px"
    >
      <el-form-item label="标题">
        <el-input v-model="submitForm.title"></el-input>
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          type="textarea"
          v-model="submitForm.info"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :action="domain"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="tokenFrom"
          :show-file-list="false"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-upload
          class="upload-video"
          :action="domain"
          :data="tokenFrom"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleVideoSuccess"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button
            size="small"
            type="primary"
          >点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >只能上传mp4文件</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from '@/api/video'
import * as uploadAPI from '@/api/upload'

export default {
  name: 'PostVideo',
  data () {
    return {
      submitForm: {
        title: '',
        info: '',
        avatar: '',
        video: ''
      },
      imageUrl: '',
      tokenFrom: {
        // key: '',
        token: ''
      },
      domain: 'https://up-z2.qiniup.com'
    }
  },
  created () {
    this.getQiuToken()
  },
  methods: {
    async onSubmit () {
      try {
        const res = await API.postVideo(this.submitForm)
        if (res.code > 0) {
          this.$notify.error({
            title: '投稿失败',
            message: res.msg
          })
        } else {
          this.$notify({
            title: '投稿成功',
            message: `您的投稿ID为${res.data.id}`,
            type: 'success'
          })
        }
      } catch (err) {
        this.$notify.error({
          title: '投稿失败，网络或服务器错误',
          message: err
        })
      }
    },
    async getQiuToken () {
      var res = await uploadAPI.postUploadToken()
      this.tokenFrom.token = res.data.token
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.submitForm.avatar = res.key
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$notify({
        title: '上传成功',
        message: '封面上传成功',
        type: 'success'
      })
    },
    async beforeAvatarUpload (file) {
      var res = await uploadAPI.postUploadToken()
      this.token = res.data.token
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      return isJPG && isLt2M
    },
    handleVideoSuccess (res, file) {
      console.log(res)
      this.submitForm.video = res.key
      this.$notify({
        title: '上传成功',
        message: '视频上传成功',
        type: 'success'
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
