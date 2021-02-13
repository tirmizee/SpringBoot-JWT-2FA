import React from 'react';
import PropTypes from 'prop-types';
//import { Test } from './Route.styles';

const Route = ({path, children}) => {
  return window.location.pathname === path ? children : null;
};

Route.propTypes = {
  // bla: PropTypes.string,
};

Route.defaultProps = {
  // bla: 'test',
};

export default Route;
