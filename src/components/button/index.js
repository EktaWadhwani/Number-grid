import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyled, ButtonWrapper } from './button.styled';
import { withFormButton } from '../../validation/validationwrapper';

const Button = (props) => (
  <ButtonWrapper>
    <ButtonStyled onClick={props.onClick}>
      <span>{props.children}</span>
    </ButtonStyled>
  </ButtonWrapper>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default withFormButton(Button);
