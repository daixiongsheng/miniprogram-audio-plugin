const fs = require('fs')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')

const args = require('minimist')(process.argv.slice(2))
const resolve = (...p) => path.resolve(__dirname, '..', ...p)

const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const prodOnly = !devOnly && (args.prodOnly || args.p)
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildTypes = args.t || args.types || isRelease
run()
async function run() {
  await execa('rm', ['-rf', 'dist', 'types'])
  await execa('mkdir', ['dist'])

  await buildAll()
  checkAllSizes()
}

async function buildAll() {
  const env =
    process.env.NODE_ENV !== 'development' ? 'production' : 'development'
  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [
        `NODE_ENV:${env}`,
        formats ? `FORMATS:${formats}` : ``,
        buildTypes ? `TYPES:true` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``
      ]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
}

function checkAllSizes() {
  const targets = fs
    .readdirSync(resolve('dist'))
    .filter(f => !fs.statSync(resolve('dist', f)).isDirectory())
  targets.forEach(checkFileSize)
}

function checkFileSize(filePath) {
  filePath = resolve('dist', filePath)
  if (!fs.existsSync(filePath)) {
    return
  }
  const file = fs.readFileSync(filePath)
  const minSize = (file.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(file)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(file)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}
