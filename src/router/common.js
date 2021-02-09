export default [
  //404
  {
    path: "*",
    name: "errorPage",
    meta: { title: "errorPage", keepAlive: false, auth: false },
    component: () => import("@/views/Common/error.vue")
  },
  //视频播放
  {
    path: "/common/videoplayer",
    name: "videoPlayer",
    meta: { title: "视频播放", keepAlive: false, auth: false },
    component: () => import("@/components/player/videoPlayer.vue")
  },
  //txt文本阅读
  {
    path: "/common/txtplayer",
    name: "txtPlayer",
    meta: { title: "文本阅读", keepAlive: false, auth: false },
    component: () => import("@/components/player/txtPlayer.vue")
  },
  //音频播放器
  {
    path: "/common/soundplayer",
    name: "soundPlayer",
    meta: { title: "音频播放", keepAlive: false, auth: false },
    component: () => import("@/components/player/soundPlayer.vue")
  },
]