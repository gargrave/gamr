# Gamr

A small personal project built with two primary goals:

1. Make an app to track gaming habits: what I played when, and for how long. I find it interesting to look back on what I was playing "this time last year" and so forth.
2. Learn how to use Firebase and test it out in a real project.

I couldn't find any existing React/Firebase libraries that worked the way I liked, so for better or worse, I rolled my own FirebaseContainer component to handle interactions between client and Firebase.

Lessons learned: I really enjoyed using React/Redux, but Firebase was not the right fit for this project. I am currently in the process of rebuilding it with a VueJS front-end and Django Rest Framework back-end.

Built using React/Redux, with [React Slingshot](https://github.com/coryhouse/react-slingshot) as the base.

## Git Ignored Files

The following files are ignored by git, and will need to be recreated locally any time the repo is cloned:

- `.firebaserc` (created by running `firebase init`)
- `database.rules.json` (local copy of the database rules from your Firebase project's admin area)
- `src/etc/firebaseConfig.js` (copy/paste the project initialization data from your Firebase project's admin area)
