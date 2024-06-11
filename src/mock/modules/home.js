const platformList = {
    url: "/home/platformList",
    type: "get",
    response: () => {
        return {
            code: 200, // 注意，code 不能少，否则 response 解析出错
            data: [
                {
                    platformBaseInfo: { // platform 平台表基础信息
                        name: "前言",
                        mainPage: "/",
                        platformLogo: "/images/platform-logo/mypages-logo.png",
                        platformLongLogo: "/images/platform-logo/mypages-long-logo.png"
                    },
                    platformOpinionList: [], // user_opinion 用户对平台看法表内容
                    userFollowingTypeList: [
                        { // user_following_type 用户关注类型列表
                            userFollowingTypeInfo: null, // user_following_type 关注用户类型信息
                            userOpinionList: [], // user_opinion 用户对各类型用户的看法
                            userFollowingList: [] // user_following 用户关注列表
                        }
                    ]
                },
                {
                    platformBaseInfo: { // platform 平台表基础信息
                        name: "b站",
                        mainPage: "https://www.bilibili.com",
                        platformLogo: "/images/platform-logo/bilibili-logo.png",
                        platformLongLogo: "/images/platform-logo/bilibili-long-logo.png"
                    },
                    platformOpinionList: [], // user_opinion 用户对平台看法表内容
                    userFollowingTypeList: [
                        { // user_following_type 用户关注类型列表
                            userFollowingTypeInfo: null, // user_following_type 关注用户类型信息
                            userOpinionList: [], // user_opinion 用户对各类型用户的看法
                            userFollowingList: [] // user_following 用户关注列表
                        }
                    ]
                },
                {
                    platformBaseInfo: { // platform 平台表基础信息
                        name: "微博",
                        mainPage: "https://weibo.com",
                        platformLogo: "/images/platform-logo/weibo-logo.png",
                        platformLongLogo: "/images/platform-logo/weibo-long-logo.png"
                    },
                    platformOpinionList: [], // user_opinion 用户对平台看法表内容
                    userFollowingTypeList: [
                        { // user_following_type 用户关注类型列表
                            userFollowingTypeInfo: null, // user_following_type 关注用户类型信息
                            userOpinionList: [], // user_opinion 用户对各类型用户的看法
                            userFollowingList: [] // user_following 用户关注列表
                        }
                    ]
                },
                {
                    platformBaseInfo: { // platform 平台表基础信息
                        name: "豆瓣",
                        mainPage: "https://www.douban.com",
                        platformLogo: "/images/platform-logo/douban-logo.png",
                        platformLongLogo: "/images/platform-logo/douban-long-logo-2.png"
                    },
                    platformOpinionList: [], // user_opinion 用户对平台看法表内容
                    userFollowingTypeList: [
                        { // user_following_type 用户关注类型列表
                            userFollowingTypeInfo: null, // user_following_type 关注用户类型信息
                            userOpinionList: [], // user_opinion 用户对各类型用户的看法
                            userFollowingList: [] // user_following 用户关注列表
                        }
                    ]
                },
                {
                    platformBaseInfo: { // platform 平台表基础信息
                        name: "知乎",
                        mainPage: "https://www.zhihu.com",
                        platformLogo: "/images/platform-logo/zhihu-logo.png",
                        platformLongLogo: "/images/platform-logo/zhihu-long-logo.png"
                    },
                    platformOpinionList: [], // user_opinion 用户对平台看法表内容
                    userFollowingTypeList: [
                        { // user_following_type 用户关注类型列表
                            userFollowingTypeInfo: null, // user_following_type 关注用户类型信息
                            userOpinionList: [], // user_opinion 用户对各类型用户的看法
                            userFollowingList: [] // user_following 用户关注列表
                        }
                    ]
                }
            ]
        }
    }
}

module.exports = [
    platformList
]
