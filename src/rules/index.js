import { writeFile } from 'fs';

export default function generateRules(paths, owners) {
  let rulesObj = {};
  const ownerKeys = Object.keys(owners);

  return new Promise((resolve, reject) => {
    ownerKeys.forEach((owner, i) => {

      const { rules } = paths[owner];
      const rulePaths = Object.keys(rules);

      rulePaths.forEach(rulePath => {
        rulesObj[rulePath] = rules[rulePath];
      });

      if ((i + 1) == ownerKeys.length) {

        writeFile(__dirname + '/rules.json', JSON.stringify(rulesObj), function(err) {
          if (err) {
            console.log(err);
            return;
          }

          resolve();
        })
      }

    });
  });
}
