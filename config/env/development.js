'use stric'

module.exports = {

  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/forum-app-dev',
    options: {
      user: '',
      pass: ''
    }
  },
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  templateEngine: 'swig',
  sessionCookie:{ 
    maxAge: 24*(60*60*100),
    httpOnly: true,
    secure: false,
  },
  csrf: {
    csrf: false,
    csp: { /* Content Security Policy object */},
    xframe: 'SAMEORIGIN',
    p3p: 'ABCDEF',
    xssProtection: true
  },

};
