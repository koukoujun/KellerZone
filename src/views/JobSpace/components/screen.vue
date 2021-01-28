<template>
  <div class="code-screen">
    <input type="checkbox" id="switch" checked>
    <div class="container">
        <div class="screen" v-if="show_bool == true" >
            <h1>{{msg_row_one}}</h1>
            <h1>{{msg_row_tow}}</h1>
            <h1>{{msg_row_three}}</h1>
            <h1>{{msg_row_four}}</h1>
        </div>
        <div class="content_show" v-if="show_bool == false" >
            <p v-html="content_show.content_c"></p>
            <p v-html="content_show.content_e"></p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
export default{
    name:'code-screen',
    data(){
        return{
            show_bool:true,
            msg_row_one:'Have you ever thought about it?',
            msg_row_tow:'The world, yes, the world.It is actually made up of code, so crazy!',
            msg_row_three:'Welcome to the club,Every traveler.',
            msg_row_four:'The digital world',
        }
    },
    props:{
     content_show:Object
    },
    watch:{
      content_show(val){
          console.log(val)
      }
    },
    methods:{
       //Controller
       Controller(name){
           switch(name){
               case 'content_show':
                   this.show_bool = false
               break;
               default:
               break;
           }
       }
    }
}
</script>

<style scoped lang="less">
// 自定义颜色
@color-bg:#333333;
@color-content:rgba(73, 142, 199, 0.6);
@color-text:rgba(73, 142, 199, 1);
@color-border:rgba(73, 142, 199, 0.2);
.code-screen{
    color: @color-text;
}
#switch {
    display: none;
}
.switch-label {
    display: inline-block;
    cursor: pointer;
    background: transparent;
    color: #eee;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    margin-top: 10px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
}
.switch-label::after {
    content: "on";
}
.switch-label::before {
    content: " ";
    display: inline-block;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    margin-right: 10px;
}
.switch-label:active {
    box-shadow: none;
    -webkit-transform: translate3d(0, 2px, 0);
    transform: translate3d(0, 2px, 0);
}
#switch:checked + .switch-label::after {
    content: "off";
}
@-webkit-keyframes flicker {
    0% {
        opacity: 0.83134;
    }
    5% {
        opacity: 0.02757;
    }
    10% {
        opacity: 0.2701;
    }
    15.0% {
        opacity: 0.64369;
    }
    20% {
        opacity: 0.65636;
    }
    25% {
        opacity: 0.85513;
    }
    30.0% {
        opacity: 0.80518;
    }
    35% {
        opacity: 0.69211;
    }
    40% {
        opacity: 0.0534;
    }
    45% {
        opacity: 0.86271;
    }
    50% {
        opacity: 0.30548;
    }
    55.0% {
        opacity: 0.68351;
    }
    60.0% {
        opacity: 0.0919;
    }
    65% {
        opacity: 0.87972;
    }
    70% {
        opacity: 0.97815;
    }
    75% {
        opacity: 0.46976;
    }
    80% {
        opacity: 0.26084;
    }
    85.0% {
        opacity: 0.32923;
    }
    90% {
        opacity: 0.14766;
    }
    95% {
        opacity: 0.47582;
    }
    100% {
        opacity: 0.61721;
    }
}
@keyframes flicker {
    0% {
        opacity: 0.83134;
    }
    5% {
        opacity: 0.02757;
    }
    10% {
        opacity: 0.2701;
    }
    15.0% {
        opacity: 0.64369;
    }
    20% {
        opacity: 0.65636;
    }
    25% {
        opacity: 0.85513;
    }
    30.0% {
        opacity: 0.80518;
    }
    35% {
        opacity: 0.69211;
    }
    40% {
        opacity: 0.0534;
    }
    45% {
        opacity: 0.86271;
    }
    50% {
        opacity: 0.30548;
    }
    55.0% {
        opacity: 0.68351;
    }
    60.0% {
        opacity: 0.0919;
    }
    65% {
        opacity: 0.87972;
    }
    70% {
        opacity: 0.97815;
    }
    75% {
        opacity: 0.46976;
    }
    80% {
        opacity: 0.26084;
    }
    85.0% {
        opacity: 0.32923;
    }
    90% {
        opacity: 0.14766;
    }
    95% {
        opacity: 0.47582;
    }
    100% {
        opacity: 0.61721;
    }
}
.container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
}
.container::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
}
.container::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: -webkit-linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), -webkit-linear-gradient(0deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
}
#switch:checked ~ .container::after {
    -webkit-animation: flicker 0.15s infinite;
    animation: flicker 0.15s infinite;
}
@-webkit-keyframes turn-on {
    0% {
        -webkit-transform: scale(1, 0.8) translate3d(0, 0, 0);
        transform: scale(1, 0.8) translate3d(0, 0, 0);
        -webkit-filter: brightness(30);
        filter: brightness(30);
        opacity: 1;
    }
    3.5% {
        -webkit-transform: scale(1, 0.8) translate3d(0, 100%, 0);
        transform: scale(1, 0.8) translate3d(0, 100%, 0);
    }
    3.6% {
        -webkit-transform: scale(1, 0.8) translate3d(0, -100%, 0);
        transform: scale(1, 0.8) translate3d(0, -100%, 0);
        opacity: 1;
    }
    9% {
        -webkit-transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
        transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
        -webkit-filter: brightness(30);
        filter: brightness(30);
        opacity: 0;
    }
    11% {
        -webkit-transform: scale(1, 1) translate3d(0, 0, 0);
        transform: scale(1, 1) translate3d(0, 0, 0);
        -webkit-filter: contrast(0) brightness(0);
        filter: contrast(0) brightness(0);
        opacity: 0;
    }
    100% {
        -webkit-transform: scale(1, 1) translate3d(0, 0, 0);
        transform: scale(1, 1) translate3d(0, 0, 0);
        -webkit-filter: contrast(1) brightness(1.1) saturate(1.1);
        filter: contrast(1) brightness(1.1) saturate(1.1);
        opacity: 1;
    }
}
@keyframes turn-on {
    0% {
        -webkit-transform: scale(1, 0.8) translate3d(0, 0, 0);
        transform: scale(1, 0.8) translate3d(0, 0, 0);
        -webkit-filter: brightness(30);
        filter: brightness(30);
        opacity: 1;
    }
    3.5% {
        -webkit-transform: scale(1, 0.8) translate3d(0, 100%, 0);
        transform: scale(1, 0.8) translate3d(0, 100%, 0);
    }
    3.6% {
        -webkit-transform: scale(1, 0.8) translate3d(0, -100%, 0);
        transform: scale(1, 0.8) translate3d(0, -100%, 0);
        opacity: 1;
    }
    9% {
        -webkit-transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
        transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
        -webkit-filter: brightness(30);
        filter: brightness(30);
        opacity: 0;
    }
    11% {
        -webkit-transform: scale(1, 1) translate3d(0, 0, 0);
        transform: scale(1, 1) translate3d(0, 0, 0);
        -webkit-filter: contrast(0) brightness(0);
        filter: contrast(0) brightness(0);
        opacity: 0;
    }
    100% {
        -webkit-transform: scale(1, 1) translate3d(0, 0, 0);
        transform: scale(1, 1) translate3d(0, 0, 0);
        -webkit-filter: contrast(1) brightness(1.1) saturate(1.1);
        filter: contrast(1) brightness(1.1) saturate(1.1);
        opacity: 1;
    }
}
@-webkit-keyframes turn-off {
    0% {
        -webkit-transform: scale(1, 1.3) translate3d(0, 0, 0);
        transform: scale(1, 1.3) translate3d(0, 0, 0);
        -webkit-filter: brightness(1);
        filter: brightness(1);
        opacity: 1;
    }
    60% {
        -webkit-transform: scale(1.3, 0.001) translate3d(0, 0, 0);
        transform: scale(1.3, 0.001) translate3d(0, 0, 0);
        -webkit-filter: brightness(10);
        filter: brightness(10);
    }
    100% {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: scale(0, 0.0001) translate3d(0, 0, 0);
        transform: scale(0, 0.0001) translate3d(0, 0, 0);
        -webkit-filter: brightness(50);
        filter: brightness(50);
    }
}
@keyframes turn-off {
    0% {
        -webkit-transform: scale(1, 1.3) translate3d(0, 0, 0);
        transform: scale(1, 1.3) translate3d(0, 0, 0);
        -webkit-filter: brightness(1);
        filter: brightness(1);
        opacity: 1;
    }
    60% {
        -webkit-transform: scale(1.3, 0.001) translate3d(0, 0, 0);
        transform: scale(1.3, 0.001) translate3d(0, 0, 0);
        -webkit-filter: brightness(10);
        filter: brightness(10);
    }
    100% {
        -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
        -webkit-transform: scale(0, 0.0001) translate3d(0, 0, 0);
        transform: scale(0, 0.0001) translate3d(0, 0, 0);
        -webkit-filter: brightness(50);
        filter: brightness(50);
    }
}
.screen {
    width: 100%;
    height: 100%;
    border: none;
    padding-top:10%;
    font-size:30px;
}
#switch ~ .container > .screen {
    -webkit-animation: turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1);
    animation: turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
#switch:checked ~ .container > .screen {
    -webkit-animation: turn-on 4s linear;
    animation: turn-on 4s linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
.content_show{
    width: 80%;
    height: 100%;
    border: none;
    padding-top:10%;
    padding-left:10%;
    font-size:24px;
    text-align: left;
}
#switch ~ .container > .content_show {
    -webkit-animation: turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1);
    animation: turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
#switch:checked ~ .container > .content_show {
    -webkit-animation: turn-on 4s linear;
    animation: turn-on 4s linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}
</style>
