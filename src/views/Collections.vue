<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Layout style="margin: 1% 25% 1% 25%">
      <Content style="max-width: 100%">
        <!--                博客列表卡片-->
        <h2>我的收藏</h2>
        <Card style="margin-top: 10px" v-for="(item, index) in blogCollections" :key="index">
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
    </Layout>
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
  name: "Collections",
  data() {
    return {
      blogCollections: []
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
    getBlogCollections() {
      this.$axios({
        url: '/api/collections/' + this.user.userId,
        method: 'GET',
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blogCollections = res.data.data;
        } else {
          alert(res.data.status.msg);
        }
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
            this.blogCollections[index].blog.blogIsCollected = 1;
            this.blogCollections[index].blog.blogCollectionsCount += 1;
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
          this.blogCollections[index].blog.blogIsCollected = 0;
          this.blogCollections[index].blog.blogCollectionsCount -= 1;
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
          this.blogCollections[index].blog.blogIsLiked = 1;
          this.blogCollections[index].blog.blogLikes += 1;
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
          this.blogCollections[index].blog.blogIsLiked = 0;
          this.blogCollections[index].blog.blogLikes -= 1;
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
  },
  created() {
    this.$Loading.start();
    this.getBlogCollections();
    this.$Loading.finish();
  }
}
</script>