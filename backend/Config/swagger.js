const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product Management API',
            version: '1.0.0',
            description: 'API documentation for Product Management System',
            contact: {
                name: 'API Support',
                email: 'support@productmanagement.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'session'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    required: ['email', 'password', 'name'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'User ID'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address'
                        },
                        password: {
                            type: 'string',
                            description: 'User password'
                        },
                        name: {
                            type: 'string',
                            description: 'User name'
                        },
                        isVerified: {
                            type: 'boolean',
                            description: 'Email verification status'
                        }
                    }
                },
                Category: {
                    type: 'object',
                    required: ['cat_name'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Category ID'
                        },
                        cat_name: {
                            type: 'string',
                            description: 'Category name'
                        },
                        cat_description: {
                            type: 'string',
                            description: 'Category description'
                        }
                    }
                },
                SubCategory: {
                    type: 'object',
                    required: ['subcat_name', 'cat_id'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'SubCategory ID'
                        },
                        subcat_name: {
                            type: 'string',
                            description: 'SubCategory name'
                        },
                        cat_id: {
                            type: 'string',
                            description: 'Parent Category ID'
                        },
                        subcat_description: {
                            type: 'string',
                            description: 'SubCategory description'
                        }
                    }
                },
                Product: {
                    type: 'object',
                    required: ['p_name', 'p_price', 'cat_id', 'subcat_id'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Product ID'
                        },
                        p_name: {
                            type: 'string',
                            description: 'Product name'
                        },
                        p_price: {
                            type: 'number',
                            description: 'Product price'
                        },
                        p_description: {
                            type: 'string',
                            description: 'Product description'
                        },
                        cat_id: {
                            type: 'string',
                            description: 'Category ID'
                        },
                        subcat_id: {
                            type: 'string',
                            description: 'SubCategory ID'
                        },
                        p_image: {
                            type: 'string',
                            description: 'Product image URL'
                        }
                    }
                }
            }
        }
    },
    apis: ['./Routes/*.js', './Controller/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
