var express = require('express');
var router = express.Router();
var todoModel=require('../model/index.js')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.route('/todos').get(function(req, res, next) {
  todoModel.find({},function(err,todos){
    console.log(req)
    if(err){
      console.log(err);
      res.send({code:0,msg:'查询错误'});

    }else{
      res.send(todos);
    }
  });
}).post(function(req,res){
  todoModel.create(req.body,function(err,todo){
    //todo是保存后的对象，发送个诶客户端
    if(err){
      res.send({code:0,msg:'添加错误'});

    }else{
      res.send(todo);
    }

  })
});
router.route('/todos/:_id').delete(function(req,res){
  todoModel.remove({_id:req.params._id},function(err,result){
    if(err){
      res.send({code:0,msg:'删除错失败'});

    }else{
      res.send({code:1,msg:'删除成功'});
    }
  })
})
module.exports = router;
