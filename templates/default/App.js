import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Link from 'rax-link';
import Image from 'rax-image';
import Touchable  from 'rax-touchable';
import Toast from 'universal-toast';
import Modal from 'rax-modal';
import {get,post} from './fetch';

//日历子组件
import Calendar from './components/calendar';

//接口ip
import {requestHost} from './ipconfig';

//与native交互的module
// const myMeModule = __weex_require__('@weex-module/MyMeModule');



class App extends Component{

    state={
      currentDay:new Date().getDate(),                        //当前日期
      isSignToday:false,                                      //今日是否已签到
      signInfo:{},                                            //签到信息
      signDateList:[],                                        //已签到日历
      tips_str1:'已连续签到0天',
      userId:'',                                               //用户id
      requestIp:''
    }

    componentDidMount(){

      //判断当前环境
      let isProducation = process.env.NODE_ENV === 'production';
      if(isProducation){
        let self=this;        
        this.setState({requestIp:requestHost.devIp});
       //从native端获取用户id
        myMeModule.getUserId(function(param){
          let userId=JSON.parse(param).userId;
          self.setState({userId:userId});
          self.getSignInfo(userId);
        })
      }else{
        this.setState({userId:'test03'});
        this.getSignInfo(this.state.userId);
      }

            
    

    }


    // ==========获取签到信息==========
    getSignInfo(userId){      
        let url=this.state.requestIp+'/api/unifyHttp.do?userId='+userId+'&method=USER_SIGN_IN_INFO&terNo=SM-G9008V&weblogId=9d92f8613a3a3028f96bc460b32538ba%3A91DBT';
        if(userId){
          post(url).then(result=>{
            return result.json();
        }).then(json=>{
            let signList=json.result.signMap?Object.keys(json.result.signMap):[];
            this.setState({
                signInfo:json.result,
                signDateList:signList
            })
            this.isTodaySign(signList);
        })
            .catch(error => {
                alert(error);
                console.error(error);
            })
        }else return false;
     
    }

    // ========发送签到请求=========
    sendSignIn(){
      let userId=this.state.userId;
      let currentDay=this.state.currentDay;
      let signInUrl=this.state.requestIp+'/api/unifyHttp.do?userId='+userId+'&time='+currentDay+'&appVersion=6.5.5-debug&method=USER_SIGN_IN&terNo=SM-G9008V&weblogId=9d92f8613a3a3028f96bc460b32538ba%3A91DBT&ua=android';
      post(signInUrl).then(result=>{
        return result.json();
      }).then(json=>{
        if(json.isOk===0){
             alert("签到请求成功!");
            this.getSignInfo(userId);
            this.refs.signSuccess.show();
        }
      }) 
        .catch(error => {
        alert(error);
        console.error(error);
    })
    }


    //=======今天是否签到=======
    isTodaySign(signList){
      if(signList.length>0){
        signList.forEach((item,index)=>{
          if(parseInt(item)==this.state.currentDay){
            let curSignList=this.state.signDateList;
            this.setState({
                isSignToday:true,
            });
          }
        })
      }

    }


    // ===========点击签到事件==========
    signHandle(){
      if(this.state.isSignToday){
        Toast.show("亲，您今天已经签到过了");
      }else{
         alert("即将调用签到接口!");        
         this.sendSignIn();
      }
    }

    hideSignBox(){

    }


    render(){

      //签到成功图片
      let signSuccessImg={
        uri:'http://s.banggo.com/pub7/images/mbshop/weex/sign_success.jpg'
      }


      return(
        <View style={{backgroundColor:'#F7F7F7'}}>

          {/* 签到 */}
          <View style={styles.signContainer}>
            <View style={styles.signRow}>
              <Touchable style={[styles.pointCommon,styles.myPoint]}><Text style={[styles.whiteText,{marginTop:12}]}>{this.state.signInfo.points}</Text><Text style={styles.whiteText}>我的积分</Text></Touchable>
              <Touchable onPress={()=>this.signHandle()} style={styles.signBtn}><Text style={styles.signText}>{this.state.isSignToday?'已签到':'签到'}</Text></Touchable>
              <Link href={this.state.signInfo.points_url} style={[styles.pointCommon,styles.pointStore]}><Text style={[styles.whiteText,{lineHeight:90}]}>积分商城</Text></Link>
            </View>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
              <View  style={styles.signDayBox}>
                <span style={styles.trangleTop}></span>
                <Text style={styles.signDay}>{this.state.signInfo.tips_str1}</Text>
                {this.state.isSignToday?<Text style={styles.greyText}>{this.state.signInfo.tips_str2}</Text>:null}
              </View>
            </View>
          </View>
          {this.state.isSignToday?<View><Text style={styles.signPrompt}>{this.state.signInfo.tips_str3}</Text></View>:null}

          {/* 签到成功弹出框*/}
          <Modal ref='signSuccess' contentStyle={{width:502,height:'auto'}}  onShow={this.hideSignBox()} >
            <View style={{width:502}}>
              <Image source={signSuccessImg} style={{width:502,height:375}}></Image>
            </View>
          </Modal>


          {/* 日历 */}
          <Calendar
            titleFormat={'YYYY年MM月'}
            signList={this.state.signDateList}
          />

        </View>
      )
    }
}

let styles={
  signContainer:{
    height:504,
    paddingTop:70,
    backgroundColor:'#FC7C36',
  },


  signRow:{
    marginBottom:47,
    flexDirection:'row',
    justifyContent:'space-between',
    color:'#ffffff'
  },
  //签到按钮
  signBtn:{
    width:220,
    height:220,
    borderWidth:6,
    borderColor:'#ffffff',
    borderRadius:110,
    alignItems:'center',
    justifyContent:'center'
  },
  //签到文字
  signText:{
    color:'#FFFFFF',
    fontSize:42
  },
  //我的积分和积分商城
  pointCommon:{
    width:170,
    height:90,
    marginTop:110,
    borderRadius:35,
    backgroundColor:'#FE9A6E',
  },
  //我的积分
  myPoint:{
    marginLeft:-20
  },
  //积分商城
  pointStore:{
    marginRight:-20,
  },
  whiteText:{
    textAlign:'center',
    fontSize:24,
    color:'#FFFFFF',
  },




  //签到天数盒子
  signDayBox:{
    position:'relative',
    width:530,
    height:100,
    textAlign:'center',
    borderRadius:10,
    backgroundColor:'#FFF2ED',
    justifyContent:'center'
  },
  //向上小三角
  trangleTop:{
    position:'absolute',
    width:0,
    height:0,
    fontSize:0,
    top:-24,
    left:265,
    marginLeft:-6,
    borderWidth:12,
    borderStyle:'solid',
    borderTopColor:'transparent',
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderBottomColor:'#FFF2ED'

  },
  //签到天数
  signDay:{
    fontSize:26,
    color:'#CB6E50',
    textAlign:'center',
    marginBottom:8
  },
  //签到文字描述
  greyText:{
    textAlign:'center',
    fontSize:22,
    color:'#A3A1A0',
  },




  //签到后提示
  signPrompt:{
    height:82,
    lineHeight:82,
    textAlign:'center',
    color:'#A6A6A6',
    fontSize:24,
    backgroundColor:'#ffffff',
    marginBottom:16,
    borderBottomWidth:1,
    borderColor:'#F2F2F2'
  }


}


export default App;
