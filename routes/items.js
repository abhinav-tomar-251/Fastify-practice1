const items = require('../Items')

// Items Schema 
const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    }
}

// options for get all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            }
        }
    }
}

// schema for single item
const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    }
}

function itemRoutes(fastify, options, done) {

    // Get all items
    fastify.get('/items', getItemsOpts, (req, reply) => {
        reply.send(items) 
    })

    // Get single item
    fastify.get('/items/:id', getItemOpts, (req, reply) => {
        const { id } = req.params;
        const item = items.find(item => item.id === id);

        if (item) {
            reply.send(item); 
        } else {
            reply.code(404).send({ message: 'Item not found' }); 
        }
    })
     
    done()
}

module.exports = itemRoutes;
