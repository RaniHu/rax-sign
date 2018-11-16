import {createElement, Component, PropTypes} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import Day from './Day';
import moment from './moment';
import styles from './styles';



export default class Calendar extends Component {
  state = {
    currentMonthMoment: moment(this.props.today),
    isSign:false,
  };

  static propTypes = {
    dayHeadings: PropTypes.array,
    monthNames: PropTypes.array,
    titleFormat: PropTypes.string,
    dateFormat: PropTypes.string,
    today: PropTypes.any,
    weekStart: PropTypes.number,
    signList:PropTypes.array,
  };

  static defaultProps = {
    dayHeadings: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    titleFormat: 'MMMM YYYY',
    dateFormat: 'YYYY-MM-DD',
    today: moment(),
    weekStart: 0,
    signList:[],
  };




  getMonthStack(currentMonth) {
    return [moment(currentMonth)];
  }


  //==========渲染当月日历视图===========
  renderMonthView(argMoment) {
    let
      renderIndex = 0,
      weekRows = [],
      days = [],
      startOfArgMonthMoment = argMoment.startOfMonth();

    const
      weekStart = this.props.weekStart,
      argMonthDaysCount = argMoment.daysInMonth(),
      offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7;

    if (!argMoment.isValid()) {
      console.error('[currentMonthMoment] is not valid, make sure [selectedDate startDate endDate today] are valid date');
      return null;
    }


    do {
      const dayIndex = renderIndex - offset;

      if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
        days.push(
          <Day
            key={`${renderIndex}`}
            caption={`${dayIndex + 1}`}
            signList={this.props.signList}
          />
        );
      } else {
        days.push(<Day key={`${renderIndex}`} filler />);
      }
      if (renderIndex % 7 === 6) {
        weekRows.push(
          <View
            key={weekRows.length}
            style={[styles.weekRow]}
          >
            {days}
          </View>);
        days = [];
        if (dayIndex + 1 >= argMonthDaysCount) {
          break;
        }
      }
      renderIndex += 1;
    } while (true);


    return (
      <View key={argMoment.month()} style={styles.monthContainer}>
        {weekRows}
      </View>
    );
  }


  //============渲染头部星期===========
  renderHeading() {
    const headings = [];
    for (let i = 0; i < 7; i++) {
      const j = (i + this.props.weekStart) % 7;
      headings.push(
        <Text
          key={i}
          style={j === 0 || j === 6 ?
            [styles.weekendHeading] :
            [styles.dayHeading]}
        >
          {this.props.dayHeadings[j]}
        </Text>
      );
    }

    return (
      <View style={styles.calendarHeading}>
        {headings}
      </View>
    );
  }

  //============渲染顶部日期标题===========
  renderTopBar() {
    return (
        <View style={styles.calendarControls}>
            <Text style={styles.title}>
                {this.state.currentMonthMoment.format(this.props.titleFormat)}
            </Text>
        </View>
        )
  }

  render() {
    const calendarDates = this.getMonthStack(this.state.currentMonthMoment);
    let calendarDatesNode = calendarDates.map((date) => this.renderMonthView(moment(date)));
    return (
      <View style={styles.calendarContainer}>
        {this.renderTopBar()}
        {this.renderHeading(this.props.titleFormat)}
        <View style={{height: calendarDatesNode[0].props.children.length * 92}}>
          {calendarDatesNode}
        </View>
      </View>
    );
  }
}
