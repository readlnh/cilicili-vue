import axios from 'axios'

const postUploadToken = () => axios.post('/api/v1/upload/token').then(res => res.data)

export {
  postUploadToken
}
