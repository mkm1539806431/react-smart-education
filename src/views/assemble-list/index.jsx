import Paper from '@material-ui/core/Paper';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AssemblePaper from './assemble-paper';
import AssembleListTitlebar from './assemble-list-titlebar';
import AssemblePagination from './assemble-pagination';

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    maxHeight: '100vh',
    paddingTop: 80
    // overflow: 'auto'
  },
  toolbar: theme.mixins.toolbar
});

class AssembleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: document.body.clientHeight
    };
  }

  resize = () => {
    this.setState({ height: document.body.clientHeight });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content} style={{ height: this.state.height }}>
        <Paper>
          <AssembleListTitlebar/>
          <AssemblePaper/>
          <AssemblePagination/>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(AssembleList);
