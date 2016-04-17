/**
 * Created by dell on 2016/3/31.
 */

var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gqzTodo');
module.exports=mongoose.model('todo',mongoose.Schema({
    text:String
}));