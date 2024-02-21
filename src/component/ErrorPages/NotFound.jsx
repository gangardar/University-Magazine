import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  return (
    <div className="container-fluid not-found-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 text-center">
          {isRouteErrorResponse(error) ? (
            <>
              <h1 className="display-4">404 Error</h1>
              <p className="lead">Page Not Found</p>
            </>
          ) : (
            <>
              <h1 className="display-4">Unexpected Error</h1>
              <p className="lead">Something went wrong.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
