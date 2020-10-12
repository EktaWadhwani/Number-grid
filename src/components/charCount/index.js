import React from 'react';
import PropTypes from 'prop-types';
import { CharCountStyled } from './charCount.styled';

const CharCount = (props) => (
  <CharCountStyled>
    <small>Remaining Characters</small>
    <small> {props.maxChars - props.currentChars}</small>
  </CharCountStyled>
);

CharCount.propTypes = {
  maxChars: PropTypes.number,
  currentChars: PropTypes.number
};

export default CharCount;


