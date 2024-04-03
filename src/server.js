const hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = hapi.Server({
    host: '127.0.0.1',
    port: 9000,
  });

  server.route(routes);
  await server.start();
};
init();
