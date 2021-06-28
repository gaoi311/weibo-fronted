<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Content style="margin: 1% 20% 1% 20%">
      <div>
        <Card>
          <List item-layout="vertical">
            <ListItem>
              <router-link :to="{name: 'Home', params: {userId: blog.user.userId}}">
                <ListItemMeta :avatar="photoSrc(blog.user.userAvatar)" :title="blog.user.userName" description=""/>
              </router-link>
              <div style="margin-left: 50px">
              <span>{{ blog.blog.blogContent }}</span>
              <router-link :to="{name: 'BlogsOfTopic', params: {topicId: blog.blog.blogTopicId}}">
                {{ '#' + blog.blog.blogTopicName }}
              </router-link>
                <div v-if="blog.blog.blogPictures">
                  <img v-for="(img, index) in blog.blog.blogPictures.split('|')" :src="photoSrc(img)" style="width: 158px;height:158px;line-height: 158px;margin-left: 2px" >
                </div>
              </div>
              <template slot="action">
                <li>
                  <Icon v-if="blog.blog.blogIsCollected" type="ios-star"
                        @click="deleteCollect(user.userId, blog.user.userId, blog.blog.blogId)"/>
                  <Icon v-else type="ios-star-outline"
                        @click="addCollect(user.userId, blog.user.userId, blog.blog.blogId)"/>
                  {{ blog.blog.blogCollectionsCount }}
                </li>
                <li>
                  <Icon type="ios-chatbubbles-outline" @click="this.$router.push({name: 'Blog', params: {blogId: blog.blog.blogId}})"/>
                  {{ blog.blog.blogCommentsCount }}
                </li>
                <li>
                  <Icon v-if="blog.blog.blogIsLiked" type="ios-thumbs-up"
                        @click="deleteLike(user.userId, blog.blog.blogId)"/>
                  <Icon v-else type="ios-thumbs-up-outline"
                        @click="addLike(user.userId, blog.blog.blogId)"/>
                  {{ blog.blog.blogLikes }}
                </li>
              </template>
            </ListItem>
          </List>
        </Card>
      </div>
      <Card style="margin-top: 30px">
        <div>
          <List>
            <ListItem v-for="(item, index) in comments" :key="index">
              <ListItemMeta :avatar="photoSrc(item.user.userAvatar)" :title="item.user.userName"
                            :description="item.comment"/>
            </ListItem>
          </List>
        </div>
        <Input v-model="comment" type="textarea" placeholder="说点什么吧..."/>
        <Button type="primary" style="margin-top: 5px" @click="publishComment">发表评论</Button>
      </Card>
    </Content>
    <BackTop></BackTop>
    <Footer>
      <Foot></Foot>
    </Footer>
  </Layout>
</template>

<script>
import Head from '../components/Header';
import Foot from '../components/Footer';
import {mapState} from 'vuex';

export default {
  name: "Blog",
  data() {
    return {
      blogId: 0,
      blog: null,
      comments: [],
      comment: '',
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
    getBlogId() {
      this.blogId = this.$route.params.blogId;
    },
    getBlog() {
      // var data = new FormData();
      // // data.append('blogId', this.blogId);
      // data.append('userId', this.user ? this.user.userId : 0);
      this.$axios({
        url: '/api/blog/' + this.blogId,
        method: 'GET',
        params: {
          userId: this.user ? this.user.userId : 0
        }
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        // }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blog = res.data.data;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    getBlogComments() {
      this.$axios({
        url: '/api/comments/' + this.blogId,
        method: 'GET',
      }).then(res => {
        if (res.data.status.code === 200) {
          this.comments = res.data.data;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    publishComment() {
      if (this.user.userId === this.blog.user.userId) {
        this.$Notice.warning({
          title: "您不能评论自己的博客哦！"
        });
      } else {
        var data = new FormData();
        data.append('blogId', this.blogId);
        data.append('userId', this.user.userId);
        data.append('comment', this.comment);
        this.$axios({
          url: '/api/comment',
          method: 'POST',
          data: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).then(res => {
          if (res.data.status.code === 200) {
            this.$Notice.success({
              title: '发表成功'
            });
            this.comment = '';
            this.getBlogComments();
          } else {
            alert(res.data.status.msg);
          }
        }).catch(error => {
          alert(error);
        })
      }
    },
    addCollect(userId, upId, blogId) {
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
            this.blog.blog.blogIsCollected = 1;
            this.blog.blog.blogCollectionsCount += 1;
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
    deleteCollect(userId, upId, blogId) {
      this.$axios({
        url: '/api/collection',
        method: 'DELETE',
        params: {
          userId: userId,
          blogId: blogId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blog.blog.blogIsCollected = 0;
          this.blog.blog.blogCollectionsCount -= 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    addLike(userId, blogId) {
      this.$axios({
        url: '/api/like',
        method: 'POST',
        params: {
          userId: userId,
          blogId: blogId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blog.blog.blogIsLiked = 1;
          this.blog.blog.blogLikes += 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    deleteLike(userId, blogId) {
      this.$axios({
        url: '/api/like',
        method: 'DELETE',
        params: {
          userId: userId,
          blogId: blogId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blog.blog.blogIsLiked = 0;
          this.blog.blog.blogLikes -= 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    }
    // collectBlog() {
    //   var data = new FormData();
    //   data.append('userId', this.user.userId);
    //   data.append('blogId', this.blogId);
    //   if (this.user && (this.user.userId !== this.blogInfo.user.userId) && !this.blogInfo.blog.blogIsCollected) {
    //     this.$axios({
    //       url: '/api/collection',
    //       method: 'POST',
    //       data: data,
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //       }
    //     }).then(res => {
    //       if (res.data.status.code === 200) {
    //         this.$Notice.success({
    //           title: "收藏成功"
    //         });
    //       } else {
    //         alert(res.data.status.msg);
    //       }
    //     }).catch(error => {
    //       alert(error);
    //     })
    //   } else if (!this.user) {
    //     this.$Notice.warning({
    //       title: "需要登陆哦！"
    //     });
    //   } else if (this.user && this.blogInfo.blog.blogIsCollected) {
    //     this.$Notice.warning({
    //       title: "您已收藏过这篇博客了哦！"
    //     });
    //   } else if (this.user.userId === this.blogInfo.user.userId) {
    //     this.$Notice.warning({
    //       title: "您不能收藏自己的文章哦！"
    //     });
    //   }
    // }
  },
  created() {
    this.$Loading.start();
    this.getBlogId();
    this.getBlog();
    this.getBlogComments();
    this.$Loading.finish();
  }
}
</script>

<style scoped>
</style>
