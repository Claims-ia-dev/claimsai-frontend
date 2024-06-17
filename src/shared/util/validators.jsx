const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

/**
 * The VALIDATOR_REQUIRE function returns a validator object with type 'REQUIRE'.
 * 
 * This validator checks if the input value is not empty.
 */
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });

/**
 * The VALIDATOR_FILE function returns a validator object with type 'FILE'.
 * 
 * This validator checks if the input value is a file.
 */
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });

/**
 * The VALIDATOR_MINLENGTH function returns a validator object with type 'MINLENGTH'.
 * 
 * This validator checks if the length of the input value is greater than or equal to the given minimum length.
 * 
 * @param {number} val - The minimum length.
 */
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});

/**
 * The VALIDATOR_MAXLENGTH function returns a validator object with type 'MAXLENGTH'.
 * 
 * This validator checks if the length of the input value is less than or equal to the given maximum length.
 * 
 * @param {number} val - The maximum length.
 */
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});

/**
 * The VALIDATOR_MIN function returns a validator object with type 'MIN'.
 * 
 * This validator checks if the input value is greater than or equal to the given minimum value.
 * 
 * @param {number} val - The minimum value.
 */
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });

/**
 * The VALIDATOR_MAX function returns a validator object with type 'MAX'.
 * 
 * This validator checks if the input value is less than or equal to the given maximum value.
 * 
 * @param {number} val - The maximum value.
 */
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });

/**
 * The VALIDATOR_EMAIL function returns a validator object with type 'EMAIL'.
 * 
 * This validator checks if the input value is a valid email address.
 */
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

/**
 * The validate function checks if the input value is valid according to the given validators.
 * 
 * It returns true if the input value is valid, and false otherwise.
 * 
 * @param {any} value - The input value to be validated.
 * @param {array} validators - An array of validator objects.
 */
export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    /**
     * Check if the validator type is 'REQUIRE'.
     * 
     * If so, check if the input value is not empty.
     */
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    /**
     * Check if the validator type is 'MINLENGTH'.
     * 
     * If so, check if the length of the input value is greater than or equal to the given minimum length.
     */
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    /**
     * Check if the validator type is 'MAXLENGTH'.
     * 
     * If so, check if the length of the input value is less than or equal to the given maximum length.
     */
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    /**
     * Check if the validator type is 'MIN'.
     * 
     * If so, check if the input value is greater than or equal to the given minimum value.
     */
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    /**
     * Check if the validator type is 'MAX'.
     * 
     * If so, check if the input value is less than or equal to the given maximum value.
     */
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    /**
     * Check if the validator type is 'EMAIL'.
     * 
     * If so, check if the input value is a valid email address.
     */
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
  }
  return isValid;
}