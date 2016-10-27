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
        clientID: 'fb88062d31490728ec07',
        clientSecret: 'cccfa2b5dcac20915938a282b45e69f834c1def3',
        clientURL: 'http://localhost:3000/auth/github/callback',
      },
    },
  },
};
