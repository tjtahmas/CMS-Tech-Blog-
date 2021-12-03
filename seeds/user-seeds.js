const { User } = require('../models');

const userdata = [
    {
        username: 'user123',
        email: 'user123@email.com',
        password: 'password123'
    },
    {
        username: 'newguy456',
        email: 'newguy456@email.com',
        password: 'password456'
    },
];

const seedUser = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUser;