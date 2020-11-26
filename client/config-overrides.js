const {
  override,
  addLessLoader,
  addWebpackModuleRule
} = require('customize-cra')

module.exports = override(
  addLessLoader({
    // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@base-color': '#17a2b8',
        '@text-color': '#333',
        '@font-family-base':
          'Raleway, sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji, PingFang SC, Hiragino Sans GB, Microsoft YaHei, STXihei',
        '@font-size-base': '1rem',
        '@line-height-base': '1.5',
        '@line-height-large-computed': '24px',
        '@dropdown-link-hover-bg': 'transparent',
        '@dropdown-link-hover-color': '#17a2b8',
        '@divider-default-horizontal-margin': '12px',
        '@reset-import': false
      }
    }
  }),
  addWebpackModuleRule({
    test: /\.svg$/,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
  })
)
