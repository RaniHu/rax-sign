import {createElement, Component, PropTypes} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Touchable from 'rax-touchable';

//样式
import styles from './styles';


export default class Calendar extends Component {

    

    render() {
       
        return (
          <View style={styles.calendarContainer}>
            {this.renderTopBar()}
            {this.renderHeading(this.props.titleFormat)}
            <View>
              {calendarDatesNode}
            </View>
          </View>
        );
      }
}


