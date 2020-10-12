import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Label, InputWrapper, Err } from './InputGroup.styled';

const InputGroup = (props) => {
    return (
        <Wrapper showError={props.showErrors && props.error} >
            {
                props.label && (
                    <Label htmlFor={props.id} showError={props.showErrors && props.error}>
                        {props.label}
                        {props.mandatory && <span>*</span>}
                    </Label>
                )
            }
            <InputWrapper>
                {props.children}
                {
                    props.showErrors && props.error && (
                        <React.Fragment>
                            <Err error={props.error}><span>{props.error}</span></Err>
                        </React.Fragment>
                    )
                }
            </InputWrapper>
        </Wrapper >
    )
};


InputGroup.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    showErrors: PropTypes.bool
}
export default InputGroup;
