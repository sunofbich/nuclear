// 加载express模块
const express = require('express');
// 加载Mysql模块
const mysql = require('mysql');
// 加载bodyParser模块
const bodyParse = require('body-parser');
// 加载MD5模块
// const md5 = require('md5');
// 创建Mysql连接池
//需要修改
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST, //MySQL服务器地址
    port: process.env.MYSQL_PORT, //MySQL服务器端口号
    user: process.env.ACCESSKEY, //数据库用户的用户名
    password : process.env.SECRETKEY,
    database : 'app_' + process.env. APPNAME, //数据库用户密码
    // database: 'app_teamwork', //数据库名称
    connectionLimit: 20, //最大连接数
    charset: 'utf8' //数据库服务器的编码方式

    // host: '127.0.0.1',   //MySQL服务器地址
    // port: '3306',          //MySQL服务器端口号
    // user: 'root',        //数据库用户的用户名
    // password: '',        //数据库用户密码
    // database: 'newclear_pollution',    //数据库名称
    // connectionLimit: 20, //最大连接数
    // charset: 'utf8'      //数据库服务器的编码方式
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
    origin:['http://127.0.0.1:8080','http://loclahost:8080']
}));

//*************************************************************** */
// 所有文章分类接口
// 首页
server.get('/category', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let sql = 'SELECT category_id,category_name FROM np_category ORDER BY category_id';
  // 执行SQL语句
  pool.query(sql, (error, results) => {
  if (error) throw error;
  res.send({ message: 'ok', code: 200, results: results });
  });
  });
  // 详情页面
  server.get('/detail', (req, res) => {
  //获取地址栏中的id参数
  let id = req.query.id;
  
  // SQL查询 
  let sql = "SELECT np_news.news_id,title,abstract,content,image,created_at FROM np_news inner join np_author on np_news.author_id=np_author.author_id where np_news.news_id=? ";
  
  // 执行SQL查询
  pool.query(sql, [id],(error, results) => {
  if (error) throw error;
  // 返回数据到客户端
  res.send({ message: 'ok', code: 2000, result: results[0] });
  });
  
  });
//
// *****************************************************************
// 指定服务器监听的端口号
server.listen(3000,()=>{
    console.log('服务器监听中...')
})