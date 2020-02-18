import firebase from "firebase";
import firestore from "firebase/firestore";
import uuid4 from 'uuid/v4';

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

export function deletegatepass(gatepass, deleteComplete) {
  console.log(gatepass);

  firebase.firestore()
    .collection('gatepasses')
    .doc(gatepass.id)
    .delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}


export function getGatepasses(gatepassesRetreived) {

  firebase.firestore()
    .collection('gatepasses')
    .where("revoked", "==", false )
    .onSnapshot(function(querySnapshot) {

      var gatepassList = [];

      querySnapshot.forEach((doc) => {
        const gatepassItem = doc.data();
        gatepassItem.id = doc.id;
        gatepassList.push(gatepassItem);
      });

      gatepassesRetreived(gatepassList);
    })
  
}

export function uploadgatepass(gatepass, ongatepassUploaded, { updating }) {

  if (gatepass.imageUri) {
    const fileExtension = gatepass.imageUri.split('.')
    .pop();
    console.log("EXT: " + fileExtension);

    var uuid = uuid4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage()
    .ref(`Gatepasses/images/${fileName}`);

    storageRef.putFile(gatepass.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        error => {
          unsubscribe();
          console.log("image upload error: " + error.toString());
        },
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);

              gatepass.image = downloadUrl;

              delete gatepass.imageUri;

              if (updating) {
                console.log("Updating....");
                updategatepass(gatepass, ongatepassUploaded);
              } else {
                console.log("adding...");
                addgatepass(gatepass, ongatepassUploaded);
              }
            })
        }
      )
  } else {
    console.log("Skipping image upload");

    delete gatepass.imageUri;

    if (updating) {
      console.log("Updating....");
      updategatepass(gatepass, ongatepassUploaded);
    } else {
      console.log("adding...");
      addgatepass(gatepass, ongatepassUploaded);
    }
  }
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