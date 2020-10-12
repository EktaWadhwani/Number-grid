import { requiredWithMessage, minValue, integer } from './validators';

const errorMsg = 'Error!';

describe('validators helper', () => {
  it('requiredWithMessage should return as in not invalid - false', () => {
    const isInvalid = requiredWithMessage(errorMsg)('Test');
    expect(isInvalid).toBe(false);
  });

  it('requiredWithMessage should return Error message', () => {
    const isInvalid = requiredWithMessage(errorMsg)();
    expect(isInvalid).toBe(errorMsg);
  });

  it('minValue - should return Error message', () => {
    const isInvalid = minValue(5, errorMsg)(4);
    expect(isInvalid).toBe(errorMsg);
  });

  it('integer should return Error message', () => {
    const isInvalid = integer(errorMsg)(5.4);
    expect(isInvalid).toBe(errorMsg);
  });

  it('integer should return false ', () => {
    const isInvalid = integer(errorMsg)(5);
    expect(isInvalid).toBe(false);
  });

});
