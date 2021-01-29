const _envEnum = {
  0: 'mock',
  1: 'dev',
  2: 'test',
  3: 'prd',
}

class EnvReceiver {
  constructor() {
    this._env = {
      api_env: '',
      api_url: '',
      api_version: 'v1',
      // ...
      // 添加更多键值对
      // 并修改对应run print函数
    }
  }

  runMock(env=0) {
    this._env['api_url'] = 'https://mock.com'
    this.print(env)
  }

  runDev(env=1) {
    this._env['api_url'] = 'your local interface url'
    this.print(env)
  }

  runTest(env=2) {
    this._env['api_url'] = 'your test interface url'
    this.print(env)
  }

  runPrd(env=3) {
    this._env['api_url'] = 'your production interface url'
    this.print(env)
  }

  print(env) {
    this._env['api_env'] = _envEnum[env]
    console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.warn('App Interface Conf')
    console.table({
      API_ENV: this._env['api_env'],
      API_URL: this._env['api_url'],
      API_VER: this._env['api_version'],
    })
    console.warn('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  }
}

class EnvCommonder {
  constructor(envReceiver) {
    this.receiver = envReceiver
  }

  commond(env) {
    const receiver = this.receiver
    switch(env) {
      case 0:
        receiver.runMock(env)
        break
      case 1:
        receiver.runDev(env)
        break
      case 2:
        receiver.runTest(env)
        break
      case 3:
        receiver.runPrd(env)
        break
      default:
        receiver.runPrd(env)
        break
    }
  }
}

class EnvInvoker {
  constructor(envCommonder) {
    this.commonder = envCommonder
  }

  invoke(env=3) {
    env = parseInt(env)
    const doCommond = EnvInvoker.checkEnv(env)
    if (doCommond) this.commonder.commond(env)
  }

  static checkEnv(env) {
    const envs = Object.keys(_envEnum).map(item => parseInt(item))
    if (envs.includes(env)) return true
    throw new Error(`_APP_ENV 参数错误`)
  }
}

const envReceiver = new EnvReceiver()
const envCommonder = new EnvCommonder(envReceiver)
const envInvoker = new EnvInvoker(envCommonder)

module.exports = {
  envInvoker,
  env: envInvoker.commonder.receiver._env
}