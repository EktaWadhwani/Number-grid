import React, { Component, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mapValues } from 'lodash';

const FormContext = createContext();

const { Provider, Consumer } = FormContext;

export class Form extends Component {
    state = {
        formErrors: {},
        showErrors: {}
    };

    setIsValidState = (isValid) => (isValid !== this.state.isValid ? this.setState({ isValid: false }) : null);

    setErrors = (newErrors) => this.setState(({ formErrors }) => ({ formErrors: { ...formErrors, ...newErrors } }));

    setShowErrors = (newShowErrors) =>
        this.setState(({ showErrors }) => ({ showErrors: { ...showErrors, ...newShowErrors } }));

    render() {
        const { children, onErrorCallback, ...props } = this.props;
        const { formErrors, showErrors } = this.state;

        const context = {
            setIsValidState: this.setIsValidState,
            onErrorCallback,
            showErrors,
            formErrors,
            setErrors: this.setErrors,
            setShowErrors: this.setShowErrors
        };

        return (
            <Provider value={context}>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <form
                    {...props}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    autoComplete="off"
                >
                    {children}
                </form>
            </Provider>
        );
    }
}

Form.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onErrorCallback: PropTypes.func
};

/* eslint-disable-next-line react/no-multi-comp */
/* eslint-disable */
class FormInput extends Component {
    /* eslint-enable */
    componentDidMount() {
        const { id } = this.props;

        this.family = document.querySelectorAll(`input[id=${id}], *[id=${id}] input`);

        this.f = this.family.length < 2 ? (_f) => _f() : (_f) => _f();


        this.family.forEach((element) => {
            if (element.type === 'radio') {
                element.addEventListener('click', this.blur);
            } else {
                element.addEventListener('keydown', this.blur);
                element.addEventListener('blur', this.blur);
            }
        });
        this.reset();
    }

    componentWillUnmount() {
        clearTimeout(this.f);
        this.family.forEach((element) => element.removeEventListener('blur', this.blur));
        this.reset();
    }

    family = [];

    blur = () => {
        const { id, setShowErrors } = this.props;
        this.f(() => {
            setShowErrors({ [id]: true });
        });
    };

    reset() {
        const { id } = this.props;
        const { setErrors, setShowErrors } = this.props;
        setErrors({ [id]: [] });
        setShowErrors({ [id]: false });
    }

    render() {
        const { C, ...props } = this.props;
        return <C {...props} />;
    }
}

FormInput.propTypes = {
    C: PropTypes.any,
    id: PropTypes.string,
    setErrors: PropTypes.func,
    setShowErrors: PropTypes.func
};

export const withFormInputGroup = (C) => (passedProps) => {
    const context = useContext(FormContext);
    const { setInputErrors, formErrors = {}, setErrors, showErrors, setShowErrors } = context;

    const { id, value, validations, checked, hideErrors } = passedProps;
    if (typeof id === 'undefined') {
        throw new Error('withForm requires consumers to have an id prop');
    }

    const validationValue = Object.prototype.hasOwnProperty.call(passedProps, 'checked') ? checked : value;

    const validationResults = validations
        ? validations.map((v) => (typeof v === 'function' ? v(validationValue) : null)).filter((v) => v && !!v.length)
        : [];

    const inValid = !!validationResults.length;
    const errorToShow = inValid ? validationResults[0] : null;

    useEffect(() => {
        if (typeof formErrors[id] === 'undefined' || formErrors[id].join('-') !== validationResults.join('-')) {
            setErrors({ [id]: validationResults });
        }
    });

    return (
        <FormInput
            {...passedProps}
            C={C}
            error={errorToShow}
            formErrors={formErrors}
            id={id}
            setErrors={setErrors}
            setInputErrors={setInputErrors}
            setShowErrors={setShowErrors}
            showErrors={!hideErrors && showErrors[id]}
            value={value}
        />
    );
};

export const withFormButton = (B) => ({
    /* eslint-disable-next-line react/prop-types */
    onClick: propOnClick,
    ...props
}) => (
        <Consumer>
            {({ onErrorCallback, formErrors, showErrors, setShowErrors }) => (
                <B
                    onClick={() => {
                        setShowErrors(mapValues(showErrors, () => true));

                        if (onErrorCallback) onErrorCallback(formErrors);

                        if (
                            propOnClick &&
                            Object.keys(formErrors)
                                .map((k) => formErrors[k].length)
                                .every((e) => !e)
                        ) {
                            propOnClick();
                        }
                    }}
                    {...props}
                    disabled={
                        props.disable ||
                        !Object.keys(formErrors)
                            .map((k) => formErrors[k].length)
                            .every((e) => !e)
                    }
                />
            )}
        </Consumer>
    );

export const withFormSubmitField = (InputComponent) => ({
    /* eslint-disable-next-line react/prop-types */
    onSubmit: propOnSubmit,
    ...props
}) => (
        <Consumer>
            {({ onErrorCallback, formErrors, showErrors, setShowErrors }) => (
                <InputComponent
                    onSubmit={() => {
                        setShowErrors(mapValues(showErrors, () => true));

                        if (onErrorCallback) onErrorCallback(formErrors);

                        const hasNoErrors = Object.keys(formErrors)
                            .map((k) => formErrors[k].length)
                            .every((e) => !e);

                        if (propOnSubmit && hasNoErrors) {
                            propOnSubmit();
                        }
                    }}
                    {...props}
                />
            )}
        </Consumer>
    );
