import firebase from "firebase";
import firestore from "firebase/firestore";
import uuid4 from 'uuid/v4';


export function getGatepasses(gatepassesRetreived) {

  firebase.firestore()
    .collection('gatepasses')
    .where("revoked", "==", false )
    .onSnapshot(function(querySnapshot) {
      // Placement of this array and callback VERY KEY
      // Must be inside onSnapshot callback function
      var gatepassList = [];

      querySnapshot.forEach((doc) => {
        const gatepassItem = doc.data();
        gatepassItem.id = doc.id;
        gatepassList.push(gatepassItem);
      });

      gatepassesRetreived(gatepassList);
    })
  
}

export function revokeGatepass(gatepass, updateComplete) {
  gatepass.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log("Updating gatepass in firebase");

  firebase.firestore()
    .collection('gatepasses')
    .doc(gatepass.id)
    .update({
      revoked: true,
      status: 'revoked',
    })
    .then(() => updateComplete(gatepass))
    .catch((error) => console.log(error))
    .then(() => console.log("Done Updating gatepass"));
}

export function updateGatepass(gatepass, updateComplete) {
  gatepass.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log("Updating gatepass in firebase");

  firebase.firestore()
    .collection('gatepasses')
    .doc(gatepass.id)
    .set(gatepass)
    .then(() => updateComplete(gatepass))
    .catch((error) => console.log(error));
}

export function deleteGatepass(gatepass, deleteComplete) {
  console.log(gatepass);

  firebase.firestore()
    .collection('gatepasses')
    .doc(gatepass.id)
    .delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}

export function addgatepass(gatepass, addComplete) {
  gatepass.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firebase.firestore()
    .collection('gatepasses')
    .add(gatepass)
    .then((snapshot) => {
      gatepass.id = snapshot.id;
      snapshot.set(gatepass);
    })
    .then(() => addComplete(gatepass))
    .catch((error) => console.log(error));
}

// Users


export function addUser(user, addComplete) {
  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    // url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.gatepass.residents'
    },
    android: {
      packageName: 'com.gatepass.resident',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'gatepass.residents.link'
  };

  user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  firebase.firestore()
    .collection('users')
    .add(user)
    .then((snapshot) => {
      console.log(user);
      user.id = snapshot.id;
      snapshot.set(user);
      const { email } = user;

      firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => console.log(error));
    })
    .then(() => addComplete(user))
    .catch((error) => console.log(error));
}