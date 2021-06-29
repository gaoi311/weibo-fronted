<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Layout style="margin: 1% 20% 1% 25%">
      <Content style="max-width: 100%">
        <h2>个人主页</h2>
        <Card style="margin-top: 10px">
          <Avatar :src="photoSrc(up.userAvatar)" style="width: 100px; height: 100px"></Avatar>
          <span style="margin-left: 20px; font-size: 20px">用户</span><span style="font-size: 24px">{{
            up.userName
          }}</span>
          <router-link :to="{name: 'Follows', params: {userId: up.userId}}"><p
              style="margin-left: 120px; font-size: 18px">关注 {{ follows.length }}</p></router-link>
          <div v-if="userId != user.userId">
            <Button v-if="up.userIsFollowed" @click="deleteFollow" type="primary">已关注</Button>
            <Button v-else @click="addFollow" type="warning">+关注</Button>
          </div>
        </Card>
        <Divider/>
        <Card style="margin-top: 10px" v-for="(blog, index) in blogs" :key="index">
          <div>
            <List item-layout="vertical">
              <ListItem>
                <ListItemMeta :avatar="photoSrc(up.userAvatar)" :title="up.userName" description=""/>
                <div style="margin-left: 50px">
                  <span>{{ blog.blogContent }}</span>
                  <router-link :to="{name: 'BlogsOfTopic', params: {topicId: blog.blogTopicId}}">
                    {{ '#' + blog.blogTopicName }}
                  </router-link>
                  <div v-if="blog.blogPictures">
                    <img v-for="(img, index) in blog.blogPictures.split('|')" :src="photoSrc(img)" :key="index"
                         style="width: 158px;height:158px;line-height: 158px;margin-left: 2px">
                  </div>
                </div>
                <template slot="action">
                  <li>
                    <Icon v-if="blog.blogIsCollected" type="ios-star"
                          @click="deleteCollect(user.userId, up.userId, blog.blogId, index)"/>
                    <Icon v-else type="ios-star-outline"
                          @click="addCollect(user.userId, up.userId, blog.blogId, index)"/>
                    {{ blog.blogCollectionsCount }}
                  </li>
                  <li>
                    <Icon type="ios-chatbubbles-outline" @click="intoBlog(blog.blogId)"/>
                    {{ blog.blogCommentsCount }}
                  </li>
                  <li>
                    <Icon v-if="blog.blogIsLiked" type="ios-thumbs-up"
                          @click="deleteLike(user.userId, blog.blogId, index)"/>
                    <Icon v-else type="ios-thumbs-up-outline" @click="addLike(user.userId, blog.blogId, index)"/>
                    {{ blog.blogLikes }}
                  </li>
                  <li style="float: right">
                    <Dropdown v-if="userId == user.userId">
                      <a href="javascript:void(0)">
                        <Icon type="ios-arrow-down"></Icon>
                      </a>
                      <DropdownMenu slot="list">
                        <DropdownItem @click.native="deleteBlog(blog.blogId)">删除</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </template>
              </ListItem>
            </List>
          </div>
        </Card>
      </Content>
      <BackTop></BackTop>
    </Layout>
    <Footer>
      <Foot></Foot>
    </Footer>
  </Layout>
</template>

<script>
import Head from '../components/Header'
import Foot from '../components/Footer'

import {mapState} from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      blogs: [],
      userId: 0,
      up: null,
      follows: [],
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
    getUserId() {
      this.userId = this.$route.params.userId;
    },
    getFollows() {
      this.$axios({
        url: '/api/follows/' + this.userId,
        method: 'GET'
      }).then(res => {
        if (res.data.status.code === 200) {
          this.follows = res.data.data;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    getBlogs() {
      this.$axios({
        url: '/api/blogs/' + this.userId,
        method: 'GET',
        params: {
          myId: this.user ? this.user.userId : 0
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blogs = res.data.data.blogs;
          this.up = res.data.data.user;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    deleteBlog(blogId) {
      this.$axios({
        url: '/api/blog/' + blogId,
        method: 'DELETE',
      }).then(res => {
        if (res.data.status.code === 200) {
          this.$Notice.success({
            title: '删除博客成功！'
          })
          this.getBlogs();
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
            this.blogs[index].blogIsCollected = 1;
            this.blogs[index].blogCollectionsCount += 1;
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
          this.blogs[index].blogIsCollected = 0;
          this.blogs[index].blogCollectionsCount -= 1;
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
          this.blogs[index].blogIsLiked = 1;
          this.blogs[index].blogLikes += 1;
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
          this.blogs[index].blogIsLiked = 0;
          this.blogs[index].blogLikes -= 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    addFollow() {
      this.$axios({
        url: '/api/follow',
        method: 'POST',
        params: {
          userId: this.user.userId,
          otherId: this.userId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.up.userIsFollowed = 1;
          this.$Notice.success({
            title: "关注成功！"
          });
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    deleteFollow() {
      this.$axios({
        url: '/api/follow',
        method: 'DELETE',
        params: {
          userId: this.user.userId,
          otherId: this.userId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.up.userIsFollowed = 0;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    intoBlog(blogId) {
      this.$router.push({name: 'Blog', params: {blogId: blogId}})
    }
  },
  created() {
    this.$Loading.start();
    this.getUserId();
    this.getBlogs();
    this.getFollows();
    this.$Loading.finish();
  }
}
</script>