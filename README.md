# Firebase App
---

Firebase is awesome and is really easy to setup some small app using it.
However, when building a complex application using solely firebase as it's backend a lot of caveats appear.
This module make this easier by allowing a modular approach that solves a lot of this problems.

What we want to solve with this module:

- All your firebase code is organized in modules (e.g. posts, users, userStaredPosts, …)
- All your modules contain their actions (e.g. posts/create, users/updatePicture, …)
- All your modules contain their related rules
- Logs for every actions are automatically created
- Application is fully testable even offline

This is made possible by following a specific code structure.
But don't worry, it's highly flexible and you can make it work easily for your needs.

We use firebase-rules for dealing with our rules creating.
And targaryen for all our rules testing.
