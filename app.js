const express = require('express');

const app = express();

// Use Routes
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
