import React, { useState } from "react";
import firebase from "firebase";
import { app } from "../config";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

const db = app.firestore();
const storage = app.storage();

const Photo = ({ currentAlbum }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

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
          title: title,
          richText: richText,
        }),
      });
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  return (
    <div className="row">
      <div className="col col-12 d-flex flex-column mx-auto">
        <input
          className="mb-3"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="border">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ["list", "colorPicker"],

              list: {
                inDropdown: false,
                options: ["unordered"],

                //ordered: { icon: ordered, className: undefined },
              },
            }}
          />
        </div>

        <input type="file" className="my-3" onChange={onFileChange} />
        <button className="btn btn-primary" onClick={onUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Photo;
