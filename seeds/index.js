const sequelize = require('../config/connection');
const seedUser = require('./user-seeds');
const seedPost = require('./post-seeds');
const seedComment = require('./comment-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true});
    console.log('database created');
    await seedUser();
    console.log('USERS SUCCESSFULLY SEEDED!');

    await seedPost();
    console.log('POSTS SUCCESSFULLY SEEDED!');

    await seedComment();
    console.log('COMMENTS SUCCESSFULLY SEEDED!');
    
    process.exit(0);
}

seedAll();