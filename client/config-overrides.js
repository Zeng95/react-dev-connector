const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@text-color': '#333',
        '@font-family-base':
          'Raleway, sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, PingFang SC, Hiragino Sans GB, Microsoft YaHei, STXihei',
        '@font-size-base': '1rem',
        '@line-height-base': '1.5',
        '@reset-import': false
      }
    }
  })
)
