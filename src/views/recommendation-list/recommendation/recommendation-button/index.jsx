import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { inject, observer } from 'mobx-react';
import { post_log_of_mouseclick_recommendation } from '../../../../log/post-log-SDK';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import TopicsModal from './topics-modal';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  white: {
    color: 'white'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  select: {
    borderColor: 'white'
  },
  button: {
    margin: theme.spacing.unit,
    color: 'white',
    borderColor: 'white'
  },
  focused: {
    '&$focused': { color: 'white' }
  }
});

@inject('appState')
@observer
class RecommendationButton extends React.Component {
  state = {
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = (event) => {
    this.props.setSet({ name: event.target.value });
    // this.props.appState.chooseTopic('选择知识主题', -1);
  };

  handleConfirm = (studentCode, courseId, domainName, event) => {
    if (this.props.recname !== this.props.appState.currentRecommendation) {
      if (this.props.recname === '零基础') {
        this.props.appState.setCurrentRecommendation(this.props.recname);
        if (studentCode !== -1 && courseId !== -1 && domainName !== undefined) {
          post_log_of_mouseclick_recommendation('学习页面', this.props.recname, studentCode, courseId, domainName);
        }
      }
      else if (this.props.appState.chosenTopic.topicName === '选择知识主题') {
        alert('请选择知识主题');
      } else {
        this.props.appState.setCurrentRecommendation(this.props.recname);
        if (studentCode !== -1 && courseId !== -1 && domainName !== undefined) {
          post_log_of_mouseclick_recommendation('学习页面', this.props.recname, studentCode, courseId, domainName);
        }
      }
    }
  };

  showModal = () => {
    this.props.appState.setTopicListVisible(true);
    // if (studentCode !== -1 && courseId !== -1 && domainName !== undefined) {
    //   post_log_of_mouseclick_Global_Graph('学习页面', studentCode, courseId, domainName);
    // }
  };

  render() {
    const { classes, appState } = this.props;
    let studentCode = appState.studentCode;
    let courseId = appState.courseId;
    let domainName = appState.domainName.get();
    const recnames = [
      '零基础',
      '自定义学习',
      '速成学习'
    ];
    if (appState.allLearningPath.get() !== undefined && appState.currentTopic.topicId === -1) {
      // console.log('test');
      appState.setCurrentTopicId(appState.currentRecommendationList[0].topicId);
      appState.setCurrentTopicName(appState.currentRecommendationList[0].topicName);
    }
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
            className={classes.white}
            FormLabelClasses={{ focused: classes.focused }}
          >
            学习方式
          </InputLabel>
          <Select
            value={this.props.recname}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                name="recname"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
                classes={{ notchedOutline: classes.select }}
              />
            }
            className={classes.white}
            classes={{ icon: classes.white }}
            style={{ height: 38 }}
          >
            {recnames.map(recname => (
              <MenuItem value={recname} key={recname}>{recname}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" className={classes.button} style={{ width: 86 }}
                onClick={this.handleConfirm.bind(this, studentCode, courseId, domainName)}>
          确认
        </Button>
        <Button variant="outlined" className={classes.button}
                style={{
                  width: '100%',
                  color: 'white',
                  display: (this.props.recname === '零基础' && 'none') || 'inherit'
                }}
                onClick={this.showModal}
        >
          {appState.chosenTopic.topicName}
        </Button>
        <TopicsModal/>
      </form>
    );
  }
}

RecommendationButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecommendationButton);
