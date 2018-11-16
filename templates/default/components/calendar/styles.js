const DEVICE_WIDTH = 750;

const styles = {
  calendarContainer: {
    backgroundColor: '#ffffff',
  },
  monthContainer: {
    width: DEVICE_WIDTH,
  },
  monthHeading: {
    padding: 10,
    alignItems: 'center',
    borderBottom: '1rem solid #f7f7f7',
    fontSize: 30,
  },
  calendarControls: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderTopColor:'#F2F2F2',
    borderTopWidth:1,
    borderTopStyle:'solid'
  },
  controlButtonText: {
    margin: 20,
    fontSize: 30,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 34,
    margin: 20,
  },
  calendarHeading: {
    flexDirection: 'row',
    paddingBottom:16,
    marginBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#f2f2f2'
  },
  dayHeading: {
    flex: 1,
    fontSize:28,
    textAlign: 'center',
    marginVertical: 10,
  },
  weekendHeading: {
    flex: 1,
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 10,
    color: 'red',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayButton: {
    alignItems: 'center',
    width: DEVICE_WIDTH / 7,
      height:56

  },
  dayButtonFiller: {
    width: DEVICE_WIDTH / 7,
      height:56
  },
  day: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#000000',
  },

    //未签到的日期文字
    unSignDayText:{
        color:'#999999'
    },

  //已签到的日期文字
  signDayText: {
    fontWeight: 'bold',
    color:'#F9635C'
  },




};

export default styles;
