import * as React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {topRightButtonStyle, clearBothStyle} from '../components/commonStyles';

import {toggleT2AppFromMyList, showFlashMessage} from '../actions';
import AppButtonIcon from './AppButtonIcon';

const styles = {
  gridList: {

  },
  content: {

  }
};
export interface Props {
 appBarTitle(msg: string): any;
 cols: number;
 toggleToMyApps(any):any;
 flashMessage(any):any;
 backButtonClick(any):any;
 appList: any[];
}
export interface State {
  
}

export default class Catalog extends React.Component<Props,State> {
  componentWillMount () {
    this.props.appBarTitle && this.props.appBarTitle('T2 Catalog');
  }
  render () {
    var {appList, cols, toggleToMyApps, flashMessage,backButtonClick} = this.props;
    const onClick = (app) => {
      return () => {
        const message = app.title + (app.installed ? ' has been removed from ': ' has been added to ') + ' "My Apps"';
        flashMessage(message);
        toggleToMyApps(app.id);
      }
    };

    return (
            <div style={styles.content as any}>
              <div style={topRightButtonStyle}>
                 <RaisedButton onTouchTap={backButtonClick}>Done</RaisedButton>
              </div>
              <div style={clearBothStyle}>

              <GridList
                cellHeight={200}
                style={styles.gridList}
                cols={cols}
              >

                {appList.map((tile, i) => (
                  <GridTile
                    key={tile.id}
                    {...tile}
                    subtitle={<span>by <b>{tile.author}</b></span>}
                    actionIcon={<AppButtonIcon installed={tile.installed} onClick={onClick(tile)} />}
                    cols={1}
                    rows={1}
                  >
                    <img src={tile.img} />

                  </GridTile>
                ))}

              </GridList>
              </div>
            </div>
          );
  }

};