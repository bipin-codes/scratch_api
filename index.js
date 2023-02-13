const { app, port } = require('./src/app');

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on ${port}`);
});
