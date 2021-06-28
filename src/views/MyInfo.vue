<template>
  <Layout>
    <Header>
      <Head></Head>
    </Header>
    <Content style="margin: 1% 20% 1% 20%">
      <h2>我的信息</h2>
      <Card>
        <Form :model="formItem" :label-width="80" label-position="left">
          <input type="hidden" v-model="formItem.userId">
          <FormItem label="头像">
            <Avatar :src="photoSrc(formItem.userAvatar)" style="width: 150px; height: 150px"/>
<!--            <Upload action="" :before-upload="beforeUpload" style="display: inline; margin-left: 5%"-->
<!--                    :format="['jpg','jpeg','png']" :max-size="1024" :on-format-error="handleFormatError"-->
<!--                    :on-exceeded-size="handleMaxSize">-->
<!--              <Button v-if="avatarFile == null" type="success" icon="ios-cloud-upload-outline">上传头像-->
<!--              </Button>-->
<!--              <Button v-if="avatarFile != null" type="success" @click.stop="uploadAvatar">点击上传</Button>-->
<!--              <p style="display: inline" v-if="avatarFile != null">&nbsp;{{ avatarFile.name }}</p>-->
<!--            </Upload>-->
          </FormItem>
          <FormItem label="用户名">
            <Input v-model="formItem.userName" style="width: 160px"></Input>
          </FormItem>
          <Divider/>
          <FormItem label="出生年月">
            <DatePicker type="date" style="width: 160px" v-model="formItem.userBirth"></DatePicker>
          </FormItem>
          <Divider/>
          <FormItem label="性别">
            <RadioGroup v-model="formItem.userGender">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
          <Divider/>
          <FormItem>
            <Button type="success" shape="circle" size="large" @click.native="saveInfo">保存修改</Button>
          </FormItem>
        </Form>
      </Card>
    </Content>
    <Footer>
      <Foot></Foot>
    </Footer>
  </Layout>
</template>
<script>
import Head from "../components/Header";
import Foot from "../components/Footer";
import {mapState, mapActions} from 'vuex'

export default {
  name: 'MyInfo',
  data() {
    return {
      avatarFile: null,
      loadingStatus: false,
      formItem: {
        userId: 0,
        userName: '',
        userGender: "男",
        userBirth: '',
        userAvatar: ''
      }
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
    ...mapActions(['changeUserInfo']),
    jsDate2JavaDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    javaDate2JsDate(date) {
      return new Date(date);
    },
    getInfo() {
      this.$axios({
        url: '/api/myinfo/' + this.user.userId,
        method: 'GET',
        headers: {
          Authorization: this.userToken
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.formItem.userId = res.data.data.userId;
          this.formItem.userName = res.data.data.userName;
          this.formItem.userGender = res.data.data.userGender;
          this.formItem.userBirth = this.javaDate2JsDate(res.data.data.userBirth);
          this.formItem.userAvatar = res.data.data.userAvatar;
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    handleFormatError(avatarFile) {
      this.$Notice.warning({
        title: '格式不正确',
        desc: '图片格式不正确，请选择jpg或png格式的图片！'
      });
    },
    handleMaxSize(avatarFile) {
      this.$Notice.warning({
        title: '超出大小限制',
        desc: '文件  ' + avatarFile.name + ' 太大，请上传小于1M的文件！'
      });
    },
    beforeUpload(avatarFile) {
      this.avatarFile = avatarFile;
      return false;
    },
    uploadAvatar() {
      this.loadingStatus = true;
      var formData = new FormData();
      formData.append("userAvatar", this.avatarFile);
      this.avatarFile = null;
      this.$axios({
        url: '/api/avatar/' + this.user.userId,
        method: 'PUT',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.status.code === 200) {
          this.$Notice.success({
            title: "头像修改成功！\n刷新试试吧！"
          });
          this.changeUserInfo({
            user: {
              userId: this.user.userId,
              userName: this.user.userName,
              userAvatar: res.data.data.userAvatar
            }
          });
          // this.getInfo();
        } else {
          alert(res.data.status.msg);
        }
      }).catch(error => {
        alert(error);
      })
    },
    saveInfo() {
      // alert('111');
      var data = new FormData();
      data.append('userId', this.formItem.userId);
      data.append('userName', this.formItem.userName);
      data.append('userGender', this.formItem.userGender);
      // alert('444');
      data.append('userBirth', this.jsDate2JavaDate(this.formItem.userBirth));
      // alert('222');
      this.$axios({
        url: '/api/myinfo/' + this.user.userId,
        method: 'PUT',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(res => {
        // alert('333');
        if (res.data.status.code === 200) {
          this.$Notice.success({
            title: "信息修改成功"
          });
          this.changeUserInfo({
            user: {
              userId: this.user.userId,
              userName: this.formItem.userName,
              userAvatar: this.user.userAvatar
            }
          });
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
    this.getInfo();
    this.$Loading.finish();
  }
}
</script>
