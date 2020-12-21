'use strict';

const {
  HttpCode
} = require(`../../constants`);

const commentKeys = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExist = commentKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    return res.status(HttpCode.BAD_REQUEST)
      .json(`Bad request`);
  }

  return next();
};
