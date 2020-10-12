import React from 'react';
import PropTypes from 'prop-types';
import { SegmentStyled } from './segment.styled';

const Segment = (props) => (
  <SegmentStyled>
    <h1>{props.title}</h1>
    {props.children}
  </SegmentStyled>
);

Segment.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Segment;


