export const requiredWithMessage = (message) => (value) => (!value || !value.toString().trim().length) && message;

export const required = (value) => requiredWithMessage('This cannot be empty')(value);

export const email = (message) => (value) =>
    value && !/^\S+\@\S+\.+([a-zA-Z0-9]{2,4})+$/.test(value.toString()) && (message || 'Please enter a valid email');

export const minValue = (min, message) => (value) => {
    const v = typeof value === 'string' ? parseInt(value, 10) : value;
    const minInt = typeof min === 'string' ? parseInt(min, 10) : min;
    return (
        v !== undefined &&
        (Number.isNaN(v) ? 0 : v) < minInt &&
        (message || `Please enter an amount greater than ${min}`)
    );
};

export const integer = (message) => (value) =>
    value && !/^[0-9]*$/.test(value.toString()) && (message || 'Only digits allowed');








