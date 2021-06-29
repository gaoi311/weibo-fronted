<template>
  <Layout>
    <!--        顶部栏-->
    <Header>
      <Head></Head>
    </Header>
    <!--        主页主体-->
    <Layout style="margin: 1% 20% 1% 20%">
      <Content style="max-width: 100%">
        <!--                搜索框-->
        <Input search v-model="key" size="large" placeholder="搜索微博 话题 博主"
               @on-search="$router.push({name: 'Search', query: {key: key}})"/>
        <Card style="margin-top: 10px">
          <Input v-model="blogContent" maxlength="100" show-word-limit type="textarea" placeholder="输入..."/>
          <div style="margin-top: 10px">
            <div>
              <el-upload
                  :multiple="multiple"
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :http-request="uploadFile"
                  ref="uploadPic"
                  :limit="limit"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>

          </div>
          <Row style="margin-top: 10px">
            <Col span="1">
              <Button type="primary" @click="addBlog">发表</Button>
            </Col>
            <Col span="4" offset="1">
              <Button type="primary" style="margin-left: 10px" @click="drawer = true">话题#</Button>
            </Col>
            <Col span="12">
              <Select
                  v-if="drawer"
                  v-model="topicQuery"
                  filterable
                  :label-in-value="true"
                  :remote-method="remoteMethod"
                  @on-select="selectTopic"
                  placeholder="选择话题#"
                  :loading="loading">
                <Option v-for="(option, index) in topicOptions" :value="option.topicId" :key="index">
                  {{ option.topicName }}
                </Option>
              </Select>
            </Col>
          </Row>
        </Card>
        <!--                博客列表卡片-->
        <Card style="margin-top: 10px" v-for="(item, index) in indexBlogs" :key="index">
          <div>

            <List item-layout="vertical">
              <ListItem>
                <router-link :to="{name: 'Home', params: {userId: item.user.userId}}">
                  <ListItemMeta :avatar="photoSrc(item.user.userAvatar)" :title="item.user.userName" description=""/>
                </router-link>
                <div style="margin-left: 50px">
                  <span>{{ item.blog.blogContent }}</span>
                  <router-link :to="{name: 'BlogsOfTopic', params: {topicId: item.blog.blogTopicId}}">
                    {{ '#' + item.blog.blogTopicName }}
                  </router-link>
                  <div v-if="item.blog.blogPictures">
                    <img v-for="(img, index) in item.blog.blogPictures.split('|')" :src="photoSrc(img)" :key="index"
                         style="width: 158px;height:158px;line-height: 158px;margin-left: 2px">
                  </div>
                </div>
                <template slot="action">
                  <li>
                    <Icon v-if="item.blog.blogIsCollected" type="ios-star"
                          @click="deleteCollect(user.userId, item.user.userId, item.blog.blogId, index)"/>
                    <Icon v-else type="ios-star-outline"
                          @click="addCollect(user.userId, item.user.userId, item.blog.blogId, index)"/>
                    {{ item.blog.blogCollectionsCount }}
                  </li>
                  <li>
                    <Icon type="ios-chatbubbles-outline" @click="intoBlog(item.blog.blogId)"/>
                    {{ item.blog.blogCommentsCount }}
                  </li>
                  <li>
                    <Icon v-if="item.blog.blogIsLiked" type="ios-thumbs-up"
                          @click="deleteLike(user.userId, item.blog.blogId, index)"/>
                    <Icon v-else type="ios-thumbs-up-outline"
                          @click="addLike(user.userId, item.blog.blogId, index)"/>
                    {{ item.blog.blogLikes }}
                  </li>
                </template>
              </ListItem>
            </List>
          </div>
        </Card>

      </Content>
      <!--            侧边栏-->
      <Sider hide-trigger style="margin-left: 5px; width: 100px">
        <Card>
          <p slot="title">
            <Icon type="ios-flame"/>
            时事热点
          </p>
          <ul>
            <li v-for="(topic, index) in mostTopics" :key="index" style="list-style: none">
              <span style="color: red; font-size: 20px">{{ index + 1 }}</span>
              <router-link :to="{name: 'BlogsOfTopic', params:{topicId: topic.topicId}}"
                           style="margin-left: 10px; font-size: 12px; color: black">
                {{ topic.topicName }}
              </router-link>
            </li>
          </ul>
        </Card>
        <BackTop></BackTop>
      </Sider>
    </Layout>
    <!--        底部栏-->
    <Footer>
      <Foot></Foot>
    </Footer>
  </Layout>
</template>

<script>
import Head from '../components/Header';
import Foot from '../components/Footer';

import {mapState} from 'vuex'

export default {
  name: "Index",
  data() {
    return {
      drawer: false,
      topicQuery: '',
      loading: false,
      topicOptions: [],

      indexBlogs: [],
      key: '',
      mostTopics: [],
      blogContent: '',
      blogTopicId: 0,
      blogTopicName: '',
      topics: [],
      blogPictures: '',

      formPicsAndContentData: "",
      multiple: true,
      limit: 9
    }
  },
  computed: {
    ...mapState(['user', 'userToken']),
    photoSrc() {
      return photoSrc => {
        return `${this.$settings.HOST}${photoSrc}`;
      }
    },
  },
  components: {
    Head,
    Foot
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.$axios({
          url: '/api/topics',
          method: 'GET',
          params: {
            key: query
          }
        }).then(res => {
          if (res.data.status.code === 200) {
            this.topicOptions = res.data.data;
            this.loading = false;
          } else {
            alert(res.data.status.msg);
          }
        }).catch(error => {
          alert(error);
        })
      }
    },
    selectTopic(topic) {
      this.blogTopicId = topic.value;
      this.blogTopicName = topic.label;
      this.blogContent = '#' + this.blogTopicName + this.blogContent
      this.drawer = !this.drawer;
    },
    getMostTopics() {
      this.$axios({
        url: '/api/mosttopics',
        method: 'GET',
      }).then(res => {
        if (res.data.status.code === 200) {
          this.mostTopics = res.data.data;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    getIndexBlogs() {
      this.$axios({
        url: '/api/indexblogs',
        method: 'GET',
        params: {
          userId: this.user ? this.user.userId : 0
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.indexBlogs = res.data.data;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    addBlog() {
      // let self = this;
      this.formPicsAndContentData = new FormData();
      this.$refs.uploadPic.submit();
      this.formPicsAndContentData.append('userId', this.user.userId);
      this.formPicsAndContentData.append('blogTopic', this.blogTopicId);
      this.formPicsAndContentData.append('blogContent', this.blogContent.slice(this.blogTopicName.length + 1));
      this.$axios({
        url: '/api/blog',
        method: 'POST',
        data: this.formPicsAndContentData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.$Notice.success({
            title: "发表成功"
          });
          this.blogContent = '';
          this.formPicsAndContentData = '';
          this.drawer = false;
          this.formPicsAndContentData = '';
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    addCollect(userId, upId, blogId, index) {
      if (userId == upId) {
        this.$Notice.warning({
          title: '不能收藏自己的微博！'
        })
      } else {
        this.$axios({
          url: '/api/collection',
          method: 'POST',
          params: {
            userId: userId,
            blogId: blogId
          }
        }).then(res => {
          if (res.data.status.code === 200) {
            this.indexBlogs[index].blog.blogIsCollected = 1;
            this.indexBlogs[index].blog.blogCollectionsCount += 1;
            this.$Notice.success({
              title: '收藏成功！'
            })
          } else {
            alert(res.data.status.msg);
          }
        }).catch(error => {
          alert(error);
        })
      }

    },
    deleteCollect(userId, upId, blogId, index) {
      this.$axios({
        url: '/api/collection',
        method: 'DELETE',
        params: {
          userId: userId,
          blogId: blogId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.indexBlogs[index].blog.blogIsCollected = 0;
          this.indexBlogs[index].blog.blogCollectionsCount -= 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    addLike(userId, blogId, index) {
      this.$axios({
        url: '/api/like',
        method: 'POST',
        params: {
          userId: userId,
          blogId: blogId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.indexBlogs[index].blog.blogIsLiked = 1;
          this.indexBlogs[index].blog.blogLikes += 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    deleteLike(userId, blogId, index) {
      this.$axios({
        url: '/api/like',
        method: 'DELETE',
        params: {
          userId: userId,
          blogId: blogId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.indexBlogs[index].blog.blogIsLiked = 0;
          this.indexBlogs[index].blog.blogLikes -= 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    intoBlog(blogId) {
      this.$router.push({name: 'Blog', params: {blogId: blogId}})
    },
    /* 以下为上传图片功能 */
    uploadFile(file) {
      this.formPicsAndContentData.append('file', file.file);
    }
  },
  created() {
    this.$Loading.start();
    this.getMostTopics();
    this.getIndexBlogs();
    this.$Loading.finish();
  }
}
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>