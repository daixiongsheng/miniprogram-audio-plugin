/*!
 * miniprogram-audio-plugin v0.0.1
 * (c) 2020-2021 Xiongsheng Dai
 * Released under the MIT License.
 */
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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var require$$0 = {
	_from: "dxs-utils",
	_id: "dxs-utils@0.0.8",
	_inBundle: false,
	_integrity: "sha1-L1OHmZL5eboI4S1Uz1AoVOaQPIg=",
	_location: "/dxs-utils",
	_phantomChildren: {
	},
	_requested: {
		type: "tag",
		registry: true,
		raw: "dxs-utils",
		name: "dxs-utils",
		escapedName: "dxs-utils",
		rawSpec: "",
		saveSpec: null,
		fetchSpec: "latest"
	},
	_requiredBy: [
		"#DEV:/",
		"#USER"
	],
	_resolved: "https://registry.nlark.com/dxs-utils/download/dxs-utils-0.0.8.tgz",
	_shasum: "2f53879992f979ba08e12d54cf502854e6903c88",
	_spec: "dxs-utils",
	_where: "/Users/bjhl/Documents/project/mini-program-audio-vue-plugin",
	author: {
		name: "daixiongsheng"
	},
	bugs: {
		url: "https://github.com/daixiongsheng/utils/issues"
	},
	bundleDependencies: false,
	dependencies: {
	},
	deprecated: false,
	description: "常用工具方法集",
	devDependencies: {
		"@babel/core": "^7.13.10",
		"@babel/preset-env": "^7.13.12",
		"@rollup/plugin-commonjs": "^18.0.0",
		"@rollup/plugin-json": "^4.1.0",
		"@rollup/plugin-node-resolve": "^11.2.1",
		"@rollup/plugin-replace": "^2.4.2",
		"@types/jest": "^26.0.22",
		"@typescript-eslint/eslint-plugin": "^4.21.0",
		"@typescript-eslint/parser": "^4.21.0",
		"babel-jest": "^26.6.3",
		brotli: "^1.3.2",
		chalk: "^4.1.0",
		eslint: "^7.23.0",
		jest: "^26.6.3",
		rollup: "^2.43.1",
		"rollup-plugin-node-builtins": "^2.1.2",
		"rollup-plugin-node-globals": "^1.4.0",
		"rollup-plugin-terser": "^7.0.2",
		"rollup-plugin-typescript2": "^0.30.0",
		"ts-jest": "^26.5.4",
		"ts-node": "^9.1.1",
		typescript: "^4.2.4",
		vuepress: "^1.8.2"
	},
	files: [
		"src",
		"index.js",
		"dist/*.js",
		"types/*.d.ts"
	],
	homepage: "https://daixiongsheng.github.io/utils",
	keywords: [
		"utils"
	],
	license: "MIT",
	main: "index.js",
	name: "dxs-utils",
	repository: {
		type: "git",
		url: "git+https://github.com/daixiongsheng/utils.git"
	},
	scripts: {
		build: "node scripts/build.js",
		coverage: "jest --coverage",
		dev: "rollup -c --watch",
		"docs:build": "vuepress build docs",
		"docs:dev": "vuepress dev docs",
		guide: "node scripts/guide.js",
		lint: "eslint --ext .ts,.js src",
		prettier: "prettier --write '{{docs,src,test,scripts}/**/*.{js,ts,less,md,json},index.js,jest.config.js,rollup.config.js}'",
		rollup: "rollup -c",
		test: "jest"
	},
	typings: "types/index.d.ts",
	version: "0.0.8"
};

var dxsUtils = createCommonjsModule(function (module) {
const { name } = require$$0;
{
  module.exports = commonjsRequire(`./dist/${name}.cjs.dev.js`);
}
});

if (typeof wx === 'undefined') {
    throw new Error('只支持在微信小程序使用');
}
var VueConstructor = function () { };
var i = 0;
var AudioPlugin = /** @class */ (function () {
    function AudioPlugin(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.listener = new VueConstructor();
        this.onPlayCallback = function () {
            _this.listener.$emit(AudioPlugin.ON_PLAY);
        };
        this.onStopCallback = function () {
            _this.listener.$emit(AudioPlugin.ON_STOP);
        };
        this.onPauseCallback = function () {
            _this.listener.$emit(AudioPlugin.ON_PAUSE);
        };
        this.onEndedCallback = function () {
            _this.isPlaying = false;
            _this.listener.$emit(AudioPlugin.ON_ENDED);
        };
        this.onCanplay = function () { };
        this.onTimeUpdateCallback = function () {
            var _a = _this.audio, currentTime = _a.currentTime, duration = _a.duration;
            _this.listener.$emit(AudioPlugin.ON_TIME_UPDATE, currentTime, duration);
        };
        this.onError = function (res) {
            _this.isPlaying = false;
            _this.listener.$emit(AudioPlugin.ON_ERROR, res);
        };
        this.onSeeking = function () { };
        this.onSeeked = function () { };
        this.onAudioInterruptionEnd = function () {
            // 音频中断事件
            if (_this.isPlaying && _this.audio.paused) {
                _this.audio.play();
            }
        };
        this.onAudioInterruptionBegin = function () {
            // 音频中断事件
        };
        if (!dxsUtils.isObject(options)) {
            throw new Error('options must be an object');
        }
        this.id = ++i;
        var defaultOptions = {
            src: '',
            independent: false,
            autoplay: false,
            loop: false,
            volume: 1,
            playbackRate: 1,
        };
        var 
        /** 音频播放事件 */
        onPlayCallback = options.onPlayCallback, 
        /** 音频暂停事件 */
        onPauseCallback = options.onPauseCallback, 
        /** 音频停止事件 */
        onStopCallback = options.onStopCallback, 
        /** 音频自然播放结束事件 */
        onEndedCallback = options.onEndedCallback, 
        /** 音频播放进度更新事件 */
        onTimeUpdateCallback = options.onTimeUpdateCallback, 
        /** 音频播放错误事件 */
        onError = options.onError;
        // 事件注册
        onPlayCallback && this.listener.$on(AudioPlugin.ON_PLAY, onPlayCallback);
        onPauseCallback && this.listener.$on(AudioPlugin.ON_PAUSE, onPauseCallback);
        onStopCallback && this.listener.$on(AudioPlugin.ON_STOP, onStopCallback);
        onEndedCallback && this.listener.$on(AudioPlugin.ON_ENDED, onEndedCallback);
        onError && this.listener.$on(AudioPlugin.ON_ERROR, onError);
        onTimeUpdateCallback &&
            this.listener.$on(AudioPlugin.ON_TIME_UPDATE, onTimeUpdateCallback);
        this.options = Object.assign(defaultOptions, options);
        this.isPlaying = false;
        this.duration = 0;
        this.currentTime = 0;
        this.audio = wx.createInnerAudioContext();
        this.initAudio();
    }
    Object.defineProperty(AudioPlugin.prototype, "paused", {
        get: function () {
            return this.audio.paused;
        },
        enumerable: false,
        configurable: true
    });
    AudioPlugin.prototype.initAudio = function () {
        this.audio.onCanplay(this.onCanplay);
        this.audio.onPlay(this.onPlayCallback);
        this.audio.onPause(this.onPauseCallback);
        this.audio.onStop(this.onStopCallback);
        this.audio.onEnded(this.onEndedCallback);
        this.audio.onTimeUpdate(this.onTimeUpdateCallback);
        this.audio.onError(this.onError);
        this.audio.onSeeking(this.onSeeking);
        this.audio.onSeeked(this.onSeeked);
        wx.onAudioInterruptionEnd(this.onAudioInterruptionEnd);
        wx.onAudioInterruptionBegin(this.onAudioInterruptionBegin);
        this.audio.autoplay = this.options.autoplay;
        this.audio.loop = this.options.loop;
        this.audio.playbackRate = this.options.playbackRate;
        this.audio.volume = this.options.volume;
        if (this.options.autoplay && this.options.src) {
            this.playAudio(this.options.src);
        }
    };
    AudioPlugin.prototype.playAudio = function (src) {
        if (src && src !== this.options.src) {
            this.listener.$off();
        }
        if (!src && this.options.src && this.isPlaying && !this.paused) {
            return;
        }
        this.audio.src = this.options.src = src || this.options.src;
        if (!this.options.src) {
            throw new Error('src is required');
        }
        this.duration = this.audio.duration;
        this.audio.play();
        this.isPlaying = true;
    };
    AudioPlugin.prototype.stopAudio = function () {
        this.isPlaying = false;
        this.audio.stop();
    };
    AudioPlugin.prototype.pauseAudio = function () {
        this.isPlaying = false;
        this.audio.pause();
    };
    AudioPlugin.prototype.destroy = function () {
        this.isPlaying = false;
        this.listener.$destroy();
        this.timer && clearInterval(this.timer);
        this.audio.destroy();
    };
    AudioPlugin.prototype.play = function (callback) {
        callback && this.listener.$once(AudioPlugin.ON_PLAY, callback);
        return this;
    };
    AudioPlugin.prototype.stop = function (callback) {
        callback && this.listener.$once(AudioPlugin.ON_STOP, callback);
        return this;
    };
    AudioPlugin.prototype.end = function (callback) {
        callback && this.listener.$once(AudioPlugin.ON_ENDED, callback);
        return this;
    };
    AudioPlugin.prototype.pause = function (callback) {
        callback && this.listener.$once(AudioPlugin.ON_PAUSE, callback);
        return this;
    };
    AudioPlugin.prototype.timeupdate = function (callback) {
        callback && this.listener.$once(AudioPlugin.ON_TIME_UPDATE, callback);
        return this;
    };
    AudioPlugin.prototype.changeVolume = function (volume) {
        if (volume < 0 || volume > 1) {
            throw new Error('音量值错误');
        }
        this.audio.volume = volume;
        this.options.volume = volume;
    };
    AudioPlugin.prototype.changePlayRate = function (rate) {
        if (rate < 0.5 || rate > 2) {
            throw new Error('音频播放值错误');
        }
        this.audio.playbackRate = rate;
        this.options.playbackRate = rate;
    };
    AudioPlugin.ON_PLAY = 'ON_PLAY';
    AudioPlugin.ON_PAUSE = 'ON_PAUSE';
    AudioPlugin.ON_ENDED = 'ON_ENDED';
    AudioPlugin.ON_STOP = 'ON_STOP';
    AudioPlugin.ON_ERROR = 'ON_ERROR';
    AudioPlugin.ON_TIME_UPDATE = 'ON_TIME_UPDATE';
    return AudioPlugin;
}());
var defaultOptions = {
    src: '',
    independent: false,
};
var defaultId = 0;
function dealOptions(options) {
    var _a, _b;
    var o = {};
    var keys = Object.keys(options);
    if (typeof options === 'string') {
        return _a = {},
            _a["default" + defaultId++] = __assign(__assign({}, defaultOptions), { src: options, independent: true }),
            _a;
    }
    if (keys.includes('src') ||
        keys.includes('autoplay') ||
        keys.includes('loop') ||
        keys.includes('volume')) {
        return _b = {},
            _b["default" + defaultId++] = __assign(__assign(__assign({}, defaultOptions), options), { independent: true }),
            _b;
    }
    keys.forEach(function (key) {
        var value = options[key];
        if (typeof value === 'string') {
            o[key] = __assign(__assign({}, defaultOptions), { src: value });
        }
        else if (dxsUtils.isObject(value)) {
            if (!Object.keys(value).length) {
                throw new Error('options cannot be a empty object, must include one of "src loop autoplay"');
            }
            o[key] = __assign(__assign({}, defaultOptions), value);
        }
    });
    return o;
}
function createProxyInstance(audio, _src) {
    var fun = function (src) {
        if (src === void 0) { src = _src; }
        fun.playAudio(src);
        return fun;
    };
    fun.stop = function stop(callback) {
        audio.stop(callback);
        return fun;
    };
    fun.play = function play(callback) {
        audio.play(callback);
        return fun;
    };
    fun.end = function end(callback) {
        audio.end(callback);
        return fun;
    };
    fun.pause = function pause(callback) {
        audio.pause(callback);
        return fun;
    };
    fun.pauseAudio = function pauseAudio() {
        audio.pauseAudio();
        return fun;
    };
    fun.stopAudio = function stopAudio() {
        audio.stopAudio();
        return fun;
    };
    fun.playAudio = function playAudio(src) {
        if (src === void 0) { src = _src; }
        audio.playAudio(src);
        return fun;
    };
    fun.changeVolume = function changeVolume(volume) {
        audio.changePlayRate(volume);
        return fun;
    };
    fun.changePlayRate = function changePlayRate(rate) {
        audio.changePlayRate(rate);
        return fun;
    };
    return fun;
}
function createIndependentAudio(options, ins, key) {
    var audio = new AudioPlugin(options);
    ins[key] = audio;
    return createProxyInstance(audio, options.src);
}
var sharedAudioId = 0;
function createSharedAudio(options, ins, shareKey) {
    var audio = ins[shareKey] || (ins[shareKey] = new AudioPlugin());
    return createProxyInstance(audio, options.src);
}
function addAudioIntoIns(instances, options) {
    var registeredAudios = Object.keys(instances);
    var sharedAudios = [];
    var independentAudios = [];
    var keys = Object.keys(options);
    keys.forEach(function (key) {
        if (registeredAudios.includes(key)) {
            return false;
        }
        if (options[key].independent) {
            independentAudios.push(key);
        }
        else {
            sharedAudios.push(key);
        }
        return true;
    });
    var o = {};
    independentAudios.forEach(function (key) {
        o[key] = createIndependentAudio(options[key], instances, key);
    });
    if (sharedAudios.length) {
        sharedAudioId++;
    }
    sharedAudios.forEach(function (key) {
        o[key] = createSharedAudio(options[key], instances, "shared" + sharedAudioId);
    });
    keys = Object.keys(o);
    if (keys.length === 1) {
        return o[keys[0]];
    }
    return o;
}
function registerAudio(options) {
    if (!this._isVue) {
        throw new Error('目前只支持在vue中使用');
    }
    if (options === void 0) {
        throw new Error('options is required');
    }
    if (!dxsUtils.isObject(options) || typeof options !== 'string') {
        throw new Error('options must be an object or a src string');
    }
    if (dxsUtils.isObject(options) && !Object.keys(options).length) {
        throw new Error('options cannot be an empty object, must include one of "src loop autoplay"');
    }
    // 获取已经注册的音频
    var instances = this.$audioInstances || (this.$audioInstances = {});
    // 配置统一化
    var op = dealOptions(options);
    var result = addAudioIntoIns(instances, op);
    // 避免observed
    // @ts-ignore
    result._isVue = true;
    return result;
}
function install(Vue) {
    VueConstructor = Vue;
    Object.defineProperty(Vue.prototype, '$newAudio', {
        configurable: false,
        enumerable: false,
        get: function () {
            return registerAudio;
        },
        set: function () {
            throw new Error('$newAudio cannot be modify');
        },
    });
    Vue.mixin({
        beforeDestroy: function () {
            var _this = this;
            if (this.$audioInstances) {
                Object.keys(this.$audioInstances).forEach(function (key) {
                    var ins = _this.$audioInstances[key];
                    ins.destroy();
                    delete ins[key];
                });
                this.$audioInstances = null;
            }
        },
    });
}

export default install;
