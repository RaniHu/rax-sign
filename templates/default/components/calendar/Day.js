import {createElement, Component, PropTypes} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './styles';

export default class Day extends Component {

  static propTypes = {
    caption: PropTypes.any,
    filler: PropTypes.bool,
    signList:PropTypes.array
  }

  //==========day不同状态下的样式===========
  dayTextStyle = (day) => {
    const dayTextStyle = [styles.day];
    const curDay=new Date().getDate();

      //未签到的日期
      if(parseInt(day)<curDay){
          dayTextStyle.push(styles.unSignDayText);
      }
      if(this.props.signList.length>0){
          this.props.signList.forEach((item)=>{
              //已签到的日期
              if(parseInt(day)===parseInt(item)){
                  dayTextStyle.push(styles.signDayText);
              }
          })
      }

    return dayTextStyle;
  }

  render() {
    let { caption } = this.props;
    const {
      filler,
    } = this.props;

    return filler
      ?
      <view>
        <View style={styles.dayButtonFiller}>
          <Text style={styles.day} />
        </View>
      </view>

      :
      <view>
        <View style={styles.dayButton}>
          <View style={{alignItems:'center'}}>
            <Text style={this.dayTextStyle(caption)}>{caption}</Text>
              {
                  this.props.signList.length>0?this.props.signList.map((item)=>{
                    if(parseInt(caption)===parseInt(item)){
                        return(
                            <span style={{width:8,height:8,backgroundColor:'#FFC37B',borderRadius:4}}></span>
                        )
                    }
                  }):null
              }
          </View>
        </View>
      </view>
    ;
  }
}
