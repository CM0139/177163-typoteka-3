'use strict';

const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomItems = (arr, max) => {
  return shuffle(arr).slice(0, Math.min(arr.length, max));
};

const getRandomDate = (interval) => {
  const now = new Date();
  const then = (new Date(now)).setMonth(now.getMonth() - interval);
  const randomDate = new Date(getRandomInt(then, Date.parse(now))).toJSON();
  return randomDate;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    return [];
  }
};

module.exports = {
  getRandomInt,
  getRandomItems,
  shuffle,
  getRandomDate,
  readContent,
};
