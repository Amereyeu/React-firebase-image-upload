import React, { useState } from "react";
import { app } from "./config";

const db = app.firestore();

const Form = () => {
  const [albumName, setAlbumName] = useState("");

  const onAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const onAlbumCreate = () => {
    if (!albumName) {
      return;
    }
    db.collection("albums").doc(albumName).set({
      name: albumName,
    });
    setAlbumName("");
  };

  return (
    <div className="row">
      <div className="col col-6 d-flex flex-column mx-auto">
        <input
          type="text"
          className="mb-2"
          value={albumName}
          onChange={onAlbumNameChange}
        />
        <button className="btn btn-primary" onClick={onAlbumCreate}>
          Create Album
        </button>
      </div>
    </div>
  );
};

export default Form;
