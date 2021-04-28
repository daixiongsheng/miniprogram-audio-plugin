# 音频插件


## 功能
---
- 支持异常 `IOS` 中断恢复
- 支持同时创建多个音频
- 支持创建互斥音频
- 支持自动销毁

## 使用说明

```js
this.$newAudio(options)
```

## 参数说明
- options
- 类型： string | Options
```TS

export interface Options {
    [property: string]: AudioOptions | string;
}

export interface AudioOptions {
    src: string;
    /**
     * 是否恢复被IOS系统的中断
     * @default
     */
    keepAlive?: boolean;
    /**
     * 是否是使用单独的音频，默认为false，即如果同时创建多个音频时，内部会互斥
     * @default false
     */
    independent?: boolean;
    /**
     * 自动播放，当设为true且src有传里时，会自动播放
     * @default false
     */
    autoplay?: boolean;
    /**
     * 循环播放
     * @default false
     */
    loop?: boolean;

    /**
     * 音量 [0, 1]
     * @default 1
     */
    volume?: number;
    /**
     * 播放速度 [0.5, 2]
     * @default 1
     */
    playbackRate?: number;

    // 同时创建多个音频时默认会为keepAlive为true的新建单独音频，
    // 其他默认共享一个音频，其他使用共享的音频同一时间只能播放一个src链接，且不支持以下的固定事件回掉
    // 可以使用audio.bgm().stop(callback).play(callback).end(callback) 进行单次事件绑定,内部使用的是once(EventName, callback)
    /* 音频开始播放的回调 */
    onPlayCallback?: () => void;

    /** 音频暂停事件  */
    onPauseCallback?: () => void;

    /** 音频停止事件  */
    onStopCallback?: () => void;

    /** 音频自然播放结束事件  */
    onEndedCallback?: () => void;

    /** 音频播放进度更新事件  */
    onTimeUpdateCallback?: (currentTime: number, duration: number) => void;

    /** 音频播放错误事件  */
    onError?: (callback?: (res: Taro.InnerAudioContext.onErrorDetail) => void) => void;
}

```

## 返回值

返回创建成功的音频代理

- `AudioInstances | AudioInstance`
```TS
export interface AudioInstances {
    [property: string]: AudioInstance;
}

export interface AudioInstance {
    (src?: string): AudioInstance;
    /**
    * 播放开始时会执行传入的回调
    * 调用playAudio 或者autoplay属性引起的自动播放
    */
    play(callback?: () => void): AudioInstance;
    /**
    * 播放手动停止时会执行传入的回调
    * 调用 stopAudio 时触发
    */
    stop(callback?: () => void): AudioInstance;
    /**
    * 播放暂停时会执行传入的回调
    * 调用 pauseAudio 时触发
    */
    pause(callback?: () => void): AudioInstance;
    /**
    * 自然停止时会执行传入的回调
    * 音频播放完触发
    */
    end(callback?: () => void): AudioInstance;
    /**
    * 手动停止
    */
    stopAudio(): void;
    /**
    * 手动播放
    */
    playAudio(src?: string): void;
    /**
    * 手动暂停
    */
    pauseAudio(): void;
    /**
    * 改变音量 可能有兼容性问题
    */
    changeVolume(volume: number): void;
    /**
    * 改变播放速度 可能有兼容性问题
    */
    changePlayRate(rate: number): void;
}
```

## 例子
### 创建一个音频
```ts
// 1
const audio = this.$newAudio('http://aa.mp3')
// 播放它
audio('http://aa.mp3')
// 也可以这样 参数都是可选，参数要播放的音频链接
audio.playAudio()
    .play(() => {
        console.log('audio 开始播放')
    })
    .end(() => {
        console.log('audio 播放结束')
    })

// 2
const audio = this.$newAudio({
    src: 'http://aa.mp3',
    autoplay: true
})

// 3
const audio = this.$newAudio({
    bgm: {
        src: 'http://aa.mp3',
        autoplay: true,
    }
})

// 这3种方式创建的音频返回结果一样
```

### 同时创建多个音频
```TS
//
const audio = this.$newAudio({
    click: {
        src: 'http://aa.mp3',
    },
    right: {
        src: 'http://aa2.mp3',
    }
})
// 创建两个互斥音频
// 播放 click 音频
audio.click()
    .play(() => {
        console.log('click 开始播放')
    })
    .end(() => {
        console.log('click 播放结束')
    })
// 播放 right 音频 播放 right 音频时, click的音频会被停止，不会触发相应的事件
audio.right()

const audio = this.$newAudio({
    a1: {
        src: 'http://aa.mp3',
        independent: true
    },
    a2: {
        src: 'http://aa2.mp3',
    },
    a3: {
        src: 'http://aa2.mp3',
    }
})

// a2,a3音频互斥。

// a1是一个单独的音频, 不影响a2,a3

```