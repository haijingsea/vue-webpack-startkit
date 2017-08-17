/**
 * Created by Yinxiong on 2016/5/4 0004.
 */

import Promise from 'bluebird'
import $script from 'scriptjs'
import paths from 'const/paths'
import _ from 'lodash'
import { STATIC_PATH } from 'const/env'

const cssCache = {}

$script.path(STATIC_PATH)

function parsePath (name) {
  if (!name) {
    return null
  }

  let result = name
  let isMain = true
  let uri
  let pkg

  uri = name.split('/')

  if (uri.length > 1) {
    name = uri.shift()
    uri = uri.join('/')
    isMain = false
  }

  if (name in paths) {
    pkg = paths[name]
  }

  if (typeof pkg === 'string') {
    result = paths[name]
  } else if (typeof pkg === 'object') {
    if (isMain) {
      result = pkg.dir + '/' + pkg.main
    } else {
      result = pkg.dir + '/' + uri
    }
  }

  return {
    path: result,
    pkg: pkg
  }
}

export default {
  $script: $script,
  series () {
    const scripts = _.filter(arguments, Boolean)
    return Promise.mapSeries(scripts, name => {
      return this.load(name).catch(function (e) {
        console.error(e)
      })
    })
  },
  css (url) {
    url = url.indexOf('http') === 0 ? url : (STATIC_PATH + url)
    if (url in cssCache) {
      return
    }

    cssCache[url] = true

    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = url

    const head = document.getElementsByTagName('head')[0]
    const mainCss = document.getElementById('mainCss')

    if (mainCss) {
      head.insertBefore(link, mainCss)
    } else {
      head.appendChild(link)
    }
  },
  load () {
    const names = arguments
    return new Promise((resolve, reject) => {
      const scripts = []
      const csses = []
      const pkgs = []

      _.forEach(names, name => {
        let n
        if (typeof name === 'string') {
          n = parsePath(name)
        }
        if (n) {
          pkgs.push(n)
          if (/.css$/.test(n.path)) {
            csses.push(n.path)
          } else {
            scripts.push(n.path)
          }
        }
      })

      if (csses.length) {
        csses.forEach(function (uri) {
          this.css(uri)
        })
      }

      if (scripts.length) {
        $script(scripts, () => {
          _.forEach(pkgs, o => {
            if (o.pkg && _.isFunction(o.pkg.init) && !o.pkg.inited) {
              o.pkg.init()
              o.pkg.inited = true
            }
          })
          resolve()
        }, function (depsNotFound) {
          console.error(depsNotFound)
          reject(depsNotFound)
        })
      } else {
        resolve()
      }
    })
  }
}
