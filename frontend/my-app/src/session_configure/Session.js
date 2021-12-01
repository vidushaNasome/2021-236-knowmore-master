import React from "react";
import { useJwt } from "react-jwt";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50SWQiOjEsImltYWdlIjoiXCJVc2VyaW1hZ2VzL3ZpZHVzaGFfd0tLUk1pOC5KUEdcIiIsIlVzZXJuYW1lIjoidmlkdXNoYSJ9.MCcELHq3L33Gkn93OkSmpO7YWPFPUCvd_xR3r39XUus";

const Session = () => {
  const { decodedToken, isExpired } = useJwt(token);
  /*
    If is a valid jwt, 'decodedToken' will be a object
    it could look like:
    {
      "name": "Gustavo",
      "iat": 1596408259,
      "exp": 4752168259
    }

    'isExpired' will return a boolean
    true => your token is expired
    false => your token is not expired
  */

  return (
    <div>
      {console.log({decodedToken})}
    </div>
  );
};

export default Session;