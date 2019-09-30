app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      status: 'You are signed in.',
      cookie: req.session.token,
    });
  } else {
    res.cookie('token', '');
    res.json({
      status: 'You are not signed in.',
    });
  }
});

app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email'
  ],
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});
