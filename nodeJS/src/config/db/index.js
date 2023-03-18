const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://leminhdai2089:01678341226a@cluster0.48efllu.mongodb.net/sample_mflix', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!');
    } catch (error) {
        console.log('Connect failure!!');
    }
};

module.exports = { connect };
