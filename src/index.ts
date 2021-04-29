import { isObject } from 'dxs-utils'

if (typeof wx === 'undefined') {
  throw new Error('只支持在微信小程序使用')
}
let VueConstructor = function () {}
export interface AudioOptions {
  src: string

  /**
   * 是否是使用单独的音频，默认为false，即如果同时创建多个音频时，内部会互斥
   * @default false
   */
  independent?: boolean

  /**
   * 自动播放，当设为true且src有传里时，会自动播放
   * @default false
   */
  autoplay?: boolean

  /**
   * 循环播放
   * @default false
   */
  loop?: boolean

  /**
   * 音量 [0, 1]
   * @default 1
   */
  volume?: number

  /**
   * 播放速度 [0.5, 2]
   * @default 1
   */
  playbackRate?: number

  // 同时创建多个音频时默认会为 independent 为true的新建单独音频，
  // 其他默认共享一个音频，其他使用共享的音频同一时间只能播放一个src链接，且不支持以下的固定事件回掉
  // 可以使用audio.bgm().stop(callback).play(callback).end(callback) 进行单次事件绑定,内部使用的是once(EventName, callback)
  /* 音频开始播放的回调 */
  onPlayCallback?: () => void

  /** 音频暂停事件  */
  onPauseCallback?: () => void

  /** 音频停止事件  */
  onStopCallback?: () => void

  /** 音频自然播放结束事件  */
  onEndedCallback?: () => void

  /** 音频播放进度更新事件  */
  onTimeUpdateCallback?: (currentTime: number, duration: number) => void

  /** 音频播放错误事件  */
  onError?: (
    callback?: (
      res: WechatMiniprogram.InnerAudioContextOnErrorCallbackResult
    ) => void
  ) => void
}

export interface Options {
  [property: string]: AudioOptions | string
}

/**
 * this.$newAudio(options) 返回的结构
 *
 * @export
 * @interface AudioInstance
 */

export interface AudioInstance {
  (src?: string): AudioInstance

  /**
   * 播放开始时会执行传入的回调
   * 调用playAudio 或者autoplay属性引起的自动播放
   */
  play(callback?: () => void): AudioInstance

  /**
   * 播放手动停止时会执行传入的回调
   * 调用 stopAudio 时触发
   */
  stop(callback?: () => void): AudioInstance

  /**
   * 播放暂停时会执行传入的回调
   * 调用 pauseAudio 时触发
   */
  pause(callback?: () => void): AudioInstance

  /**
   * 自然停止时会执行传入的回调
   * 音频播放完触发
   */
  end(callback?: () => void): AudioInstance

  /**
   * 手动停止
   */
  stopAudio(): void

  /**
   * 手动播放
   */
  playAudio(src?: string): void

  /**
   * 手动暂停
   */
  pauseAudio(): void

  /**
   * 继续播放音频
   */
  resumeAudio(): void

  /**
   * 改变音量 可能有兼容性问题
   */
  changeVolume(volume: number): void

  /**
   * 改变播放速度 可能有兼容性问题
   */
  changePlayRate(rate: number): void
}

let i = 0

class AudioPlugin {
  static ON_PLAY = 'ON_PLAY'

  static ON_PAUSE = 'ON_PAUSE'

  static ON_ENDED = 'ON_ENDED'

  static ON_STOP = 'ON_STOP'

  static ON_ERROR = 'ON_ERROR'

  static ON_TIME_UPDATE = 'ON_TIME_UPDATE'

  // @ts-ignore
  private readonly id: number

  // 用户当前想要的状态
  public isPlaying: boolean

  // 内部实例的状态

  public duration: number

  public currentTime: number

  readonly options: AudioOptions

  private audio: WechatMiniprogram.InnerAudioContext

  private listener = new VueConstructor()

  constructor(options: AudioOptions = {} as AudioOptions) {
    if (!isObject(options)) {
      throw new Error('options must be an object')
    }
    this.id = ++i
    const defaultOptions: AudioOptions = {
      src: '',
      independent: false,
      autoplay: false,
      loop: false,
      volume: 1,
      playbackRate: 1,
    }
    const {
      /** 音频播放事件 */
      onPlayCallback,

      /** 音频暂停事件 */
      onPauseCallback,

      /** 音频停止事件 */
      onStopCallback,

      /** 音频自然播放结束事件 */
      onEndedCallback,

      /** 音频播放进度更新事件 */
      onTimeUpdateCallback,

      /** 音频播放错误事件 */
      onError,
    } = options

    // 事件注册
    onPlayCallback && this.listener.$on(AudioPlugin.ON_PLAY, onPlayCallback)
    onPauseCallback && this.listener.$on(AudioPlugin.ON_PAUSE, onPauseCallback)
    onStopCallback && this.listener.$on(AudioPlugin.ON_STOP, onStopCallback)
    onEndedCallback && this.listener.$on(AudioPlugin.ON_ENDED, onEndedCallback)
    onError && this.listener.$on(AudioPlugin.ON_ERROR, onError)
    onTimeUpdateCallback &&
      this.listener.$on(AudioPlugin.ON_TIME_UPDATE, onTimeUpdateCallback)

    this.options = Object.assign(defaultOptions, options)
    this.isPlaying = false
    this.duration = 0
    this.currentTime = 0
    this.audio = wx.createInnerAudioContext()
    this.initAudio()
  }

  get paused(): boolean {
    return this.audio.paused
  }

  private initAudio() {
    this.audio.onCanplay(this.onCanplay)
    this.audio.onPlay(this.onPlayCallback)
    this.audio.onPause(this.onPauseCallback)
    this.audio.onStop(this.onStopCallback)
    this.audio.onEnded(this.onEndedCallback)
    this.audio.onTimeUpdate(this.onTimeUpdateCallback)
    this.audio.onError(this.onError)
    this.audio.onSeeking(this.onSeeking)
    this.audio.onSeeked(this.onSeeked)

    wx.onAudioInterruptionEnd(this.onAudioInterruptionEnd)
    wx.onAudioInterruptionBegin(this.onAudioInterruptionBegin)

    this.audio.autoplay = this.options.autoplay as boolean
    this.audio.loop = this.options.loop as boolean
    this.audio.playbackRate = this.options.playbackRate as number
    this.audio.volume = this.options.volume as number
    if (this.options.autoplay && this.options.src) {
      this.playAudio(this.options.src)
    }
  }

  public playAudio(src?: string): void {
    if (!src && this.options.src && this.isPlaying && !this.paused) {
      return
    }
    this.audio.src = this.options.src = src || this.options.src
    if (!this.options.src) {
      throw new Error('src is required')
    }
    this.duration = this.audio.duration
    this.audio.play()
    this.isPlaying = true
  }

  public stopAudio(): void {
    this.isPlaying = false
    this.audio.stop()
  }

  public pauseAudio(): void {
    this.isPlaying = false
    this.audio.pause()
  }

  public destroy(): void {
    this.isPlaying = false
    this.listener.$destroy()
    this.audio.destroy()
  }

  public resumeAudio(): void {
    if (!this.isPlaying && this.paused) {
      this.audio.play()
    }
  }

  private onPlayCallback = () => {
    this.listener.$emit(AudioPlugin.ON_PLAY)
  }

  private onStopCallback = () => {
    this.listener.$emit(AudioPlugin.ON_STOP)
  }

  private onPauseCallback = () => {
    this.listener.$emit(AudioPlugin.ON_PAUSE)
  }

  private onEndedCallback = () => {
    this.isPlaying = false
    this.listener.$emit(AudioPlugin.ON_ENDED)
  }

  private onCanplay = () => {}

  private onTimeUpdateCallback = () => {
    const { currentTime, duration } = this.audio
    this.listener.$emit(AudioPlugin.ON_TIME_UPDATE, currentTime, duration)
  }

  private onError = (
    res: WechatMiniprogram.InnerAudioContextOnErrorCallbackResult
  ) => {
    this.isPlaying = false
    this.listener.$emit(AudioPlugin.ON_ERROR, res)
  }

  private onSeeking = () => {}

  private onSeeked = () => {}
  private onAudioInterruptionEnd = () => {
    // 音频中断事件
    if (this.isPlaying && this.audio.paused) {
      this.audio.play()
    }
  }

  private onAudioInterruptionBegin = () => {
    // 音频中断事件
  }

  play(callback?: () => void): AudioPlugin {
    callback && this.listener.$once(AudioPlugin.ON_PLAY, callback)
    return this
  }

  stop(callback?: () => void): AudioPlugin {
    callback && this.listener.$once(AudioPlugin.ON_STOP, callback)
    return this
  }

  end(callback?: () => void): AudioPlugin {
    callback && this.listener.$once(AudioPlugin.ON_ENDED, callback)
    return this
  }

  pause(callback?: () => void): AudioPlugin {
    callback && this.listener.$once(AudioPlugin.ON_PAUSE, callback)
    return this
  }

  timeupdate(callback?: () => void): AudioPlugin {
    callback && this.listener.$once(AudioPlugin.ON_TIME_UPDATE, callback)
    return this
  }

  changeVolume(volume: number): void {
    if (volume < 0 || volume > 1) {
      throw new Error('音量值错误')
    }
    this.audio.volume = volume
    this.options.volume = volume
  }

  changePlayRate(rate: number): void {
    if (rate < 0.5 || rate > 2) {
      throw new Error('音频播放值错误')
    }
    this.audio.playbackRate = rate
    this.options.playbackRate = rate
  }

  clearListener(): void {
    this.listener.$off()
  }
}

export interface GlobalInstances {
  [property: string]: AudioPlugin
}

export interface AudioInstances {
  [property: string]: AudioInstance
}

export interface RegisterAudioOptions {
  [property: string]: AudioOptions
}

const defaultOptions: AudioOptions = {
  src: '',
  independent: false,
}

let defaultId = 0
function dealOptions(options: Options | string): RegisterAudioOptions {
  const o: RegisterAudioOptions = {} as RegisterAudioOptions
  const keys = Object.keys(options)
  if (typeof options === 'string') {
    return {
      [`default${defaultId++}`]: {
        ...defaultOptions,
        src: options,
        independent: true,
      },
    }
  }
  if (
    keys.includes('src') ||
    keys.includes('autoplay') ||
    keys.includes('loop') ||
    keys.includes('volume')
  ) {
    return {
      [`default${defaultId++}`]: {
        ...defaultOptions,
        ...options,
        independent: true,
      },
    }
  }
  keys.forEach((key) => {
    const value = options[key]
    if (typeof value === 'string') {
      o[key] = {
        ...defaultOptions,
        src: value,
      }
    } else if (isObject(value)) {
      if (!Object.keys(value).length) {
        throw new Error(
          'options cannot be a empty object, must include one of "src loop autoplay"'
        )
      }
      o[key] = {
        ...defaultOptions,
        ...value,
      }
    }
  })
  return o
}

function createProxyInstance(
  audio: AudioPlugin,
  _src: string,
  isSharedAudio: boolean = false
): AudioInstance {
  const fun: AudioInstance = function fun(src = _src): AudioInstance {
    fun.playAudio(src)
    return fun
  }
  fun.stop = function stop(callback?: () => void): AudioInstance {
    audio.stop(callback)
    return fun
  }
  fun.play = function play(callback?: () => void): AudioInstance {
    audio.play(callback)
    return fun
  }
  fun.end = function end(callback?: () => void): AudioInstance {
    audio.end(callback)
    return fun
  }
  fun.pause = function pause(callback?: () => void): AudioInstance {
    audio.pause(callback)
    return fun
  }

  fun.pauseAudio = function pauseAudio(): AudioInstance {
    audio.pauseAudio()
    return fun
  }
  fun.stopAudio = function stopAudio(): AudioInstance {
    audio.stopAudio()
    return fun
  }
  fun.playAudio = function playAudio(src = _src): AudioInstance {
    if (isSharedAudio && src !== audio.options.src) {
      audio.clearListener()
    }
    audio.playAudio(src)
    return fun
  }
  fun.changeVolume = function changeVolume(volume: number): AudioInstance {
    audio.changePlayRate(volume)
    return fun
  }
  fun.changePlayRate = function changePlayRate(rate: number): AudioInstance {
    audio.changePlayRate(rate)
    return fun
  }
  fun.resumeAudio = function resumeAudio(): AudioInstance {
    audio.resumeAudio()
    return fun
  }
  return fun
}
function createIndependentAudio(
  options: AudioOptions,
  ins: GlobalInstances,
  key: string
): AudioInstance {
  const audio = new AudioPlugin(options)
  ins[key] = audio
  return createProxyInstance(audio, options.src)
}

let sharedAudioId = 0
function createSharedAudio(
  options: AudioOptions,
  ins: GlobalInstances,
  shareKey: string
): AudioInstance {
  const audio = ins[shareKey] || (ins[shareKey] = new AudioPlugin())
  return createProxyInstance(audio, options.src, true)
}

function addAudioIntoIns(
  instances: GlobalInstances,
  options: RegisterAudioOptions
): AudioInstances | AudioInstance {
  const registeredAudios = Object.keys(instances)
  const sharedAudios: string[] = []
  const independentAudios: string[] = []
  let keys = Object.keys(options)
  keys.forEach((key) => {
    if (registeredAudios.includes(key)) {
      return false
    }
    if (options[key].independent) {
      independentAudios.push(key)
    } else {
      sharedAudios.push(key)
    }
    return true
  })
  const o: AudioInstances = {} as AudioInstances
  independentAudios.forEach((key) => {
    o[key] = createIndependentAudio(options[key], instances, key)
  })
  if (sharedAudios.length) {
    sharedAudioId++
  }
  sharedAudios.forEach((key) => {
    o[key] = createSharedAudio(
      options[key],
      instances,
      `shared${sharedAudioId}`
    )
  })
  keys = Object.keys(o)
  if (keys.length === 1) {
    return o[keys[0]]
  }
  return o
}
function registerAudio(
  options: Options | string
): AudioInstances | AudioInstance {
  if (!this._isVue) {
    throw new Error('目前只支持在vue中使用')
  }
  if (options === void 0) {
    throw new Error('options is required')
  }
  if (!isObject(options) || typeof options !== 'string') {
    throw new Error('options must be an object or a src string')
  }
  if (isObject(options) && !Object.keys(options).length) {
    throw new Error(
      'options cannot be an empty object, must include one of "src loop autoplay"'
    )
  }
  // 获取已经注册的音频
  const instances: GlobalInstances =
    this.$audioInstances || (this.$audioInstances = {})
  // 配置统一化
  const op: RegisterAudioOptions = dealOptions(options)
  const result = addAudioIntoIns(instances, op)
  // 避免observed
  // @ts-ignore
  result._isVue = true
  return result
}

function install(Vue: any): void {
  VueConstructor = Vue
  Object.defineProperty(Vue.prototype, '$newAudio', {
    configurable: false,
    enumerable: false,
    get() {
      return registerAudio
    },
    set() {
      throw new Error('$newAudio cannot be modify')
    },
  })
  Vue.mixin({
    beforeDestroy(): void {
      if (this.$audioInstances) {
        Object.keys(this.$audioInstances as GlobalInstances).forEach((key) => {
          const ins = this.$audioInstances[key] as AudioPlugin
          ins.destroy()
          delete ins[key]
        })
        this.$audioInstances = null
      }
    },
  })
}

export default install
