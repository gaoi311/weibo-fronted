module.exports = {
    devServer: {
        port: 9000,
        // *** 前端调试时注释掉proxy--开始 ***

        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                crossOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },

        // *** 前端调试时注释掉proxy--结束 ***


        // *** 后端调试时注释掉before--开始 ***

        //  before(app, server) {
        //     [
        //         // 共有模块
        //         app.get('/api/blog/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         }
        //                     }
        //             })
        //         }),  //详细微博
        //         app.get('/api/indexblogs', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: [
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         }
        //                     },
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 2,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 1,
        //                             blogIsCollected: 0
        //                         }
        //                     },
        //                 ]
        //             })
        //         }),  //主页微博列表
        //         app.get('/api/search', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: {
        //                     // 有三种可能，搜索用户、搜索微博、搜索话题
        //                 }
        //             })
        //         }),  // 搜索功能
        //         app.get('/api/mosttopics', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         topicId: 1,
        //                         topicName: 'xxx大战xxx'
        //                     },
        //                     {
        //                         topicId: 2,
        //                         topicName: 'xxx大战xx'
        //                     },
        //                 ]
        //             })
        //         }),   // 获取推荐的话题
        //         app.get('/api/topicblogs/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: [
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         }
        //                     },
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         }
        //                     },
        //                 ]
        //             })
        //         }),  //某话题下微博
        //
        //         // 游客模块
        //         app.post('/api/register', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '注册成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 注册
        //
        //         // 用户模块
        //         app.post('/api/login', (req, res) => {
        //             res.json(data = {
        //                 status: {
        //                     code: 200,
        //                     msg: '登录成功'
        //                 },
        //                 data: {
        //                     userToken: '123.244.453400',
        //                     user: {
        //                         userId: 1,
        //                         userName: 'a13912345678',
        //                         userAvatar: 'avatar/1.jpg',
        //                     }
        //                 }
        //             })
        //         }),  // 登录
        //         app.get('/api/myinfo/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '用户信息获取成功'
        //                 },
        //                 data: {
        //                     userId: 1,
        //                     userName: 'a13912345678',
        //                     userGender: "男",
        //                     userBirth: '2021-01-01',
        //                     userAvatar: 'avatar/1.jpg'
        //                 }
        //             })
        //         }),  // 获取我的信息
        //         app.put('/api/myinfo/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '修改成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 修改我的信息
        //         app.post('/api/blog', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 发表博客
        //         app.delete('/api/blog/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "删除成功"
        //                 },
        //                 data: {}
        //             })
        //         }),  // 删除博客
        //         app.get('/api/comments/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: [
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'http://1212212.jpg'
        //                         },
        //                         comment: '写得真好，不错'
        //                     },
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'http://1212212.jpg'
        //                         },
        //                         comment: '写得真好，不错'
        //                     },
        //                 ]
        //             })
        //         }),  // 获取评论
        //         app.post('/api/comment', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '评论成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 发表评论
        //         app.post('/api/follow', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '关注成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 关注他人
        //         app.delete('/api/follow', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '取消成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 取消关注他人
        //         app.post('/api/collection', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '收藏成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 收藏博客
        //         app.delete('/api/collection', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '取消成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 取消收藏博客
        //         app.post('/api/like', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '点赞成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 点赞博客
        //         app.delete('/api/like', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '取消成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 取消点赞博客
        //         app.get('/api/noticescount/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: {
        //                     noticesCount: 12
        //                 }
        //             })
        //         }),  // 获取评论、收藏通知数
        //         app.get('/api/unsawnotices/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: {
        //                     blogCollectionNotices: [
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogContent: "34234234234"
        //                             },
        //
        //                         },
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogContent: "34234234234"
        //                             },
        //
        //                         },
        //                     ],
        //                     blogCommentNotices: [
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogContent: "34234234234"
        //                             },
        //                             comment: "写得不错"
        //
        //                         },
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogContent: "34234234234"
        //                             },
        //                             comment: "写得不错"
        //
        //                         },
        //                     ]
        //                 }
        //             })
        //         }),   // 获取用户未查看的评论、收藏信息
        //         app.get('/api/blogs/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: {
        //                     user: {
        //                         userId: 1,
        //                         userName: 'a1123123',
        //                         userAvatar: '23423423.jpg',
        //                         userIsFollowed: 1
        //                     },
        //                     blogs: [
        //                         {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         },
        //                         {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         },
        //                     ]
        //                 }
        //             })
        //         }),  // 获取用户的博客
        //         app.get('/api/collections/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         }
        //                     },
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'avatar/1.jpg'
        //                         },
        //                         blog: {
        //                             blogId: 1,
        //                             blogContent: 'sdasdasldasld',
        //                             blogTopicId: 1,
        //                             blogTopicName: '川普',
        //                             blogLikes: 123,
        //                             blogCommentsCount: 23,
        //                             blogCollectionsCount: 8,
        //                             blogPictures: 'photos/1.jpg|photos/2.jpg',
        //                             blogCreatedTime: 180239239,
        //                             blogIsLiked: 0,
        //                             blogIsCollected: 0
        //                         }
        //                     },
        //                 ]
        //             })
        //         }),  // 获取收藏的博客
        //         app.get('/api/follows/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '关注获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         userId: 1,
        //                         userName: 'a13912345678',
        //                         userAvatar: 'avatar/default.jpg'
        //                     },
        //                     {
        //                         userId: 2,
        //                         userName: 'a13912345678',
        //                         userAvatar: 'avatar/default.jpg'
        //                     },
        //                 ]
        //             })
        //         }),  // 获取关注的用户
        //         app.get('/api/topics', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         topicId: 1,
        //                         topicName: '12345'
        //                     },
        //                     {
        //                         topicId: 2,
        //                         topicName: '12367'
        //                     },
        //                 ]
        //             })
        //         }),  // 获取相关话题
        //
        //         // 管理员模块
        //
        //         app.post('/api/admin/login', (req, res) => {
        //             res.json(data = {
        //                 status: {
        //                     code: 200,
        //                     msg: '登录成功'
        //                 },
        //                 data: {
        //                     user: {
        //                         userId: 1,
        //                         userName: 'a13912345678',
        //                     }
        //                 }
        //             })
        //         }),  // 管理员登陆
        //         app.get('/api/admin/users', (req, res) => {
        //             res.json(data = {
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         userId: 1,
        //                         userName: 'axxx',
        //                         userIsBlocked: 0
        //                     },
        //                     {
        //                         userId: 2,
        //                         userName: 'axxx',
        //                         userIsBlocked: 0
        //                     },
        //                     {
        //                         userId: 3,
        //                         userName: 'axxx',
        //                         userIsBlocked: 1
        //                     }
        //                 ]
        //             })
        //         }),  // 获取所有用户
        //         app.get('/api/admin/userssearch', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         userId: 1,
        //                         userName: 'axxx',
        //                         userIsBlocked: 0
        //                     },
        //                     {
        //                         userId: 2,
        //                         userName: 'axxx',
        //                         userIsBlocked: 0
        //                     },
        //                     {
        //                         userId: 3,
        //                         userName: 'axxx',
        //                         userIsBlocked: 1
        //                     }
        //                 ]
        //             })
        //         }),  // 搜素用户
        //         app.delete('/api/admin/user/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '封禁成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 封禁用户
        //         app.post('/api/admin/user/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '解禁成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 解禁用户
        //         app.get('/api/admin/topics', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         topicId: 1,
        //                         topicName: 'axxx',
        //                     },
        //                     {
        //                         topicId: 2,
        //                         topicName: 'axxx',
        //                     },
        //                     {
        //                         topicId: 3,
        //                         topicName: 'axxx',
        //                     },
        //                 ]
        //             })
        //         }),  // 获取全部话题
        //         app.get('/api/admin/topicssearch', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         topicId: 1,
        //                         topicName: 'axxx',
        //                     },
        //                     {
        //                         topicId: 2,
        //                         topicName: 'axxx',
        //                     },
        //                     {
        //                         topicId: 3,
        //                         topicName: 'axxx',
        //                     },
        //                 ]
        //             })
        //         }),  // 搜索话题
        //         app.put('/api/admin/topic', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '修改成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 修改话题
        //         app.post('/api/admin/topic', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '增加成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 增加话题
        //         app.delete('/api/admin/topic/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '删除成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 删除话题
        //
        //     ]
        // }

        // *** 后端调试时注释掉before--结束 ***
    }
}
