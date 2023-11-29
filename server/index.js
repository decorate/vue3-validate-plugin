const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const validateRequest = (req, res, next) => {
    if (req.method === 'POST' && !req.body.name) {
        return res.status(422).json({
            errors: {
                id: ['id is required'],
                name: ['name is required', 'name is string'],
                email: ['email is required'],
                createdAt: ['日付は必須です'],
                updatedAt: ['更新日は必須です']
            },
            message: 'idは必須です。 (and 4 more errors)'
        });
    }
    if (req.method === 'PUT' && !req.body.name) {
        return res.status(421).json({
            message: 'default error'
        });
    }
    if (req.method === 'PATCH' && !req.body.name) {
        return res.status(430).json({
            message: 'permission error'
        });
    }
    next();
};

server.use(validateRequest);

server.get('*', (req, res) => {
    res.status(200).json(req.query);
});

server.post('*', (req, res) => {
    res.status(201).json(req.body);
});

server.put('*', (req, res) => {
    res.status(200).json(req.body);
});

server.delete('*', (req, res) => {
    res.status(204).end();
});

server.listen(3000, () => {
    console.log('JSON Server is running');
});