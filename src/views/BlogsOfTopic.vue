<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Content style="margin: 1% 20% 1% 20%">
      <Input search v-model="key" size="large" placeholder="搜索微博 话题 博主"
             @on-search="$router.push({name: 'Search', query: {key: key}})"/>
      <!--            <h2>{{blogs[0].blogTags[0].tagName}} 标签下的博客</h2>-->

      <Card style="margin-top: 10px">
        <span @click="$router.back(-1)" style="cursor: pointer;"><Icon type="ios-arrow-back"/>返回</span>
        <h2 style="text-align: center">#{{blogs[0].blog.blogTopicName}}#</h2>
      </Card>
        <Card style="margin-top: 10px" v-for="(item, index) in  blogs" :key="index">
          <div>
            <List item-layout="vertical">
              <ListItem>
                <ListItemMeta :avatar="photoSrc(item.user.userAvatar)" :title="item.user.userName" description=""/>
                <div style="margin-left: 50px">
                <span>{{ item.blog.blogContent }}</span>
                <router-link :to="{name: 'BlogsOfTopic', params: {topicId: item.blog.blogTopicId}}">
                  {{ '#' + item.blog.blogTopicName }}
                </router-link>
                  <div v-if="item.blog.blogPictures">
                    <img v-for="(img, index) in item.blog.blogPictures.split('|')" :src="photoSrc(img)" style="width: 158px;height:158px;line-height: 158px;margin-left: 2px" >
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
    <BackTop></BackTop>
    <Footer>
      <Foot></Foot>
    </Footer>
  </Layout>
</template>

<script>
import Head from "../components/Header";
import Foot from "../components/Footer";

import {mapState} from 'vuex';

export default {
  name: "BlogsOfTopic",
  data() {
    return {
      key: '',
      topicId: 0,
      blogs: []
    }
  },
  computed: {
    ...mapState(['user']),
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
    getTopicId() {
      this.topicId = this.$route.params.topicId;
    },
    getBlogsOfTopic(topicId) {  //这里加参数是为了此页面点击标签，直接刷新数据
      this.$axios({
        url: '/api/topicblogs/' + topicId,
        method: 'GET',
        params: {
          userId: this.user ? this.user.userId : 0
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blogs = res.data.data
        } else
          alert(res.data.status.msg);
      }).catch(error => {
        alert(error);
      })
    },
    addCollect(userId, upId, blogId, index) {
      if (userId == upId){
        this.$Notice.warning({
          title: '不能收藏自己的微博！'
        })
      }else {
        this.$axios({
          url: '/api/collection',
          method: 'POST',
          params: {
            userId: userId,
            blogId: blogId
          }
        }).then(res => {
          if (res.data.status.code === 200) {
            this.blogs[index].blog.blogIsCollected = 1;
            this.blogs[index].blog.blogCollectionsCount += 1;
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
          this.blogs[index].blog.blogIsCollected = 0;
          this.blogs[index].blog.blogCollectionsCount -= 1;
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
          this.blogs[index].blog.blogIsLiked = 1;
          this.blogs[index].blog.blogLikes += 1;
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
          this.blogs[index].blog.blogIsLiked = 0;
          this.blogs[index].blog.blogLikes -= 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    intoBlog(blogId){
      this.$router.push({name: 'Blog', params: {blogId: blogId}})
    }
  },
  created() {
    this.$Loading.start();
    this.getTopicId();
    this.getBlogsOfTopic(this.topicId);
    this.$Loading.finish();
  }
}
</script>