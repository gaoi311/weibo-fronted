<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Content style="margin: 1% 20% 1% 20%">
      <h2>评论通知</h2>
      <div>
        <Card style="margin-top: 10px;cursor: pointer" v-for="(blogCommentNotice, index) in blogCommentNotices"
              :key="index">
          <div>
            <List item-layout="vertical">
              <ListItem>
                <ListItemMeta :avatar="photoSrc(blogCommentNotice.user.userAvatar)"
                              :title="blogCommentNotice.user.userName + '   评论：' + blogCommentNotice.comment"/>
                {{ blogCommentNotice.blog.blogContent }}
              </ListItem>
            </List>
          </div>
        </Card>
      </div>
      <h2>收藏通知</h2>
      <div>
        <Card style="margin-top: 10px;cursor: pointer"
              v-for="(blogCollectionNotice, index) in blogCollectionNotices"
              :key="index">
          <div>
            <List item-layout="vertical">
              <ListItem>
                <ListItemMeta :avatar="photoSrc(blogCollectionNotice.user.userAvatar)"
                              :title="blogCollectionNotice.user.userName + '   收藏了您的博客！'"/>
                {{ blogCollectionNotice.blog.blogContent }}
              </ListItem>
            </List>
          </div>
        </Card>
      </div>
      <h2>关注通知</h2>
      <div>
        <Card style="margin-top: 10px;cursor: pointer" v-for="(blogFollowNotice, index) in blogFollowNotices"
              :key="index">
          <div>
            <List item-layout="vertical">
              <ListItem>
                <ListItemMeta :avatar="photoSrc(blogFollowNotice.user.userAvatar)"
                              :title="blogFollowNotice.user.userName + '   关注了您！'"/>
              </ListItem>
            </List>
          </div>
        </Card>
      </div>
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
  name: "Notice",
  data() {
    return {
      blogCollectionNotices: null,
      blogCommentNotices: null,
      blogFollowNotices: null
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
    getNotices() {
      this.$axios({
        url: '/api/unsawnotices/' + this.user.userId,
        method: 'GET',
      }).then(res => {
        if (res.data.status.code === 200) {
          this.blogCommentNotices = res.data.data.blogCommentNotices;
          this.blogCollectionNotices = res.data.data.blogCollectionNotices;
          this.blogFollowNotices = res.data.data.blogFollowNotices;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    }
  },
  created() {
    this.$Loading.start();
    this.getNotices();
    this.$Loading.finish();
  }
}
</script>

<style scoped>

</style>