const mongoose = require('mongoose');

const coneSchema = new mongoose.Schema({
    height: {
        type: Number,
        required: [true, 'Поле должно быть заполнено'],
    },
    radius: {
        type: Number,
        required: [true, 'Поле должно быть заполнено'],
    },
    segments: {
        type: Number,
        required: [true, 'Поле должно быть заполнено'],
    }
}, { versionKey: false });

module.exports = mongoose.model('cone', coneSchema);