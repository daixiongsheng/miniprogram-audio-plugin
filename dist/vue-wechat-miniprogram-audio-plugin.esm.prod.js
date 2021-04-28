/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t=function(){return(t=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};var e,i={_from:"dxs-utils",_id:"dxs-utils@0.0.8",_inBundle:!1,_integrity:"sha1-L1OHmZL5eboI4S1Uz1AoVOaQPIg=",_location:"/dxs-utils",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"dxs-utils",name:"dxs-utils",escapedName:"dxs-utils",rawSpec:"",saveSpec:null,fetchSpec:"latest"},_requiredBy:["#DEV:/","#USER"],_resolved:"https://registry.nlark.com/dxs-utils/download/dxs-utils-0.0.8.tgz",_shasum:"2f53879992f979ba08e12d54cf502854e6903c88",_spec:"dxs-utils",_where:"/Users/bjhl/Documents/project/mini-program-audio-vue-plugin",author:{name:"daixiongsheng"},bugs:{url:"https://github.com/daixiongsheng/utils/issues"},bundleDependencies:!1,dependencies:{},deprecated:!1,description:"常用工具方法集",devDependencies:{"@babel/core":"^7.13.10","@babel/preset-env":"^7.13.12","@rollup/plugin-commonjs":"^18.0.0","@rollup/plugin-json":"^4.1.0","@rollup/plugin-node-resolve":"^11.2.1","@rollup/plugin-replace":"^2.4.2","@types/jest":"^26.0.22","@typescript-eslint/eslint-plugin":"^4.21.0","@typescript-eslint/parser":"^4.21.0","babel-jest":"^26.6.3",brotli:"^1.3.2",chalk:"^4.1.0",eslint:"^7.23.0",jest:"^26.6.3",rollup:"^2.43.1","rollup-plugin-node-builtins":"^2.1.2","rollup-plugin-node-globals":"^1.4.0","rollup-plugin-terser":"^7.0.2","rollup-plugin-typescript2":"^0.30.0","ts-jest":"^26.5.4","ts-node":"^9.1.1",typescript:"^4.2.4",vuepress:"^1.8.2"},files:["src","index.js","dist/*.js","types/*.d.ts"],homepage:"https://daixiongsheng.github.io/utils",keywords:["utils"],license:"MIT",main:"index.js",name:"dxs-utils",repository:{type:"git",url:"git+https://github.com/daixiongsheng/utils.git"},scripts:{build:"node scripts/build.js",coverage:"jest --coverage",dev:"rollup -c --watch","docs:build":"vuepress build docs","docs:dev":"vuepress dev docs",guide:"node scripts/guide.js",lint:"eslint --ext .ts,.js src",prettier:"prettier --write '{{docs,src,test,scripts}/**/*.{js,ts,less,md,json},index.js,jest.config.js,rollup.config.js}'",rollup:"rollup -c",test:"jest"},typings:"types/index.d.ts",version:"0.0.8"},n=(function(t){const{name:e}=i;t.exports=function(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}(`./dist/${e}.cjs.dev.js`)}(e={exports:{}},e.exports),e.exports);if("undefined"==typeof wx)throw new Error("只支持在微信小程序使用");var o="ios"===wx.getSystemInfoSync().platform,s=function(){},r=0,u=function(){function t(e){var i=this;void 0===e&&(e={}),this.listener=new s,this.onPlayCallback=function(){i.listener.$emit(t.ON_PLAY)},this.onStopCallback=function(){i.listener.$emit(t.ON_STOP)},this.onPauseCallback=function(){i.listener.$emit(t.ON_PAUSE)},this.onEndedCallback=function(){i.isPlaying=!1,i.listener.$emit(t.ON_ENDED)},this.onCanplay=function(){},this.onTimeUpdateCallback=function(){var e=i.audio;i.listener.$emit(t.ON_TIME_UPDATE,e.currentTime,e.duration)},this.onError=function(e){i.isPlaying=!1,i.listener.$emit(t.ON_ERROR,e)},this.onSeeking=function(){},this.onSeeked=function(){},this.onAudioInterruptionEnd=function(){},this.onAudioInterruptionBegin=function(){},this.id=++r;var n=e.keepAlive,u=e.onPlayCallback,a=e.onPauseCallback,l=e.onStopCallback,p=e.onEndedCallback,c=e.onTimeUpdateCallback,d=e.onError;u&&this.listener.$on(t.ON_PLAY,u),a&&this.listener.$on(t.ON_PAUSE,a),l&&this.listener.$on(t.ON_STOP,l),p&&this.listener.$on(t.ON_ENDED,p),d&&this.listener.$on(t.ON_ERROR,d),c&&this.listener.$on(t.ON_TIME_UPDATE,c),this.options=Object.assign({src:"",keepAlive:!1,independent:!1,autoplay:!1,loop:!1,volume:1,playbackRate:1},e),this.isPlaying=!1,this.duration=0,this.currentTime=0,this.audio=wx.createInnerAudioContext(),this.initAudio(),n&&o&&(this.timer=setInterval((function(){i.isPlaying&&i.paused&&i.playAudio()}),t.TIMER_DELAY))}return Object.defineProperty(t.prototype,"paused",{get:function(){return this.audio.paused},enumerable:!1,configurable:!0}),t.prototype.initAudio=function(){this.audio.onCanplay(this.onCanplay),this.audio.onPlay(this.onPlayCallback),this.audio.onPause(this.onPauseCallback),this.audio.onStop(this.onStopCallback),this.audio.onEnded(this.onEndedCallback),this.audio.onTimeUpdate(this.onTimeUpdateCallback),this.audio.onError(this.onError),this.audio.onSeeking(this.onSeeking),this.audio.onSeeked(this.onSeeked),this.audio.onAudioInterruptionEnd(this.onAudioInterruptionEnd),this.audio.onAudioInterruptionBegin(this.onAudioInterruptionBegin),this.audio.autoplay=this.options.autoplay,this.options.autoplay&&this.options.src&&this.playAudio(this.options.src)},t.prototype.playAudio=function(t){if(t&&t!==this.options.src&&this.listener.$off(),t||!this.options.src||!this.isPlaying||this.paused){if(this.audio.src=this.options.src=t||this.options.src,!this.options.src)throw new Error("src is required");this.duration=this.audio.duration,this.audio.loop=this.options.loop,this.audio.volume=this.options.volume,this.audio.play(),this.isPlaying=!0}},t.prototype.stopAudio=function(){this.isPlaying=!1,this.audio.stop()},t.prototype.pauseAudio=function(){this.isPlaying=!1,this.audio.pause()},t.prototype.destroy=function(){this.isPlaying=!1,this.listener.$destroy(),this.timer&&clearInterval(this.timer),this.audio.destroy()},t.prototype.play=function(e){return e&&this.listener.$once(t.ON_PLAY,e),this},t.prototype.stop=function(e){return e&&this.listener.$once(t.ON_STOP,e),this},t.prototype.end=function(e){return e&&this.listener.$once(t.ON_ENDED,e),this},t.prototype.pause=function(e){return e&&this.listener.$once(t.ON_PAUSE,e),this},t.prototype.timeupdate=function(e){return e&&this.listener.$once(t.ON_TIME_UPDATE,e),this},t.prototype.changeVolume=function(t){if(t<0||t>1)throw new Error("音量值错误");this.audio.volume=t,this.options.volume=t},t.prototype.changePlayRate=function(t){if(t<.5||t>2)throw new Error("音频播放值错误");this.audio.playbackRate=t,this.options.playbackRate=t},t.ON_PLAY="ON_PLAY",t.ON_PAUSE="ON_PAUSE",t.ON_ENDED="ON_ENDED",t.ON_STOP="ON_STOP",t.ON_ERROR="ON_ERROR",t.ON_TIME_UPDATE="ON_TIME_UPDATE",t.TIMER_DELAY=300,t}(),a={src:"",independent:!1,keepAlive:!1},l=0;function p(t,e){var i=function(t){return void 0===t&&(t=e),i.playAudio(t),i};return i.stop=function(e){return t.stop(e),i},i.play=function(e){return t.play(e),i},i.end=function(e){return t.end(e),i},i.pause=function(e){return t.pause(e),i},i.pauseAudio=function(){return t.pauseAudio(),i},i.stopAudio=function(){return t.stopAudio(),i},i.playAudio=function(n){return void 0===n&&(n=e),t.playAudio(n),i},i.changeVolume=function(e){return t.changePlayRate(e),i},i.changePlayRate=function(e){return t.changePlayRate(e),i},i}var c=0;function d(t,e){var i=Object.keys(t),n=[],o=[],s=Object.keys(e);s.forEach((function(t){return!i.includes(t)&&(e[t].independent||e[t].keepAlive?o.push(t):n.push(t),!0)}));var r={};return o.forEach((function(i){r[i]=function(t,e,i){var n=new u(t);return e[i]=n,p(n,t.src)}(e[i],t,i)})),n.length&&c++,n.forEach((function(i){r[i]=function(t,e,i){return p(e[i]||(e[i]=new u),t.src)}(e[i],t,"shared"+c)})),1===(s=Object.keys(r)).length?r[s[0]]:r}function h(e){if(!this._isVue)throw new Error("目前只支持在vue中使用");if(void 0===e)throw new Error("options is required");if(!n.isObject(e)||"string"!=typeof e)throw new Error("options must be an object or a src string");if(n.isObject(e)&&!Object.keys(e).length)throw new Error('options cannot be an empty object, must include one of "src loop autoplay"');return d(this.$audioInstances||(this.$audioInstances={}),function(e){var i,o,s={},r=Object.keys(e);return"string"==typeof e?((i={})["default"+l++]=t(t({},a),{src:e}),i):r.includes("src")||r.includes("autoplay")||r.includes("loop")||r.includes("volume")?((o={})["default"+l++]=t(t({},a),e),o):(r.forEach((function(i){var o=e[i];if("string"==typeof o)s[i]=t(t({},a),{src:o});else if(n.isObject(o)){if(!Object.keys(o).length)throw new Error('options cannot be a empty object, must include one of "src loop autoplay"');s[i]=t(t({},a),o)}})),s)}(e))}function f(t){s=t,Object.defineProperty(t.prototype,"$newAudio",{configurable:!1,enumerable:!1,get:function(){return h},set:function(){throw new Error("$newAudio cannot be modify")}}),t.mixin({beforeDestroy:function(){var t=this;this.$audioInstances&&(Object.keys(this.$audioInstances).forEach((function(e){var i=t.$audioInstances[e];i.destroy(),delete i[e]})),this.$audioInstances=null)}})}export default f;