const {getItem, getItems, addItem, updateItem, deleteItem} = require('../controllers/itemController')

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
    },
    handler: getItems,
}

// schema for single item
const getItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: getItem,
}

// post Item ops

const postItemOpts = {
    schema: {
        body:{
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string'}
            }
        },
        response: {
            200: Item
        }
    },
    handler: addItem,
}

// delete item opts

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            }
        }
    },
    handler: deleteItem,
}

// schema for Update item
const updateItemOpts = {
    schema: {
        response: {
            200: Item
        }
    },
    handler: updateItem,
}

function itemRoutes(fastify, options, done) {

    // Get all items
    fastify.get('/items', getItemsOpts)

    // Get single item
    fastify.get('/items/:id', getItemOpts)
     
    // Add item
    fastify.post('/items', postItemOpts)

    //Delete Item
    fastify.delete('/items/:id', deleteItemOpts)

    //Update Item
    fastify.put('/items/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes;
