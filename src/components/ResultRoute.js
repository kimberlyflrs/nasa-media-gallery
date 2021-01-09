import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ResultContext from "../context/resultContext/ResultContext";

export const ResultRoute = ({ component: Component, ...rest }) => {
  const resultContext = useContext(ResultContext);
  const { query } = resultContext;

  return (
    <Route
      {...rest}
      render={props =>
        !query ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ResultRoute;