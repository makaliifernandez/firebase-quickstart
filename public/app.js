const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const userDetails = document.getElementById('userDetails');

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

auth.onAuthStateChanged(user => {
  if (user) {
    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;

    createThing.hidden = false;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = '';
    thingsList.innerHTML = '';
    createThing.hidden = true;
  }
});


const db = firebase.firestore();
let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
  if (user) {
    // Database Reference
    thingsRef = db.collection('things')
    createThing.onclick = () => {
    const { serverTimestamp } = firebase.firestore.FieldValue;
      thingsRef.add({
        uid: user.uid, // store uid info to access later
        name: faker.commerce.productName(),
        createdAt: serverTimestamp()
      });
    }

    // Query
    unsubscribe = thingsRef
      .where('uid', '==', user.uid) // only pull up documents that the user has a uid attached to
      .onSnapshot(querySnapshot => {
        // Map results to an array of li elements
        const items = querySnapshot.docs.map(doc => {
          return `<li>${doc.data().name}</li>`
        });
        thingsList.innerHTML = items.join('');
      });
  } else {
    // Unsubscribe when the user signs out
    unsubscribe && unsubscribe();
  }
});
