# Quick Start Notes

[Firebase CLI reference](https://firebase.google.com/docs/cli)

To start app locally run:

```cli
firebase serve
```

To deploy app run:

```cli
firebase deploy
```

---

Following through this tutorial [Fireship - Firebase Quickstart](https://fireship.io/lessons/firebase-quickstart/) to get a better understanding of the basics of User Authentication and Security when using Firebase.

Will be using Firebase to host these learning projects on, and I want to make sure my resources are secure.

Useful links:

- [Firebase Console](https://console.firebase.google.com/u/0/) - after creating an account, go here to access the BE service
- [Connect and Authenticate to your Firebase account through CLI](https://firebase.google.com/docs/cli#sign-in-test-cli)
- [Initializing a new firebase project](https://firebase.google.com/docs/cli#initialize_a_firebase_project)

---

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // These are the default "Locked" security rules
    match /{document=**} {
      allow read, write: if false;
    }

    // These are the default "Test" security rules
    // match /{document=**} {
    //   allow read, write: if
    //       request.time < timestamp.date(2021, 7, 7);
    // }

    // This is the rule to allow authorized requests
    match /things/{docId} {
      allow write: if request.auth.uid == request.resource.data.uid;
      allow read: if request.auth.uid == resource.data.uid;
    }
  }
}
```

With the above rules on the database in place, use basic auth code in app.js to login to the app.

Note that only Users that have registered under the Authentication section will be able to access the database through the app.

If a User signs in through the app, they will automatically be added to the Authentication section's Users table.
