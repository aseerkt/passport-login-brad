module.exports = function (app, express, path) {
  // server bootswatch css
  app.use(express.static(path.join(__dirname, 'public')));
  // server font awesome css
  app.use(
    '/fortawesome',
    express.static(
      path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free')
    )
  );
  // server bootstrap cdn css, js
  app.use(
    '/bootstrapcdn',
    express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist'))
  );
  // serve jquery js
  app.use(
    '/jquery',
    express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
  );
};
