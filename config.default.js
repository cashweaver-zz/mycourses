module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  theme: {
    activeTheme: 'basic',
  },
  auth: {
    strategies: {
      github: {
        clientID: '',
        clientSecret: '',
        clientURL: 'http://localhost:' + (process.env.port || 3000) + '/auth/github/callback',
      },
    },
  },
};
