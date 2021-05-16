import axios from 'axios';
import router from '../router';


function goPost(back) { //定义回调函数
    axios({
      method: 'POST',
      url: 'guide/relationship',
      headers: {
        token: localStorage.getItem('token') || axios.token //放自己的token
      }
    }).then(res=>{
      back(res) //回调函数
    }).catch(err=>{
      console.log(err)
    })
  }


  function goGet(back) { //定义回调函数
    axios({
      method: 'get',
      url: 'guide/relationship',
      headers: {
        token: localStorage.getItem('token') || axios.token //放自己的token
      }
    }).then(res=>{
      back(res) //回调函数
    }).catch(err=>{
      console.log(err)
    })
  }
  
  export default {
    relationship  //抛出去
  }
