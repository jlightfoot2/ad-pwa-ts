import * as React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
export interface Props{
  installed: boolean;
  onClick(any): any;
}
const MyCheckbox:React.StatelessComponent<Props> = ({installed,onClick}) => {
  const color = installed ? 'green' : 'white';
  return (
    <IconButton onTouchTap={onClick} >
      <CheckBox color={color} />
    </IconButton>
  );
}

export default MyCheckbox;