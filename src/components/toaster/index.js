import React from 'react';
import PropTypes from 'prop-types';
import { ToasterStyled } from './toaster.styled';

const Toaster = (props) => (
  <ToasterStyled>
    <h1>{props.title}</h1>
    {props.children}
  </ToasterStyled>
);

Toaster.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Toaster;


