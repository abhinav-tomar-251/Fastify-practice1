const fastify = require('fastify')({ logger: true });

// Register Swagger
fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
});

fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs/ui',
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
