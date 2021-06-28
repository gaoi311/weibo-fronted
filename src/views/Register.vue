<template>
  <div>
    <div style="background-image: url('/backg.jpg'); width: 100%; height: 100%; position: fixed"></div>
    <div id="bubble_register">
      <Card>
        <div>
          <h1>欢迎注册微博</h1>
        </div>
        <Divider></Divider>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="userPhone">
            <Input type="text" size="large" v-model="formInline.userName" placeholder="用户名">
              <Icon type="md-person" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="userPassword">
            <Input type="password" size="large" password v-model="formInline.userPassword"
                   placeholder="输入密码">
              <Icon type="md-lock" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="userRePassword">
            <Input type="password" size="large" password v-model="formInline.userRePassword"
                   placeholder="确认密码">
              <Icon type="md-lock" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="success" long size="large" @click="handleSubmit('formInline')">注册</Button>
          </FormItem>
          <span>已有帐号?<router-link to="/login">点击登录</router-link></span>
        </Form>
        <Divider/>
        <p style="text-align: center">注册登录即代表同意微博<span @click="userAgreement = true"
                                                       style="cursor: pointer; color: #2D8cF0">用户协议</span>和<span
            @click="privacyPolicy = true" style="cursor: pointer; color: #2D8cF0">隐私协议</span></p>
      </Card>
    </div>
    <Modal
        v-model="userAgreement"
        title="用户协议">
      <Scroll>
        <div>
          当您申请用户时，表示您已经同意遵守本规章。<br>
          <br>
          欢迎您加入本站点参与交流和讨论，本站点为社区，为维护网上公共秩序和社会稳定，请您自觉遵守以下条款：<br>
          <br>
          一、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：<br>
          （一）煽动抗拒、破坏宪法和法律、行政法规实施的；<br>
          （二）煽动颠覆国家政权，推翻社会主义制度的；<br>
          （三）煽动分裂国家、破坏国家统一的；<br>
          （四）煽动民族仇恨、民族歧视，破坏民族团结的；<br>
          （五）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；<br>
          （六）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；　<br>
          （七）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；<br>
          （八）损害国家机关信誉的；<br>
          （九）其他违反宪法和法律行政法规的；<br>
          （十）进行商业广告行为的。<br>
          <br>
          二、互相尊重，对自己的言论和行为负责。<br>
          <br>
          三、禁止在申请用户时使用相关本站的词汇，或是带有侮辱、毁谤、造谣类的或是有其含义的各种语言进行注册用户，否则我们会将其删除。<br>
          <br>
          四、禁止以任何方式对本站进行各种破坏行为。<br>
          <br>
          五、如果您有违反国家相关法律法规的行为，本站概不负责，您的登录信息均被记录无疑，必要时，我们会向相关的国家管理部门提供此类信息。<br>
        </div>
      </Scroll>
    </Modal>
    <Modal
        v-model="privacyPolicy"
        title="隐私政策">
      <Scroll>
        <div>
          本应用尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本应用会按照本隐私权政策的规定使用和披露您的个人信息。但本应用将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本应用不会将这些信息对外披露或向第三方提供。本应用会不时更新本隐私权政策。
          您在同意本应用服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本应用服务使用协议不可分割的一部分。<br>
          <br>
          1. 适用范围<br>
          a) 在您注册本应用帐号时，您根据本应用要求提供的个人注册信息；<br>
          b)
          在您使用本应用网络服务，或访问本应用平台网页时，本应用自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；<br>
          c) 本应用通过合法途径从商业伙伴处取得的用户个人数据。<br>
          您了解并同意，以下信息不适用本隐私权政策：<br>
          a) 您在使用本应用平台提供的搜索服务时输入的关键字信息；<br>
          b) 本应用收集到的您在本应用发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情；<br>
          c) 违反法律规定或违反本应用规则行为及本应用已对您采取的措施。<br>
          <br>
          2. 信息使用<br>
          a)
          本应用不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和本应用（含本应用关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。<br>
          b) 本应用亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何本应用平台用户如从事上述活动，一经发现，本应用有权立即终止与该用户的服务协议。<br>
          c)
          为服务用户的目的，本应用可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本应用合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。<br>
          <br>
          3. 信息披露<br>
          在如下情况下，本应用将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：<br>
          a) 经您事先同意，向第三方披露；<br>
          b) 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；<br>
          c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；<br>
          d) 如您出现违反中国有关法律、法规或者本应用服务协议或相关规则的情况，需要向第三方披露；<br>
          e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；<br>
          f) 在本应用平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本应用有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。<br>
          g) 其它本应用根据法律、法规或者网站政策认为合适的披露。<br>
          <br>
          4. 信息存储和交换<br>
          本应用收集的有关您的信息和资料将保存在本应用及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本应用收集信息和资料所在地的境外并在境外被访问、存储和展示。<br>
        </div>
      </Scroll>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    // const validatePhone = (rule, value, callback) => {
    //     if (value === '') {
    //         callback(new Error('请输入手机号'));
    //     } else {
    //         if (!(/^[]$/.test(value))) {
    //             callback(new Error('手机号格式不正确'));
    //         }
    //         callback();
    //     }
    // };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!(/^(?![0-9]*$)(?![a-zA-Z]*$)[0-9A-Za-z]{6,30}$/.test(value))) {
        callback(new Error('密码至少6位且必须包含一位字母'))
      } else {
        if (this.formInline.userPassword !== '') {
          // 对第二个密码框单独验证
          this.$refs.formInline.validateField('userRePassword');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formInline.userPassword) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };
    return {
      userAgreement: false,
      privacyPolicy: false,
      formInline: {
        userName: '',
        userPassword: '',
        userRePassword: ''
      },
      ruleInline: {
        // userName: [
        //     {
        //         // required: true,
        //         // message: '此项为必填项',
        //         validator: validatePhone,
        //         trigger: 'blur'
        //     }
        // ],
        userPassword: [
          {
            // required: true,
            // message: '此项为必填项',
            validator: validatePass,
            trigger: 'blur'
          },
        ],
        userRePassword: [
          {
            // required: true,
            // message: '此项为必填项',
            validator: validatePassCheck,
            trigger: 'blur'
          },
        ]
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var data = new FormData();
          data.append('userName', this.formInline.userName);
          data.append('userPassword', this.formInline.userPassword);
          this.$axios({
            url: '/api/register',
            method: 'POST',
            data: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }).then(res => {
            if (res.data.status.code === 200) {
              this.$router.push('/login');
            } else {
              alert(res.data.status.msg);
            }
          }).catch(error => {
            alert(error);
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#bubble_register {
  position: absolute;
  top: 45%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 400px;
}
</style>