// 加载express模块
const express = require('express');
// 加载Mysql模块
const mysql = require('mysql');
// 加载bodyParser模块
const bodyParser = require('body-parser');
// 加载MD5模块
const md5 = require('md5');
// 创建Mysql连接池
//需要修改
const pool = mysql.createPool({
  // host: process.env.MYSQL_HOST, //MySQL服务器地址
  // port: process.env.MYSQL_PORT, //MySQL服务器端口号
  // user: process.env.ACCESSKEY, //数据库用户的用户名
  // password : process.env.SECRETKEY,
  // database : 'app_' + process.env. APPNAME, //数据库用户密码
  // // database: 'app_teamwork', //数据库名称
  // connectionLimit: 20, //最大连接数
  // charset: 'utf8' //数据库服务器的编码方式

  host: '127.0.0.1',   //MySQL服务器地址
  port: '3306',          //MySQL服务器端口号
  user: 'root',        //数据库用户的用户名
  password: '',        //数据库用户密码
  database: 'newclear_pollution',    //数据库名称
  connectionLimit: 20, //最大连接数
  charset: 'utf8'      //数据库服务器的编码方式
});
//   创建服务器对象
const server = express();

server.use(bodyParser.urlencoded({
  extended: false
}))

// 加载CORS模块 
const cors = require('cors');

// 使用CORS中间件 
//需修改
server.use(cors({
  origin: ['http://82.157.103.228:80','http://npfive.cn']
}));

//*************************************************************** */
// 所有文章分类接口
// 首页  已通过
server.get('/category', (req, res) => {
  // SQL语句以获取文章分类表的数据
  let sql = 'SELECT category_id,category_name FROM np_category ORDER BY category_id';
  // 执行SQL语句
  pool.query(sql, (error, results) => {
    if (error) throw error;
    res.send({ message: 'ok', code: 200, results: results });
  });
});

//****************************************************************//
// //list接口  已通过
// 获取指定分类下包含文章数据的接口
server.get('/list', (req, res) => {
  // 获取客户端传递的cid参数
  let cid = req.query.category_id;

  // 获取客户端传递的page参数
  let page = req.query.page? req.query.page : 1;

  // 存储每页显示的记录数
  let pagesize = 5;

  // 通过公式来计算从第几条记录开始返回
  let offset = (page - 1) * pagesize;

  // 用于存储获取到的总记录数
  let rowcount;

  // 获取指定分类下的文章总数
  let sql = 'SELECT COUNT(news_id) AS count FROM np_news WHERE category_id=?';

  pool.query(sql, [cid], (error, results) => {
    if (error) throw error;
    // 将获取到总记录数赋给rowcount变量
    rowcount = results[0].count;
    /**************************************************/
    // 根据总记录数和每页显示的记录数来计算总页数
    let pagecount = Math.ceil(rowcount / pagesize);

    // 查询SQL语句
    sql = 'SELECT news_id, title,author_id, image,created_at FROM np_news WHERE category_id=? LIMIT ?,?';
    // 执行SQL
    pool.query(sql, [cid, offset, pagesize], (error, results) => {
      if (error) throw error;
      res.send({ message: 'ok', code: 200, results: results, pagecount: pagecount });
    });
  });
});


// 详情页面
server.get('/detail', (req, res) => {
  //获取地址栏中的id参数
  let id = req.query.news_id;

  // SQL查询 
  let sql = "SELECT np_news.news_id,title,abstract,content,image,created_at FROM np_news inner join np_author on np_news.author_id=np_author.author_id where np_news.news_id=? ";

  // 执行SQL查询
  pool.query(sql, [id], (error, results) => {
    if (error) throw error;
    // 返回数据到客户端
    res.send({ message: 'ok', code: 200, results: results[0] });
  });
});
//author页面接口
server.get('/author', (req, res) => {
  let author_id = req.query.author_id
  // SQL语句以获取文章分类表的数据
  let sql = 'SELECT author_name,author_avatar FROM np_author where author_id=?';
  // 执行SQL语句
  pool.query(sql, [author_id], (error, results) => {
    if (error) throw error;
    res.send({ message: 'authot is ok', code: 200, results: results });
  });
});

// 
//评论表接口
server.get('/comment', (req, res) => {
  var news_id = req.query.news_id
  // SQL语句以获取文章分类表的数据
  let sql = 'SELECT comment_content,comment_id,user_id FROM np_news_comment where news_id=?';
  // 执行SQL语句
  pool.query(sql, [news_id], (error, results) => {
    if (error) throw error;
    res.send({ message: 'comment is ok', code: 200, results: results });
  });
});

//用户注册接口
server.post('/register', (req, res) => {
  //console.log(md5('12345678'));
  // 获取用户名和密码信息
  let user_name = req.body.user_name;
  let upwd = req.body.upwd;
  //以username为条件进行查找操作，以保证用户名的唯一性
  let sql = 'SELECT COUNT(user_id) AS count FROM np_user WHERE user_name=?';
  pool.query(sql, [user_name], (error, results) => {
    console.log(results);
    if (error) throw error;
    let count = results[0].count;
    if (count == 0) {
      // 将用户的相关信息插入到数据表
      sql = 'INSERT np_user(user_name,upwd) VALUES(?,?)';
      pool.query(sql, [user_name, upwd], (error, results) => {
        if (error) throw error;
        res.send({ message: 'ok', code: 200 });
      })
    } else {
      res.send({ message: 'user exists', code: 201 });
    }
  });
});

// 用户登录接口
server.post('/login', (req, res) => {
  //获取用户名和密码信息
  let user_name = req.body.user_name;
  let upwd = req.body.upwd;
  // SQL语句
  let sql = 'SELECT user_id,user_name,phone,avatar FROM np_user WHERE user_name=? AND upwd=?';
  pool.query(sql, [user_name, upwd], (error, results) => {
    console.log(results)
    if (error) throw error;
    if (results.length == 0) { //登录失败
      res.send({ message: 'login failed', code: 201 });
    } else {                 //登录成功
      res.send({ message: 'ok', code: 200, result: results[0] });
    }
  });
});

//
// *****************************************************************
// 指定服务器监听的端口号
server.listen(3000, () => {
  console.log('服务器监听中...')
})