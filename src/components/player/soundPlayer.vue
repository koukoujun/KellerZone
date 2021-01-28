<template>
  <div class="sound-player">
    <div class="content" >
       <div class="play-box" >
          <img class="img-cover" src="@/assets/img/head.jpg" alt="">
       </div>
       <div class="play-tab" >
        <div class="play-progress" >
          <!-- 当前时间 -->
          <div>{{currentTime}}</div>
          <!-- 进度条 -->
          <div class="audioplayer">
            <div class="ap-controller">
              <div class="ap-controller-center" >
                  <!-- 进度条 -->
                  <div class="ap-progress-line">
                      <div class="ap-play-track" ref="track">
                          <!-- 总进度 -->
                          <div class="ap-play-bar-wrap">
                              <!-- 缓存进度 -->
                              <div class="ap-buffer-bar" :style="{transform: 'scaleX('+bufferedScaleX+')'}"></div>
                              <!-- 当前进度 -->
                              <div class="ap-progress-bar" :class="{'forbid-transition': thumbSlide}" :style="{transform: 'scaleX('+progressScaleX+')'}"></div>
                          </div>
                          <!-- 进度按钮 -->
                          <div class="ap-progress-thumb" :class="{'forbid-transition': thumbSlide}" ref="thumb" :style="{transform: 'translateX('+thumbTranslateX+'px)'}">
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32" class="ap-svg-exclude"><path fill="#32b0da" opacity="0.28" d="M11.789 1.207h11.789c3.72 0 6.737 3.016 6.737 6.737v8.421c0 3.72-3.016 6.737-6.737 6.737h-11.789c-3.72 0-6.737-3.016-6.737-6.737v-8.421c0-3.72 3.016-6.737 6.737-6.737z"></path><path fill="#32b0da" opacity="0.14" d="M12.211 2.050h10.947c3.488 0 6.316 2.828 6.316 6.316v7.579c0 3.488-2.828 6.316-6.316 6.316h-10.947c-3.488 0-6.316-2.828-6.316-6.316v-7.579c0-3.488 2.828-6.316 6.316-6.316z"></path><path fill="#000" d="M22.737 2.969c3.256 0 5.895 2.627 5.895 5.866v6.705c0 3.24-2.639 5.866-5.895 5.866h-10.105c-3.256 0-5.895-2.626-5.895-5.866v-6.705c0-3.239 2.639-5.866 5.895-5.866h10.105z"></path><path fill="#fff" d="M22.737 2.969c3.256 0 5.895 2.627 5.895 5.866v6.705c0 3.24-2.639 5.866-5.895 5.866h-10.105c-3.256 0-5.895-2.626-5.895-5.866v-6.705c0-3.239 2.639-5.866 5.895-5.866h10.105z"></path><path fill="#333" d="M13.053 9.706c0.697 0 1.263 0.566 1.263 1.263v2.526c0 0.697-0.566 1.263-1.263 1.263s-1.263-0.566-1.263-1.263v-2.526c0-0.697 0.566-1.263 1.263-1.263z"></path><path fill="#333" d="M22.316 9.706c0.697 0 1.263 0.566 1.263 1.263v2.526c0 0.697-0.566 1.263-1.263 1.263s-1.263-0.566-1.263-1.263v-2.526c0-0.697 0.566-1.263 1.263-1.263z"></path><path fill="#333" d="M26.947 15.538c0 2.321-1.89 4.211-4.211 4.211h-10.105c-2.321 0-4.211-1.89-4.211-4.211v-6.737c0-2.323 1.89-4.211 4.211-4.211h10.105c2.321 0 4.211 1.888 4.211 4.211v6.737zM23.020 2.935l0.6-1.041c0.349-0.603 0.143-1.376-0.461-1.725s-1.376-0.141-1.725 0.461l-1.314 2.275h-4.871l-1.314-2.275c-0.349-0.603-1.122-0.81-1.725-0.461-0.605 0.349-0.812 1.122-0.463 1.725l0.601 1.041c-3.121 0.15-5.612 2.708-5.612 5.866v6.737c0 3.256 2.639 5.895 5.895 5.895h10.105c3.256 0 5.895-2.639 5.895-5.895v-6.737c0-3.16-2.491-5.716-5.612-5.866z"></path></svg>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <!-- 结束时间 -->
          <div>{{totalTime}}</div>
        </div>
        <!-- 控制器 -->
        <div class="play-con" >
          <div @click="chosePlayType">
              <!-- 列表循环 -->
              <svg v-if="playType == 1" width="30" height="30" t="1611736604272" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25891" ><path d="M240.693333 589.546667a32 32 0 0 0-22.666666 9.386666l-113.12 113.12a64 64 0 0 0 0 90.666667l113.12 113.013333a32 32 0 0 0 45.28-45.28L150.186667 757.333333l113.12-113.12a32 32 0 0 0-22.613334-54.666666zM783.306667 98.88a32 32 0 0 0-22.613334 54.666667L873.813333 266.666667l-113.12 113.12a32 32 0 1 0 45.28 45.28l113.12-113.12a64 64 0 0 0 0-90.666667L805.973333 108.266667a32 32 0 0 0-22.666666-9.386667z" fill="#ffffff" p-id="25892"></path><path d="M117.973333 544a32 32 0 0 1-32-32V437.333333a202.666667 202.666667 0 0 1 202.666667-202.666666h597.333333a32 32 0 0 1 0 64h-597.333333a138.666667 138.666667 0 0 0-138.666667 138.666666v74.666667a32 32 0 0 1-32 32zM736.64 789.333333h-602.666667a32 32 0 0 1 0-64h602.666667a138.666667 138.666667 0 0 0 138.666667-138.666666V512a32 32 0 0 1 64 0v74.666667a202.666667 202.666667 0 0 1-202.666667 202.666666z" fill="#ffffff" p-id="25893"></path></svg>
              <!-- 随机播放 -->
              <svg v-else-if="playType == 2" t="1611736686515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26093" width="30" height="30"><path d="M170.71 724.37c-17.38 0-31.82-14.21-31.82-31.59 0-17.61 14.44-31.82 31.82-31.82h82.37c43.32 0 93.86-56.19 145.99-122.99l9.24 12.2c10.4 13.31 20.31 26.62 30.25 39.7-58.67 73.57-118.7 134.5-185.47 134.5h-82.38z m708.76-379.55l-52.36 52.36v0.21l-52.34 52.36c-7.46 7.23-19.41 7.23-27.08 0-4.07-4.07-5.87-9.7-5.43-14.88V363.1h-77.84c-43.32 0-93.63 56.19-145.99 122.97l-9.03-12.17c-10.37-13.31-20.31-26.62-30.69-39.72 59.13-73.55 119.14-134.71 185.7-134.71h77.84v-72.88c0-10.37 8.6-19.18 18.97-19.18 5.18 0 10.37 2.48 13.54 5.64l52.34 52.57 52.36 52.13c7.44 7.67 7.44 19.64 0.46 27.08h-0.45v-0.01z m-40.16-13.54c-19.87-19.41-39.49-39.26-59.13-58.9v117.79c19.64-19.63 39.26-39.04 59.13-58.89z m40.16 374.81h0.46c6.98-7.44 6.98-19.64-0.46-26.85l-52.36-52.35-52.34-52.36c-3.17-3.6-8.36-5.85-13.54-5.85-10.37 0-18.97 8.57-18.97 18.95v73.34h-77.84c-53.03 0-116.64-84.18-180.27-168.12-73.57-96.56-146.68-193.38-231.06-193.38h-82.38c-17.38 0-31.82 14.44-31.82 31.82 0 17.61 14.44 31.82 31.82 31.82h82.37c53.03 0 116.87 84.18 180.51 168.1 73.34 96.58 146.68 193.17 230.83 193.17h77.84v71.74c-0.44 5.43 1.36 10.84 5.43 14.9 7.67 7.44 19.62 7.44 27.08 0l52.34-52.59 52.36-52.34z m-40.16-13.31c-19.87 19.39-39.49 39.03-59.13 59.11V633.65l20.08 20.31 39.05 38.82z" fill="#ffffff" p-id="26094"></path></svg>
              <!-- 单曲循环 -->
              <svg  v-else t="1611736752677" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27371" width="30" height="30"><path d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z" p-id="27372" fill="#ffffff"></path><path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="27373" fill="#ffffff"></path></svg>
          </div>
          <div><i class="el-icon-caret-left" @click="skipBack" ></i></div>
          <div>
            <i class="el-icon-video-play" v-if="!playing" @click="play" ></i>
            <i class="el-icon-video-pause" v-if="playing"  @click="play" ></i>
          </div>
          <div><i class="el-icon-caret-right" @click="skipForward" ></i></div>
          <div><i class="el-icon-s-unfold" @click="handleList" ></i></div>
        </div>
       </div>
    </div>
    
    <!-- 音乐列表 -->
    <div class="play-audio-list" >
      <el-drawer
      size="40%"
      :show-close="false"
      :visible.sync="listShow"
      :direction="direction">
      <div class="play-audio-list-title" > 
        <div>播放列表(共7首)</div>
        <div>歌手</div>
      </div>
      <!-- 列表内容 -->
      <div class="play-audio-list-body ps">
          <div class="ap-playlist-line"
              :class="{'ap-playlist-line-active': index == i}"
              v-for="(li, i) in songList"
              @click="choseSong(li, i)"
              :key="li.id" :data-index="i">
              <div class="ap-playlist-line-name">{{li.name}}-{{li.album}}</div>
              <div class="ap-playlist-line-artist">{{li.artist}}</div>
          </div>
      </div>
    </el-drawer>
    </div>
    <!-- audio 播放器 -->
    <audio :src="song.url" id="eventAudio" ></audio>
  </div>
</template>

<script lang="ts">
let audio
export default{
    name:'soundPlayers',
    data(){
        return{
          playing: false, // 播放状态
          index: 0, // 当前播放歌曲在列表中的下标
          id: 2, // 当前播放歌曲的id（此处貌似没有用到）
          currentTime: '00:00', // 当前播放时间
          totalTime: '00:00', // 总播放时间
          bufferedScaleX: 0, // 缓存进度
          progressScaleX: 0, // 播放进度
          thumbTranslateX: 0, // 进度条滑块位置
          volume: 1, // 音量进度
          volumeX: 0, // 音量滑块位置
          thumbSlide: false, // 进度条滑块滑动时标记
          thumbVSlide: false, // 音量滑块滑动时标记
          error: '', // 报错内容
          playType: 1, // 播放类型：1-列表循环，2-随机播放，3-单曲循环
          listShow: false, // 播放列表是否展示
          direction: 'rtl', //播放列表出现方向
          /*  */
          song: { // 当前播放歌曲信息
              cover: '',
              name: '',
              artist: '',
              time: '',
              url: '',
          },
          songList: [ // 歌曲列表
              {
                  id: 1,
                  name: '童话镇',
                  time: '04:31',
                  artist: '陈一发',
                  album: '?',
                  cover: 'http://img.ytmp3.cn/image/32.jpg',
                  url: 'http://www.kaiyi.xyz/001/test/test.mp3',
              },{
                  id: 2,
                  name: '棉花糖',
                  time: '04:22',
                  artist: '徐良',
                  album: 'lvse',
                  cover: 'http://p2.music.126.net/R4ZP3AJ9xV0vvw8LX7AbMA==/109951163860425334.jpg',
                  url: 'http://www.kaiyi.xyz/001/test/test01.mp3',
              }
          ],
        }
    },
    methods: {
      // 获取数据，并放入当前播放列表
      getData() {
          this.song = this.songList[0];
          // 初始化音频的监听事件
          this.audioInit();
          // 初始化进度条与音量的鼠标滑动事件
          this.slideProgress();
          //this.slideVolume();
      },
      // 暂停与播放
      play() {
        if (this.playing) {// 播放中,点击则为暂停
            this.playing = false;
            audio.pause();
        } else { // 暂停中,点击则为播放
            this.playing = true;
            audio.play();
        }
      },
      // 上一首
      skipBack() {
          this.skipFn('skipBack');
      },
      // 下一首
      skipForward() {
          this.skipFn('skipForward');
      },
      // 选择播放方式
      chosePlayType() {
          this.playType = this.playType+1 > 3 ? 1 : this.playType+1;
      },
      //上下首封装
      skipFn(type) {
        switch (this.playType) {
          case 2: // 随机播放
            this.index = Math.floor(Math.random()*this.songList.length);
            break;
          default:
            if (type == 'skipBack') {
                this.index-1>= 0? this.index -- : 0;
            } else {
                this.index = this.index+1>= this.songList.length? this.songList.length-1: this.index+1;
            }
          break;
        }
        this.song = this.songList[this.index];
        this.playing = true;
        setTimeout(() => {
            this.totalTime = '00:00';
            audio.play();
        },100)
      },
      // 是否显示播放列表
      handleList() {
          this.listShow = !this.listShow;
      },

      // 列表选歌
      choseSong(li, i) {
          this.song = li;
          this.index = i;
          this.playing = true;
          setTimeout(() => {
              audio.play();
          },100)
      },
      // 滑动封装
      slideFn(type, thumbDom, progressLength) {
          let thumb = thumbDom;
          let _this = this;

          thumb.onmousedown = function (e) {
              // 移动时暂停播放并设置transition: none，解决在滑动结束后出现回弹的bug
              if (type == 'progress') {
                  audio.pause();
                  _this.thumbSlide = true;
              } else {
                  _this.thumbVSlide = true;
              }


              let progressL = progressLength;
              let mouseInitX = e.clientX,
                  mouseEndX = 0,
                  moveX = 0,
                  thumbInitX = _this.stringToNum(thumb.style.transform),
                  thumbEndX = 0;

              document.onmousemove = function (e) {
                  mouseEndX = e.clientX;
                  moveX = mouseEndX - mouseInitX;

                  let a = thumbInitX - 0 + moveX;
                  if (moveX > 0) {
                      thumbEndX = a > progressL ? progressL : a;
                  } else {
                      thumbEndX = a <= 0 ? 0 : a;
                  }

                  if (type == 'progress') {
                      _this.progressScaleX = thumbEndX / progressL;
                      _this.thumbTranslateX = thumbEndX;
                  } else {
                      _this.volume = thumbEndX / progressL;
                      _this.volumeX = thumbEndX;
                  }

              };

              document.onmouseup = function (e) {
                  if (type == 'progress') {
                      audio.currentTime = thumbEndX * audio.duration / progressL;
                      audio.play();
                      _this.thumbSlide = false;
                  } else {
                      audio.volume = thumbEndX / progressL;
                      _this.thumbVSlide = false;
                  }

                  document.onmousedown = null;
                  document.onmousemove = null;
                  document.onmouseup = null;
              }
          }
      },
      // 音频事件初始化
      audioInit() {
          let _this = this;
          let progressL = this.$refs.track.offsetWidth; // 进度条总长

          // 事件如果不需要可以不写

          // 音频或视频文件已经就绪可以开始，在点击播放时触发
          audio.addEventListener('play', () => {
              console.log('play');
          });

          // 浏览器开始寻找指定的音频或视频
          audio.addEventListener('loadstart', () => {
              console.log('loadstart');
              // 当前音量进度
              _this.volume = audio.volume;
              //_this.volumeX = _this.volume * _this.$refs.trackV.offsetWidth;
          });

          // 播放位置改变时触发[注意:播放和调整指示定位时都会触发]（主要事件）
          audio.addEventListener('timeupdate', () => {
              // 当前播放时间
              _this.currentTime = _this.timeToString(audio.currentTime);
              // 总播放时间
              _this.totalTime = _this.timeToString(audio.duration);
              // 当前播放进度百分比
              let precent = audio.currentTime / audio.duration  || 0;
              // 当前播放进度
              _this.progressScaleX = precent.toFixed(3);
              // 当前缓存进度
              // 已缓存时间
              let buffered = audio.buffered.length ? audio.buffered.end(audio.buffered.length-1) : 0;
              _this.bufferedScaleX = (buffered / audio.duration).toFixed(3);
              // 当前进度按钮位置
              _this.thumbTranslateX = (precent * progressL).toFixed(3);
          });
          // 音频或视频能够不停顿地一直播放
          audio.addEventListener('canplaythrough', () => {
              console.log('canplaythrough');
          });
          // 音频或视频的时长已改变
          audio.addEventListener('durationchange', () => {
              console.log('durationchange');
              _this.totalTime = _this.timeToString(audio.duration)
          });
          // 在音频或视频终止加载时触发，包括终止当前播放（未加载完）进行下一首播放时也会触发
          audio.addEventListener('abort', () => {
              console.log('abort')
          });
          // 在音频或视频加载发生错误时触发
          audio.addEventListener('error', () => {
              console.log('error');
              console.log('-----networkState---------',audio.networkState);
              console.log('-----readyState---------',audio.readyState);
              switch (audio.networkState) {
                  case '0':
                      _this.error = '尚未初始化';
                      break;
                  case '1':
                      _this.error = '正在下载数据';
                      break;
                  case '3':
                      _this.error = '未找到资源';
                      break;
              }
              audio.readyState == '0' && (_this.error = '音频地址错误');
              setTimeout(() => {
                  _this.error = '';
              },3000)
          });
          // 播放结束
          audio.addEventListener("ended", ()=> {
              console.log("ended");
              switch (_this.playType) {
                  case 1: // 列表循环
                      _this.index = _this.index+1 >= _this.songList.length ? 0 : _this.index+1;
                      break;
                  case 2: // 随机播放
                      _this.index = Math.floor(Math.random()*_this.songList.length);
                      break;
                  case 3: // 单曲循环
                      break;
              }
              _this.song = _this.songList[_this.index];
              _this.thumbSlide = true;
              // 此处需要一定的延迟让audio的dom结构获取到，额，你们自己意会或者可以试着去掉看bug
              setTimeout(() => {
                  audio.play();
              },100);
              // 解决因为transition的回弹bug
              setTimeout(() => {
                  _this.thumbSlide = false;
              }, 1000)
          }, true);
      },
      // 滑动进度条
      slideProgress() {
        // 由于滑动事件有相同代码，所以进行了简单的封装，具体原理在注释代码中。
        this.slideFn('progress', this.$refs.thumb, this.$refs.track.offsetWidth);
      },
      // 字符串转数字
      stringToNum(str) {
          return Number(str.replace(/translateX\(|px\)/g , ''))
      },
      // 秒值转字符串
      timeToString(param){
          param = parseInt(param);
          let hh:any = '',mm:any = '',ss:any = '';
          if (param>=0 && param<60) {
              param<10? ss = '0'+ param :ss = param;
              return '00:'+ ss;
          } else if (param>=60 && param<3600) {
              mm = parseInt(param / 60);
              mm<10?mm = '0'+mm :mm;
              (param-parseInt(mm * 60))<10?ss='0'+ String(param-parseInt(mm * 60)) : ss =  param-parseInt(mm * 60);
              return mm + ':' +ss;
          }
        },


      //格式化时间
			formatTime(num) {
				return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(
					Math.floor(num % 60)).length) + Math.floor(num % 60)
			},
      Controller(name){
        switch(name){
          case 'play': 
            this.playStaus = 'pause'
            this.Controller('progress')
          break;
          case 'pause':
            audio.pause()
            this.playStaus = 'play'
            window.clearInterval(this.timeClock)
            this.timeClock = null
          break;
          case 'timelong':
            audio.load();
            audio.oncanplay = (()=>{
               this.timeLong = this.formatTime(audio.duration)
            })
          break;
          case 'progress':
            audio.load();
            audio.play()
            audio.oncanplay = (()=>{
              this.timeClock = window.setInterval(()=>{
                  this.percentage = this.percentage + (100/audio.duration)
                  console.log(this.percentage)
               },1000)
            })
          break;
          default:
          break;
        }
      }
    },
    created() {
      this.src = decodeURI(this.$route.query.src) 
    },
    mounted() {
      audio = document.getElementById('eventAudio');
      this.audioInit()
      this.getData()
    }
}
</script>

<style scoped lang="less">
.sound-player{
 width: 100vw;
 height: 100vh;
 overflow: hidden;
 display: flex;
 align-items: center;
 justify-content: center;
 background: #000000;
 background: linear-gradient(180deg,#cccccc,#333333);
}
.content{
  width:80vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.content .play-box{
  width: 350px;
  height: 350px;
  border: 80px solid #000000;
  border-radius: 500px;
  .img-cover{
    width: 100%;
    border-radius: 500px;
    animation: img-cover-rotate 4s;
    -webkit-animation: img-cover-rotate 4s;
    animation-iteration-count:infinite;
    -webkit-animation-iteration-count:infinite; /*Safari and Chrome*/
    animation-timing-function:linear;
    -webkit-animation-timing-function:linear; /* Safari and Chrome */
  }
  @keyframes img-cover-rotate {
    from {transform:rotate(0deg)}
    to {transform:rotate(360deg)}
  }
}
.content .play-progress{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 60vw;
  color: white;
  margin: 10px 0;
  .play-progress-inner{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 30px;
  }
}
.content .play-con{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  color: white;
  font-size: 40px;
  margin-top: 60px;
}
/* 播放列表 */
.play-audio-list .play-audio-list-title{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:20px;
  color: #cccccc;
  background-color: rgba(black, 0.6);
}
.play-audio-list .play-audio-list-body .ap-playlist-line{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:20px;
  background-color: rgba(black, 0.4);
}
.play-audio-list .play-audio-list-body .ap-playlist-line:hover{
  background: #425961;
  color: #50c9da;
}
/*控制器综合*/
.audioplayer{
    width: 100%;
    height: 60px;
    white-space: nowrap;
    margin: 0 20px;
    color: #737A7C;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 104;
}
.audioplayer .ap-status{
    position: relative;
    margin: 0 auto;
    width: 1100px;
}
.audioplayer .ap-controller{
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
}
.audioplayer .ap-button {
    cursor: pointer;
    transition: 0.2s;
}
.audioplayer .ap-controller .ap-controller-left > *,
.audioplayer .ap-controller .ap-controller-right > * {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    vertical-align: middle;
}
svg:not(:root) {
    overflow: hidden;
}
.audioplayer svg:not(.ap-svg-exclude) {
    width: 28px;
    height: 28px;
    vertical-align: middle;
    transition: 0.2s;
}
.audioplayer .ap-progress-thumb svg{
    width: 21px;
    height: 19px;
    display: block;
    cursor: pointer;
}
.audioplayer .ap-controller .ap-controller-center .ap-buffer-bar,
.audioplayer .ap-controller .ap-controller-center .ap-progress-bar{
    position: absolute;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: transform 0.5s linear, -webkit-transform 0.5s linear;
}

/*left*/
.audioplayer .ap-controller-left .ap-cover{
    width: 60px;
    height: 60px;
    background: #E7E7E7;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    cursor: pointer;
}
.audioplayer .ap-controller-left .ap-button{
    padding: 0 8px;
}
.audioplayer .ap-controller-left .ap-skipback-button{
    margin-left: 16px;
}
.audioplayer .ap-controller-left .ap-skipforward-button{
    margin-right: 16px;
}

/*center*/
.audioplayer .ap-controller-center{
    padding: 10px 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
}
.audioplayer .ap-controller-center .ap-song-msg{

}
.audioplayer .ap-controller-center .ap-song-msg{
    display: flex;
    flex: 1;
    align-items: center;
}
.audioplayer .ap-controller-center .ap-song-msg .ap-name{
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
.audioplayer .ap-controller-center .ap-song-msg .ap-artist{
    font-size: 12px;
    margin-left: 6px;
    cursor: default;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
.audioplayer .ap-controller-center .ap-song-msg .ap-time{
    font-size: 12px;
    flex: 1;
    text-align: right;
    cursor: default;
    min-width: 110px;
}
.audioplayer .ap-controller-center .ap-song-msg .ap-time .ap-current-time{
    color: #fff;
}
.audioplayer .ap-controller-center .ap-progress-line{
    flex: 1;
    display: flex;
    align-items: center;
}
.audioplayer .ap-controller-center .ap-play-track{
    position: relative;
    width: 100%;
    height: 3px;
}
.audioplayer .ap-controller-center .ap-play-bar-wrap{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 1.5px;
    overflow: hidden;
    background: #909090;
}
.audioplayer .ap-controller-center .ap-buffer-bar{
    background: rgba(50, 176, 218, 0.47);
}
.audioplayer .ap-controller-center .ap-progress-bar{
    background: #32B0DA;;
}
.audioplayer .ap-controller .ap-controller-center .ap-progress-thumb{
    transition: -webkit-transform 0.5s linear;
    transition: transform 0.5s linear;
    transition: transform 0.5s linear, -webkit-transform 0.5s linear;
    position: absolute;
    top: -5px;
    left: -4px;
}

/*right*/
.audioplayer .ap-controller-right {
    width: 360px;
    padding: 0 20px;
}
.audioplayer .ap-controller-right .ap-line {
    font-size: 24px;
    padding: 0 8px;
    cursor: default;
}
.audioplayer .ap-controller-right .ap-button {
    padding: 0 8px;
}
.audioplayer .ap-controller-right .ap-volume-line {
    width: 86px;
    margin-right: 8px;
    height: 28px;
}
.audioplayer .ap-controller-right .ap-line-draw {
    height: 24px;
    width: 1px;
    background: #979797;
}
.audioplayer .ap-controller-right .ap-volume-track {
    position: relative;
    width: 100%;
    height: 3px;
}
.audioplayer .ap-controller-right .ap-volume-bar-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 1.5px;
    overflow: hidden;
    background: #909090;
}
.audioplayer .ap-controller-right .ap-volume-bar {
    position: absolute;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #32B0DA;
}
.audioplayer .ap-controller-right .ap-volume-thumb {
    position: absolute;
    top: -4px;
    left: -6px;
    cursor: pointer;
}
.audioplayer .ap-controller-right .ap-volume-thumb-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #32B0DA;
    -webkit-transform: scale(0);
    transform: scale(0);
    transition: 0.2s;
}
.audioplayer .ap-controller-right .ap-volume-line:hover .ap-volume-thumb-dot{
    transform: scale(1);
}
.audioplayer .ap-controller-right .ap-playlist-button-bg {
    background: #4A5355;
    height: 28px;
    border-radius: 14px;
    padding: 0 8px 0 6px;
}
.audioplayer .ap-controller-right .ap-playlist-button-amount {
    color: #fff;
    font-size: 12px;
    vertical-align: middle;
    transition: 0.2s;
}


/*提示区*/
.audioplayer .ap-toast {
    position: absolute;
    bottom: 72px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    color: #fff;
    opacity: 1;
    pointer-events: none;
    transition: 0.3s;
}
.audioplayer .ap-toast-hide {
    opacity: 0;
    -webkit-transform: translate(-50%, 12px);
    transform: translate(-50%, 12px);
}
</style>
