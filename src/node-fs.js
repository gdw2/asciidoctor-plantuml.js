const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const http = require('./node-http')

module.exports = {
  add: (image) => {
    mkdirp.sync(image.relative)
    const filePath = path.format({dir: image.relative, base: image.basename})
    fs.writeFileSync(filePath, image.contents, 'binary')
  },
  read: (path, encoding = 'utf8') => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return http.get(path, encoding)
    }
    if (path.startsWith('file://')) {
      return fs.readFileSync(path.substr('file://'.length), encoding)
    }
    return fs.readFileSync(path, encoding)
  }
}
