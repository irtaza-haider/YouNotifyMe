import React from "react";
import Header from "./header";
import Subscribe from "./subscribe";
import Description from "./description";

function Main(pros) {
  return (
    <React.Fragment>
      <Header />
      <Description />
      <Subscribe />
    </React.Fragment>
  );
}

export default Main;
