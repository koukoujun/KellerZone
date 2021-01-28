<template>
  <div class="sound-player">
    <div class="content" >
       <div class="play-box" >
          <img class="img-cover" src="@/assets/img/head.jpg" alt="">
       </div>
       <div class="play-tab" >
        <div class="play-progress" >
          <div>00:00</div>
          <div class="play-progress-inner" ><el-progress :percentage="percentage" :show-text='false' style="width:60vw" ></el-progress></div>
          <div>{{timeLong}}</div>
        </div>
        <div class="play-con" >
          <div><i class="el-icon-refresh-right" ></i></div>
          <div><i class="el-icon-caret-left" ></i></div>
          <div>
            <i class="el-icon-video-play" v-if="playStaus=='play'" @click="Controller('play')" ></i>
            <i class="el-icon-video-pause" v-if="playStaus=='pause'"  @click="Controller('pause')" ></i>
          </div>
          <div><i class="el-icon-caret-right" ></i></div>
          <div><i class="el-icon-s-unfold" ></i></div>
        </div>
       </div>
    </div>
    <!--  -->
    <audio :src="src" id="eventAudio" ></audio>
  </div>
</template>

<script lang="ts">
let audio
export default{
    name:'soundPlayers',
    data(){
        return{
          playStaus:'play',//播放器状态
          src:'00:00',//文件资源地址
          timeLong:'',//音频总时长
          percentage:0,//当前进度
          timeClock:null,//计时器
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
          this.slideVolume();
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
      audio.setAttribute('src',this.src);
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
  text-align:start;
  width: 100%;
  color: white;
  margin: 10px 0;
  .play-progress-inner{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }
}
.content .play-con{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  color: white;
  font-size: 60px;
  margin: 20px 0;
}

</style>
