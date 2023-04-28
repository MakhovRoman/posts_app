const path = require('path');
const resolvePath = p => path.resolve(__dirname, p);
const cracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: "options",
        baseUrl: "src",
        aliases: {
          'components': './components',
          'hooks': './hooks',
          'utils': './utils',
          'API': './API',
          'pages': './pages'
        }
      }
    }
  ]
}
