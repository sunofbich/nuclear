// 加载express模块
const express = require('express');
// 加载Mysql模块
const mysql = require('mysql');
// 加载bodyParser模块
const bodyParse = require('body-parser');
// 加载MD5模块
const md5 = require('md5');
// 创建Mysql连接池
//需要修改
const pool = mysql.createPool({
    host: 'w.rdc.sae.sina.com.cn',   //MySQL服务器地址
    port: 3306,          //MySQL服务器端口号
    user: 'yz0l4x5wj4',        //数据库用户的用户名
    password: 'j42z5y0mmiyxzkk32wwj01ihyj5kl4',        //数据库用户密码
    database: 'app_teamwork',    //数据库名称
    connectionLimit: 20, //最大连接数
    charset: 'utf8'      //数据库服务器的编码方式
  });
//   创建服务器对象
const server = express();

server.use(bodyParse.urlencoded({
    extended:false
}))

// 加载CORS模块 
const cors = require('cors');

// 使用CORS中间件 
//需修改
server.use(cors({
    origin:['http://w.rdc.sae.sina.com.cn:5050']
}));

//*************************************************************** */
// 所有文章分类接口
// 首页
server.get('/detail', (req, res) => {
    //获取地址栏中的id参数
    // let id = req.query.id;
  
    // SQL查询
    let sql = "SELECT title FROM np_news ";
  
    // 执行SQL查询
    pool.query(sql, (error, results) => {
      if (error) throw error;
      // 返回数据到客户端
      res.send({ message: 'ok', code: 200, result: results[0] });
    });
  
  });
//
// *****************************************************************
// 指定服务器监听的端口号
server.listen(5050,()=>{
    console.log('服务器监听中...')
})