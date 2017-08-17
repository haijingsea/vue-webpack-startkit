/**
 * Created by Yinxiong on 2016/11/30.
 */

import { noop } from 'helper.js'
import Events from 'minivents'

const BlobBuilder = global.MozBlobBuilder || global.WebKitBlobBuilder || global.BlobBuilder

const MIME = {
  txt: 'text/plain',
  csv: 'text/plain;application/vnd.ms-excel;',
  jpg: 'image/jpeg'
}

/**
 *
 * @param file {File}
 * @returns {boolean}
 */
export function checkMIME (file) {
  if (file && file.name) {
    return this.split(file.name).ext.toLocaleLowerCase() in MIME
  }
  return false
}

/**
 *
 * @param {Buffer} buf
 * @param {function} callback
 */
export function arrayBufferToString (buf) {
  return new Promise((resolve, reject) => {
    let blob
    if (typeof (BlobBuilder) !== 'undefined') {
      const bb = new BlobBuilder()
      bb.append(buf)
      blob = bb.getBlob()
    } else {
      blob = new Blob([buf])
    }
    const f = new FileReader()
    f.onload = function (e) {
      resolve(e.target.result)
    }
    f.readAsText(blob)
  })
}

export function getFileReader (options) {
  const fr = new FileReader()

  options = Object.assign({
    success: noop,
    error: noop,
    progress: noop,
    abort: noop,
    start: noop
  }, options)

  fr.onloadstart = function () {
    options.start.apply(fr, arguments)
  }
  fr.onloadend = function () {
    options.success.apply(fr, arguments)
  }
  fr.onprogress = function () {
    options.progress.apply(fr, arguments)
  }
  fr.onerror = function () {
    options.error.apply(fr, arguments)
  }
  fr.onabort = function () {
    options.abort.apply(fr, arguments)
  }

  return fr
}

export function readImage (file) {
  return new Promise((resolve, reject) => {
    const fr = getFileReader(file, {
      success () {
        resolve(fr.result)
      },
      error () {
        reject(fr)
      }
    })

    fr.readAsDataURL(file)
  })
}

export function getRemoteImageBuffer (url, ext) {
  return new Promise((resolve, reject) => {
    ext = ext || url.substring(url.lastIndexOf('.') + 1, url.length)

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function () {
      if (this.status == 200) {
        resolve({
          buffer: new Uint8Array(this.response),
          ext: ext
        })
      }
    }
    xhr.onerror = function (err) {
      reject(err)
    }
    xhr.send()
  })
}

export function readText (file, length) {
  return new Promise((resolve, reject) => {
    const blob = file.slice(0, length || file.size, 'text/plain;charset=UTF-8')

    const fr = getFileReader({
      success () {
        arrayBufferToString(fr.result).then(function (text) {
          resolve(text)
        }).catch(reject)
      }
    })

    fr.readAsArrayBuffer(blob)
  })
}

export function split (name) {
  const n = name.lastIndexOf('.')
  if (n > -1 && n < name.length - 1) {
    return {
      name: name.substring(0, n),
      ext: name.substring(n + 1, name.length)
    }
  }
  return {
    name: name,
    ext: ''
  }
}
