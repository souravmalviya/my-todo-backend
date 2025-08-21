const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const ObjectId= mongoose.ObjectId;

const Users=  new Schema( {
    email: {type: String, unique: true },
    password: String,
    name: String

})

const todo=  new Schema( {
    title: String,
    done: Boolean,
    userId: ObjectId
})

//
const userModel= mongoose.model('users', Users) //'' ke andar means wheere u want to put the data 
const TodoModel= mongoose.model('todos', todo)
//exporing the fle to the next page for backenf 
module.exports = {
    userModel: userModel,
    TodoModel: TodoModel
}
//exporing object where 