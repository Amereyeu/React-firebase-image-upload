import React, { useState } from "react";
import firebase from "firebase";
import { app } from "../config";

const db = app.firestore();
const storage = app.storage();

const Photo = ({ currentAlbum }) => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    
    db.collection("albums")
      .doc(currentAlbum)
      .update({
        images: firebase.firestore.FieldValue.arrayUnion({
          name: file.name,
          url: await fileRef.getDownloadURL(),
        }),
      });
  };

  return (
    <div className="row">
      <div className="col col-6 d-flex flex-column mx-auto">
        <input type="file" className="mb-2" onChange={onFileChange} />
        <button className="btn btn-primary" onClick={onUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default Photo;
