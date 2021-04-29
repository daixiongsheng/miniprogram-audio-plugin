/// <reference types="wechat-miniprogram" />
export interface AudioOptions {
    src: string;
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
    onError?: (callback?: (res: WechatMiniprogram.InnerAudioContextOnErrorCallbackResult) => void) => void;
}
export interface Options {
    [property: string]: AudioOptions | string;
}
/**
 * this.$newAudio(options) 返回的结构
 *
 * @export
 * @interface AudioInstance
 */
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
     * 继续播放音频
     */
    resumeAudio(): void;
    /**
     * 改变音量 可能有兼容性问题
     */
    changeVolume(volume: number): void;
    /**
     * 改变播放速度 可能有兼容性问题
     */
    changePlayRate(rate: number): void;
}
declare class AudioPlugin {
    static ON_PLAY: string;
    static ON_PAUSE: string;
    static ON_ENDED: string;
    static ON_STOP: string;
    static ON_ERROR: string;
    static ON_TIME_UPDATE: string;
    private readonly id;
    isPlaying: boolean;
    duration: number;
    currentTime: number;
    readonly options: AudioOptions;
    private audio;
    private listener;
    constructor(options?: AudioOptions);
    get paused(): boolean;
    private initAudio;
    playAudio(src?: string): void;
    stopAudio(): void;
    pauseAudio(): void;
    destroy(): void;
    resumeAudio(): void;
    private onPlayCallback;
    private onStopCallback;
    private onPauseCallback;
    private onEndedCallback;
    private onCanplay;
    private onTimeUpdateCallback;
    private onError;
    private onSeeking;
    private onSeeked;
    private onAudioInterruptionEnd;
    private onAudioInterruptionBegin;
    play(callback?: () => void): AudioPlugin;
    stop(callback?: () => void): AudioPlugin;
    end(callback?: () => void): AudioPlugin;
    pause(callback?: () => void): AudioPlugin;
    timeupdate(callback?: () => void): AudioPlugin;
    changeVolume(volume: number): void;
    changePlayRate(rate: number): void;
    clearListener(): void;
}
export interface GlobalInstances {
    [property: string]: AudioPlugin;
}
export interface AudioInstances {
    [property: string]: AudioInstance;
}
export interface RegisterAudioOptions {
    [property: string]: AudioOptions;
}
declare function install(Vue: any): void;
export default install;
