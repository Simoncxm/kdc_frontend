module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://10.135.17.248:8090',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
