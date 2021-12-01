import React from "react";
import { useJwt } from "react-jwt";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50SWQiOiIxIiwiaW1hZ2UiOiJ0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tZWRpYS9Vc2VyaW1hZ2VzL3ZpZHVzaGFfd0tLUk1pOC5KUEciLCJVc2VybmFtZSI6InZpZHVzaGEifQ.orZb1v17epAOCnBNQ1igKY6Ya6qED-gkH21ewTnmR2A";

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