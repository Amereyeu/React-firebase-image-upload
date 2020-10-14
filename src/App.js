import React, { useState, useEffect } from "react";
import { app } from "./config";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Album from "./Album"
import Home from "./Home"

const db = app.firestore();

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unmount = db.collection("albums").onSnapshot((snapshot) => {
      const tempAlbums = [];
      snapshot.forEach((doc) => {
        tempAlbums.push({ ...doc.data(), id: doc.id });
      });
      setAlbums(tempAlbums);
    });
    return unmount;
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Home albums={albums} />} />
        <Route path="/:album" component={Album} />
      </Switch>
    </>
  );
}

export default App;
