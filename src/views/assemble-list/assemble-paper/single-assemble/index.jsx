import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import AssembleTitle from './assemble-title';
import AssembleContentText from './assemble-content-text';
import AssembleContentVideo from './assemble-content-video';

const styles = theme => ({
  paper: {
    // padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
});

class SingleAssemble extends React.Component {
  constructor(props) {
    super(props);
    this.state = { evauation: props.assemble.evaluation };
  }

  render() {
    const { classes, assemble, studentCode, courseId, domainName, domainId, textorvideo } = this.props;
    return (
      <div>
        {
          textorvideo === 0 ? (
            <Grid item xs={12} key={assemble.assembleId}>
              <Paper className={classes.paper}>
                <AssembleTitle assemblesource={assemble.sourceName} assemblefacetname={assemble.firstLayerFacetName}
                               evaluation={this.state.evauation} positive={assemble.positive}/>
                <AssembleContentText assemble={assemble} studentCode={studentCode} courseId={courseId}
                                     domainName={domainName} domainId={domainId}/>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12} key={assemble.assembleId}>
              <Paper className={classes.paper}>
                <AssembleTitle assemblesource={assemble.sourceName} assemblefacetname={assemble.firstLayerFacetName}
                               evaluation={this.state.evauation} positive={assemble.positive}/>
                <AssembleContentVideo assemble={assemble}/>
              </Paper>
            </Grid>
          )
        }
      </div>
    );
  }
}

export default withStyles(styles)(SingleAssemble);
