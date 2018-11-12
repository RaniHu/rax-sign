import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Link from 'rax-link';
import Image from 'rax-image';
import Touchable  from 'rax-touchable';
import Calendar from 'rax-calendar';
import Toast from 'universal-toast';
import Modal from 'rax-modal';
import { isAbsolute, relative } from 'upath';


class App extends Component{
    
    state={
      selectedDate:'',                             //当前日期
      isSign:true                                 //是否已签到
    }


    //签到操作
    signHandle(){
      if(this.state.isSign){
        Toast.show("亲，您今天已经签到过了");
      }else{
        this.setState({isSign:true});
        this.refs.signSuccess.show();
      }
    }

    hideSignBox(){
    
    }


    render(){

      //==========自定义日历样式===========
      let calendarCustomStyle={
        calendarControls:{borderTopColor:'#F2F2F2',borderTopWidth:1,borderTopStyle:'solid'},
        title:{margin:20,fontSize:34},
        calendarHeading:{borderTopWidth:0,borderBottomColor:'#F2F2F2',paddingBottom:16,marginBottom:10},                       //头部
        dayButton:{borderTopWidth:0,padding:2,borderColor:'#ffffff'},                                                                   //day中的按钮
        day:{fontSize:30,padding:0},                                                                           //day中的文字
        weekendDayText:{color:'#333333'},                                                                      //day中是周末的文字        
        weekendHeading:{color:'red',fontSize:28},                                                              //头部是周末的文字
        dayHeading:{fontSize:28},                                                                              //头部文字
      };

      return(
        <View style={{backgroundColor:'#F7F7F7'}}>

          {/* 签到 */}
          <View style={styles.signContainer}>
            <View style={styles.signRow}>
              <Touchable style={[styles.pointCommon,styles.myPoint]}><Text style={[styles.whiteText,{marginTop:12}]}>339</Text><Text style={styles.whiteText}>我的积分</Text></Touchable>
              <Touchable onPress={()=>{this.signHandle()}} style={styles.signBtn}><Text style={styles.signText}>{this.state.isSign?'已签到':'签到'}</Text></Touchable>
              <Touchable style={[styles.pointCommon,styles.pointStore]}><Text style={[styles.whiteText,{lineHeight:90}]}>积分商城</Text></Touchable>              
            </View>
            <View style={{justifyContent:'center',flexDirection:'row'}}>
              <View  style={styles.signDayBox}>
                <span style={styles.trangleTop}></span>
                <Text style={styles.signDay}>已连续签到0天</Text>
                {this.state.isSign?<Text style={styles.greyText}>明日签到领5积分</Text>:null}
              </View>
            </View>
          </View>
          {this.state.isSign?<View><Text style={styles.signPrompt}>还需连签6天，额外奖励45积分!</Text></View>:null}

          {/* 签到成功弹出框*/}
          <Modal ref='signSuccess' contentStyle={{width:502,height:'auto'}}  onShow={this.hideSignBox()} >
            <View style={{width:502}}>
              <Image></Image>
              <Text style={{textAlign:'center',lineHeight:95,width:'100%',display:'block'}}>签到成功!</Text>
            </View>
          </Modal>
        

          {/* 日历 */}
          <Calendar
            customStyle={calendarCustomStyle}          
            isDisabled={false}
            titleFormat={'YYYY年MM月'}
            showControls={false}
            showDayHeadings={true}
            weekStart={0}
            dayHeadings={['日', '一', '二', '三', '四', '五', '六']}
            onDateSelect={()=>{}}
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
    left:'50%',
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
