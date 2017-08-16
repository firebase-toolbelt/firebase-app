/**
 * Log owners hold all the validation and path information for logs.
 * Every action will also store it's payload on it's owners logs.
 */

import validate from 'validate-properties';
import mapValues from 'lodash/mapValues';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';

export default function getLogOwners(config) {
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
