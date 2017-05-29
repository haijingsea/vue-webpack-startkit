// see http://vuejs-templates.github.io/webpack for documentation.

'use strict';
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const os = require('os');

const manifestBasePath = '';
const manifestProjectPath = '';

const ifaces = os.networkInterfaces();

let ipList = [];
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            ipList.push(iface.address);
        } else {
            // this interface has only one ipv4 adress
            ipList.push(iface.address);
        }
        ++alias;
    });
});

const devPort = 9391;
const localIp = ipList.find(d=>d.indexOf('192.168') == 0);

module.exports = {
    srcDir: './src',
    distDir: './dist',
    buildDir: './src/build',
	entry: {
		template: './src/js/project/template/main.js',
        vendor: ['./src/js/main.js', 'vue', 'vuex', 'vue-router', 'es6-promise', 'moment', 'jquery']
	},
	commonChunks: [{
		name: 'vendor',
		minChunks: 2,
		chunks: ['vendor', 'template']
	}, {
        minChunks: Infinity,
        names: ['vendor', 'manifest']
    }],
    build: {
        assetsRoot: path.resolve(__dirname, '../src/build'),
        assetsSubDirectory: 'js/',
        productionSourceMap: false
    },
    dev: {
        ip: localIp,
        port: devPort,
        publicPath: `http://${localIp}:${devPort}/dist/js/`,
        proxyTable: {}
    },
	manifest: 'rev-manifest.json',
    jspManifestProd: `${manifestBasePath}${manifestProjectPath}_manifest_prod.jsp`,
    jspManifestDev: `${manifestBasePath}${manifestProjectPath}_manifest_dev.jsp`
};
