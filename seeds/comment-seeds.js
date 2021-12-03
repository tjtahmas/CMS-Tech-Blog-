const { Comment } = require('../models');

const commentdata = [
    {
        title: 'Welcome!',
        content: 'I am so glad that you are on the site with me!',
        post_id: '1',
        user_id: '2'
    },
    {
        title: 'Those are errors...',
        content: 'Hey, the red lines means that you have an error in your code. Fix the error and the line will go away.',
        post_id: '2',
        user_id: '2'
    },
    {
        title: 'Color Theory is complicated',
        content: 'I am not sure if CSS has every color, but I am sure they have whatever you are looking for.',
        post_id: '3',
        user_id: '1'
    },
    {
        title: 'IT ISNT THERE',
        content: 'I KNOW THERE ARE LOTS OF COLORS BUT THE ONE I WANT ISNT ON THERE!!!',
        post_id: '3',
        user_id: '2'
    },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;