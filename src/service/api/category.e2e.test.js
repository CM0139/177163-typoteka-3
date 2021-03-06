'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `tqzNtk`,
    "category": [
      `Кино`,
      `Без рамки`
    ],
    "title": `Борьба с прокрастинацией`,
    "announce": `Из под его пера вышло 8 платиновых альбомов.`,
    "fullText": `Программировать не настолько сложно, как об этом говорят. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь.`,
    "createdAt": `2020-10-29 00:58:05`,
    "comments": [
      {
        "id": `2heTbw`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `31ofYH`,
    "category": [
      `Железо`,
      `Программирование`,
      `За жизнь`,
      `Музыка`
    ],
    "title": `Обзор новейшего смартфона`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "fullText": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "createdAt": `2020-10-10 10:43:37`,
    "comments": [
      {
        "id": `cvX_q-`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `qw_6EH`,
        "text": `Это где ж такие красоты? Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `wuD4L0`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `g6Qos1`,
        "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  },
  {
    "id": `RfzIf2`,
    "category": [
      `IT`
    ],
    "title": `Ёлки. История деревьев`,
    "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "fullText": `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году.`,
    "createdAt": `2020-11-01 10:23:44`,
    "comments": [
      {
        "id": `noLd88`,
        "text": `Хочу такую же футболку :-) Это где ж такие красоты?`
      },
      {
        "id": `478LcS`,
        "text": `Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `psLWxv`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `NofwmE`,
        "text": `Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        "id": `hqypEj`,
        "text": `Согласен с автором!`
      }
    ]
  }
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
            .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`7 categories found`, () => expect(response.body.length).toBe(7));
  test(`Categories names correct`, () => expect(response.body).toEqual(
      expect.arrayContaining([
        `Кино`,
        `Без рамки`,
        `Железо`,
        `Программирование`,
        `За жизнь`,
        `Музыка`,
        `IT`
      ])
  ));
});
