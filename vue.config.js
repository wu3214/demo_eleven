module.exports = {
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
          "nsis": {
            "oneClick": false,
            "allowElevation": true,
            "allowToChangeInstallationDirectory": true,
            "installerIcon": "./src/assets/anzhuang.ico",
            "uninstallerIcon": "./src/assets/ku.ico",
            "createDesktopShortcut": true,
            "createStartMenuShortcut": true,
            "shortcutName": "dongjing"
          },
          "productName": "musicAndvideo",
          "appId": "com.wzj.app",
          "mac": {
            "target": [
              "dmg",
              "zip"
            ]
          },
          "win": {
            "icon": "./src/assets/fz.ico",
            "target": [
              "nsis",
              "zip"
            ]
          }
        },
      },
    },
  devServer: {
    port:8086,
      proxy: {
        '/PlayViewapi': {
          target: 'http://localhost:8081/',
            // ws: true,
            changeOrigin: true, 
            pathRewrite: {
                '^/PlayViewapi': ''
            }
        },
        // http://39.105.38.10:8081/豆瓣新baseURL
        '/Viewapi': {
          target: 'https://api.wmdb.tv',
            // ws: true,
            changeOrigin: true, 
            pathRewrite: {
                '^/Viewapi': ''
            }
        },
        '/topMovieApi': {
          target: 'https://api.wmdb.tv/api',
            // ws: true,
            changeOrigin: true, 
            pathRewrite: {
                '^/topMovieApi': ''
            }
        },
        '/apilogin': {
          target: 'http://localhost:8081/',
            // ws: true,
            changeOrigin: true, 
            pathRewrite: {
                '^/apilogin': ''
            }
        },
        '/apiregister': {
          target: 'http://localhost:8081/',
            // ws: true,
            changeOrigin: true, 
            pathRewrite: {
                '^/apiregister': ''
            }
        },
          // '/api': {
          //   target: 'https://music.163.com',
          //     // ws: true,
          //     changeOrigin: true, 
          //     pathRewrite: {
          //         '^/api': '/'
          //     }
          // },
          
      }
  },
}
