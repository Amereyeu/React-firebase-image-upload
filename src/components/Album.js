import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import Photo from "./Photo";
import { app } from "../config";

const db = app.firestore();

const Album = () => {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState("");

  const match = useRouteMatch("/:album");
  const { album } = match.params;

  useEffect(() => {
    const unmount = db
      .collection("albums")
      .doc(album)
      .onSnapshot((doc) => {
        setImages(doc.data().images || []);
        setAlbumName(doc.data().name);
      });
    return unmount;
  }, []);

  return (
    <div className="container m-5 mx-auto">
      <div className="row">
        <section>
          <h1 className="text-uppercase text-center mb-4">{albumName}</h1>
          <p className="text-center">
            <Link to="/">Home page</Link>
          </p>
          <div className="d-flex flex-wrap mb-4">
            {images.map((image) => (
              <div className="col-4 card p-2" key={image.name}>
                <img src={image.url} alt="album" className="img-fluid" />
                <div class="card-body">
                  <p>
                    Fuga ducimus adipisci ex laboriosam fugiat id ullam
                    voluptas, veritatis porro cum ipsam amet qui ipsa dolore
                    reiciendis deleniti harum laudantium! Deserunt.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="container m-5 mx-auto">
          <Photo currentAlbum={album} />
        </div>
      </div>
    </div>
  );
};

export default Album;
