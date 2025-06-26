import jwt from "jsonwebtoken";
import {TOKEN_KEY_SECRET} from "../config.js";

export function createAccessToken(payload, rememberMe) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_KEY_SECRET,
      {
        expiresIn: rememberMe ? "30d" : "1h",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      })
  });
}