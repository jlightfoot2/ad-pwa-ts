import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {showFlashMessage, removeT2AppFromMyApps} from '../actions';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  content: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: '100%'
  },

  body: {
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },

  appContainer: {
    minWidth: '150px',
    minHeight: '150px',
    width: '50%',
    height: '150px',
    textAlign: 'center',
    color: 'black',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center'
  },

  appActionContainer: {

    position: 'fixed',
    width: 60,
    bottom: 40,
    left: 0,
    right: 0,
    margin: '0 auto'

  },

  appImage: {
    width: '100px',
    height: '100px',
    borderRadius: '20px'
  },

  centeredLink: {

  },
  messageBox: {
    margin: 10,
    minHeight: 50,
    padding: 20,
    textAlign: 'center',
    alignSelf: 'center',
    flex: '0 1 auto'
  }
};
export interface Props {
 appBarTitle(msg: string): any;
 appList: any[];
 device: any;
 removeT2App(any):any;
 flashMessage(any):any;
}

export interface State {
  
}
export default class MyApps extends React.Component<Props, State> {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('My Apps');
  }
  render () {
    var {appList, device} = this.props;
    var appItemWidth = device.width < 600 ? '50%' : '25%';
    var appContainer = {...styles.appContainer, width: appItemWidth};
    let pageContent: any = 
        <Paper style={styles.messageBox as any} zDepth={2}>
          <div>Your home page is empty! Add some apps using the button below.</div>
        <Link to="/catalog"><RaisedButton style={{margin: 10}} label="Get Started" primary={true} /></Link>
    </Paper>;
    if (appList.length > 0) {
      pageContent = appList.map((tile, i) => (
                   
                        <div key={i + 1} style={appContainer as any}>
                          <div>
                            <a href={tile.url}>
                            <img style={styles.appImage} src={tile.img} />
                            </a>
                          </div>
                          <div>
                            <span>{tile.title}</span>
                          </div>
                        </div>
    
                    ));
    }

    return (
      <div style={styles.content as any}>
        <div style={styles.body as any}>

          {pageContent}
 
        </div>
        <div style={styles.appActionContainer}>
            <Link style={styles.centeredLink} to="/catalog">
              <FloatingActionButton>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
        </div>
      </div>

    );
  }
};