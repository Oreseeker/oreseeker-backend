const { createApp } = require('./app');

const defaultPort = 3000;
const port = process.env.port || defaultPort;

const app = createApp();

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
})
