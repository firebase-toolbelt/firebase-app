module.exports = function generateRules(rules, rulesObj) {
  let rulesKeys = Object.keys(rules);

  return new Promise((resolve, reject) => {
    rulesKeys.forEach((rulesPath, i) => {

      const setup = rules['__setup__'];

      if (setup == 'owners') {
        rulesObj[rulesPath] = {
          '.read': rules[rulesPath]
        };
      }

      if (setup == 'actions') {
        rulesObj[rulesPath] = {
          '.write': rules[rulesPath]
        };
      }

      if (setup == 'paths') {
        if (rules[rulesPath].validate != null) {
          rulesObj[rulesPath] = rules[rulesPath];
        } else {
          rulesObj[rulesPath] = {
            '.read': rules[rulesPath]
          };
        }
      }

      if ((i + 1) == rulesKeys.length) {
        resolve();
      }

    });
  });
}
