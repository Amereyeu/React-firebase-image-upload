import React from "react";
import Form from "./Form";
import { Link } from "react-router-dom";

const Home = ({ albums }) => {
  return (
    <>
      <div className="container m-5 mx-auto">
        <div className="row">
          <div className="col d-flex flex-wrap">
            {albums.map((album) => (
              <div className="col-4 px-0 card" key={album.name}>
                <Link to={`/${album.id}`}>
                  <img
                    src={album.images ? album.images[0].url : ""}
                    alt={album.name}
                    className="img-fluid card-img-top"
                  />
                  <div class="card-body">
                    <button class="btn btn-primary mx-auto d-block w-50">{album.name}</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container m-5 mx-auto">
        <Form />
      </div>
    </>
  );
};

export default Home;
