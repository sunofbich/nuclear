#设置客户端连接服务器端的编码
set names utf8;
#丢弃数据库如果存在
drop database if exists newclear_pollution;
#创建数据库，设置存储的编码
create database newclear_pollution charset=utf8;
#进入数据库
use newclear_pollution;

#1. 创建保存用户信息的表
create table np_user(
  user_id int primary key auto_increment,
  upwd varchar(32),
  phone varchar(16),
  avatar varchar(60),
  user_name varchar(30) unique
);

#2. 创建保存文章类别的表
create table np_category(
  category_id smallint(5) primary key auto_increment,
  category_name varchar(30)
);

#3. 创建保存author的表
create table np_author(
author_id smallint primary key auto_increment,
author_name varchar(30) unique,
author_avatar varchar(50)
);

#4. 创建保存评论的表
create table np_news_comment(
  comment_id int primary key auto_increment,
  user_id int,
  news_id int,
  comment_content varchar(255),
  foreign key(user_id) references np_user(user_id)
  );

#5. 创建保存新闻的表
create table np_news(
  news_id int primary key auto_increment,
  title varchar(50),
  abstract varchar(50),
  content mediumtext,
  image varchar(50),
  category_id smallint(5),
  author_id smallint,
  created_at date,
  user_id int,
  foreign key(user_id) references np_user(user_id),
  foreign key(category_id) references np_category(category_id),
  foreign key(author_id) references np_author(author_id)
);

