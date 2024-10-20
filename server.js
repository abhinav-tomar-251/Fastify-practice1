const fastify = require('fastify')({ logger: true });

// Register Swagger
fastify.register(require('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'fastify-api',
      description: 'API documentation for Fastify app',
      version: '1.0.0',
    },
    host: 'localhost:3000', 
    schemes: ['http'],
  },
  exposeRoute: true,
  routePrefix: '/docs',
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: true,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});


const path = require('path');
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});


// Register routes
fastify.register(require('./routes/items'));

const PORT = 3000;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    fastify.log.info(`Server listening on port ${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
