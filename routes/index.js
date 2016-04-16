var express = require('express');
var router = express.Router();
var todoModel=require('../model');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//先给路由指定路径，再指定方法，还可以链式调用
router.route('/todos').get(function(req, res, next) {
  todoModel.find({},function(err,todos){
    //console.log(req);
    if(err){
      console.log(err);
      res.send({code:0,msg:'查询错误'});

    }else{
      res.send(todos);
    }
  });
}).post(function(req,res){
    todoModel.create(req.body,function(err,todo){
    console.log(todo)
    //todo是保存成功后的对象，返回给客户端
    if(err){
      res.send({code:0,msg:'添加错误'});

    }else{
      res.send(todo);
    }

  })
});
router.route('/todos/:_id').delete(function(req,res){
  todoModel.remove({_id:req.params._id},function(err,result){
    if(err){ //result里面的数字显示删除的条数，>0才有效
      res.send({code:0,msg:'删除错失败'});

    }else{
      res.send({code:1,msg:'删除成功'});
    }
  })
})

router.route('/todos/delete').delete(function(req,res){
  var ids=req.body;
  todoModel.remove({_id:{$in:ids}},function(err,result){
    if (err) {
       res.send({code: 0, msg: '删除失败!'});
    } else {
      //把保存到数据库中之后的对象发送给客户端
       res.send({code: 1, msg: '删除成功!'});
    }
  });
})

module.exports = router;
