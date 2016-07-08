// regex for email addresses
const RE_EMAIL = /^\S+@\S+\.\S+$/;
// regex for Twitter handles
const RE_TWITTER = /^@[\S]{1,15}$/;

/**
 * Returns whether the supplied email matches the basic format of a valid email address
 * @param value The email to check
 * @returns {boolean} Whether the supplied email validates
 */
function isValidEmail(value) {
  return RE_EMAIL.test(value);
}

/**
 * Returns whether the supplied handle the basic format of a Twitter account
 * @param value The Twitter handle to check
 * @returns {boolean} Whether the Twitter handle validates
 */
function isValidTwitter(value) {
  return RE_TWITTER.test(value);
}

/**
 * Checks whether the provided data is valid according to the rules provided.
 *
 * The rules object can contain the following properties:
 *    required: boolean, whether the data MUST have a value
 *    minLength: number, whether the data must meet a min-length requirement
 *    maxLength: number, whether the data must meet a max-length requirement
 *    format: string, a string to specify that the data must validate
 *        against a pre-defined format; the formats are:
 *
 *        email: must be a valid email address format
 *            (does not check if it is a "real" email address, only a valid one)
 *        twitter: must be a valid Twitter handle
 *            (starts with '@', and no more than 15 characters)
 *
 * @param value - The value to check for validation
 * @param rules - The rules object specifying how the data needs to be validated
 * @returns {Object} An object with two properties:
 *      valid: boolean, whether the data validates
 *      error: string, an appropriate error message is data is invalid; otherwise empty string
 *        (Note that the function will return as soon as any rule is not met.)
 */
function validate(value, rules) {
  const isRequired = rules.required;
  const isBlank = !value.length || value === null || value === undefined;

  // check for required
  if (isRequired && isBlank) {
    return {
      valid: false,
      error: 'This field is required.'
    };
  }

  // check for min-length
  const shouldCheckMinLength = rules.minLength &&
    (isRequired || (!isRequired && !isBlank));
  if (shouldCheckMinLength) {
    const min = rules.minLength;
    if (value.length < min) {
      return {
        valid: false,
        error: `Must be at least ${min} characters.`
      };
    }
  }

  // check for max-length
  const shouldCheckMaxLength = rules.minLength &&
    (isRequired || (!isRequired && !isBlank));
  if (shouldCheckMaxLength) {
    const max = rules.maxLength;
    if (value.length > max) {
      return {
        valid: false,
        error: `Must be no more than ${max} characters.`
      };
    }
  }

  // check for formatting requirements
  const shouldCheckFormat = rules.format &&
    (isRequired || (!isRequired && !isBlank));
  if (shouldCheckFormat) {
    const format = rules.format.trim().toLowerCase();

    // email address
    if (format === 'email') {
      if (!isValidEmail(value)) {
        return {
          valid: false,
          error: 'Must be a valid email address.'
        };
      }
    }

    // twitter handle
    if (format === 'twitter') {
      if (!isValidTwitter(value)) {
        return {
          valid: false,
          error: 'Must be a valid Twitter handle.'
        };
      }
    }
  }

  return {valid: true, error: ''};
}

export default validate;
