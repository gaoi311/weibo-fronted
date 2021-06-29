<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Layout style="margin: 1% 20% 1% 25%">
      <Content style="max-width: 100%">
        <h2>关注用户</h2>
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
        <Card style="margin-top: 10px" v-for="(follow, index) in follows" :key="index">

          <List>

            <ListItem>
              <router-link :to="{name: 'Home', params: {userId: follow.userId}}" style="width: 100px">
                <ListItemMeta :avatar="photoSrc(follow.userAvatar)" :title="follow.userName" description=""/>
              </router-link>
              <span style="margin-left: 75%" v-if="up.userId == user.userId">
                <Button v-if="follow.userIsFollowed" @click="deleteFollow(follow.userId, index)" type="primary">已关注
                </Button>
                <Button v-else @click="addFollow(follow.userId, index)" type="warning">+关注</Button>
              </span>
            </ListItem>

          </List>

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
      follows: [],
      up: null,
      collections: []
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
    getBlogs() {
      this.$axios({
        url: '/api/blogs/' + this.userId,
        method: 'GET',
        params: {
          myId: this.user ? this.user.userId : 0
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.up = res.data.data.user;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
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
    addFollow(otherId, index) {
      this.$axios({
        url: '/api/follow',
        method: 'POST',
        params: {
          userId: this.user.userId,
          otherId: otherId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.$Notice.success({
            title: "关注成功！"
          });
          this.follows[index].userIsFollowed = 1;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    deleteFollow(otherId, index) {
      this.$axios({
        url: '/api/follow',
        method: 'DELETE',
        params: {
          userId: this.user.userId,
          otherId: otherId
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.$Notice.success({
            title: "已取消关注！"
          });
          this.follows[index].userIsFollowed = 0;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
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