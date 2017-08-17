/**
 * Log owners hold all the validation and path information for logs.
 * Every action will also store it's payload on it's owners logs.
 */

const validate = require('validate-properties');
const mapValues = require('lodash/mapValues');
const isString = require('lodash/isString');
const isFunction = require('lodash/isFunction');

module.exports = function getLogOwners(config) {
  if (!config.owners) return {};

  /**
   * Parse and validate owners.
   */

  let owners = mapValues(config.owners, ownerObj => {
    if (isString(ownerObj)) {
      return {
        rules: `$${ownerObj}`,
        validate: [ownerObj],
        path: payload => payload[ownerObj]
      };
    }

    if (!validate(ownerObj, ['rules', 'validate', 'path'])) {
      throw new Error(
        'Log owners must be defined with `rules`, `validate` and `path` properties.'
      );
      return;
    } else if (!isFunction(ownerObj.path)) {
      throw new Error('Log owner path property must be a function.');
      return;
    }

    return ownerObj;
  });

  /**
   * Add blank owner.
   */

  let blankOwner = config.logBlankPath || '__';
  owners[blankOwner] = {
    rules: blankOwner,
    validate: [() => true],
    path: () => '_'
  };

  return owners;
}
