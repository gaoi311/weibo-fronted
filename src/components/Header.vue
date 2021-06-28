<template>
  <Menu mode="horizontal" active-name="1">
        <span style="float: left; margin-left: 1%">
            <Avatar shape="square"
                    src="/logo.jpg"
                    size="large"
                    @click.native="$router.push('/')"/>
        </span>
    <MenuItem name="1" to="/login" style="float: right" v-if="!user">
      <Icon type="md-log-in"/>
      登录
    </MenuItem>
    <MenuItem name="2" to="/register" style="float: right;" v-if="!user">
      <Icon type="ios-people"/>
      注册
    </MenuItem>
    <Submenu name="3" style="float: right" v-if="user">
      <template slot="title">
        <Avatar shape="square"
                :src="photoSrc(user.userAvatar)"
                size="large"/>
      </template>
      <MenuItem name="3-1" :to="'/home/' + user.userId">
        <Icon type="md-home"/>
        我的主页
      </MenuItem>
      <MenuItem name="3-2" to="/collections">
        <Icon type="md-heart"/>
        我的收藏
      </MenuItem>
      <MenuItem name="3-3" :to="'/follows/' + user.userId">
        <Icon type="md-at" />
        我的关注
      </MenuItem>
      <MenuItem name="3-4" to="/notices">
        <Icon type="md-alert" />
        通知
        <Badge status="error" v-if="noticesCount"></Badge>
      </MenuItem>
      <MenuItem name="3-5" to="/myinfo">
        <Icon type="md-cog"/>
        设置
      </MenuItem>
      <MenuItem name="3-6" @click.native="logout">
        <Icon type="md-log-out"/>
        退出登录
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      activeIndex: '1',
      noticesCount: 0,
    }
  },
  computed: {
    ...mapState(['user', 'noticeUserCount']),
    photoSrc() {
      return photoSrc => {
        return `${this.$settings.HOST}${photoSrc}`;
      }
    },
  },
  methods: {
    ...mapActions(['changeLogout', 'changeNoticeUserCount']),
    changeIfNotices() {
      this.$axios({
        url: '/api/noticescount/' + this.user.userId,
        method: 'GET',
      }).then(res => {
        if (res.data.status.code === 200) {
          this.noticesCount = res.data.data.noticesCount;
          if (this.noticesCount && (this.noticeUserCount < 1)) {
            this.$Notice.info({
              title: '您有新通知！'
            })
          }
          this.changeNoticeUserCount();
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    logout() {
      this.changeLogout();
      this.$Notice.success({
        title: '您已退出'
      })
      this.$router.push('/');
    },
  },
  created() {
    if (this.user) {
      this.changeIfNotices();
    }
  }
}
</script>
<style scoped>
</style>