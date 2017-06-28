/**
 * Created by Yinxiong on 2017/6/21.
 */

const config = require('../config')
const fs = require('fs')
const url = require('url')

const Plugin = function (opt) {
  this.injected = false;
  this.options = Object.assign({
    publicPath: '',
    manifestPath: ''
  }, opt)

  if(!this.options.manifestPath) {
    throw new Error('manifest path is empty')
  }
}

Plugin.prototype.apply = function (compiler) {
  let content = ['<%@ page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" session="false"%>']
  content.push(`<c:set var="public_path" value="${this.options.publicPath}" />`)
  compiler.plugin('emit', (compilation, callback)=>{
    if(this.injected) {
      callback();
      return;
    }
    compilation.chunks.forEach(chunk=>{
      if(!chunk.name) return
      chunk.files.forEach(f=>{
        if(f.indexOf('.css') > -1) {
          content.push(`<c:set var="css_${chunk.name}" value="\${public_path}${f}" />`)
        } else if(f.indexOf('.js' > -1)) {
          content.push(`<c:set var="js_${chunk.name}" value="\${public_path}${f}" />`)
        }
      })
    })

    fs.writeFile(this.options.manifestPath, content.join('\n'), (err) => {
      if (err) throw err;
      console.log(`manifest write in ${this.options.manifestPath}`);
      this.injected = true;
      callback();
    })
  });
}

module.exports = Plugin
