module.exports = {
    // ... other configurations ...
    resolve: {
      fallback: {
        url: require.resolve('url/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        axios: require.resolve('axios/lib/axios'),
      },
      node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false,
      },
    },
  };