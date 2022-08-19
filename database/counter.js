import Mongoose from 'mongoose';


const CounterSchema = Mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});


export const CounterModel = Mongoose.model('Counters', CounterSchema);