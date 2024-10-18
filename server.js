const fastify = require('fastify')({ logger: true })

fastify.register(require('./routes/items'))

const PORT = 3000;

const start = async () => {
    try {
        await fastify.listen({port: PORT});
        fastify.log.info(`Server listening on port ${PORT}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();
