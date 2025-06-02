// data.quests.js

const QUESTS = [
  {name:'Цветопроба',id:'proba',desc:'Сделать цветопробу для Кати'},
  {name:'Лак',id:'lak',desc:'Отлакировать на втором этаже'},
  {name:'Финал',id:'boss',desc:'Дойти к боссу, пройти блиц и завершить день'}
];

const BOSS_QUIZ = [
  {
    question: "Что означает C в аббревиатуре CMYK?",
    answers: [
      {text: "Циан (голубой)", correct: true},
      {text: "Картон", correct: false},
      {text: "Цвет", correct: false},
      {text: "Контур", correct: false}
    ]
  },
  {
    question: "Что такое Pantone?",
    answers: [
      {text: "Спецпалитра для подбора фирменных цветов", correct: true},
      {text: "Плотность бумаги", correct: false},
      {text: "Тип лака", correct: false},
      {text: "Вид резки", correct: false}
    ]
  },
  {
    question: "Что важно для вывода макета в печать?",
    answers: [
      {text: "CMYK, обрезные метки, без прозрачностей", correct: true},
      {text: "PNG с тенью", correct: false},
      {text: "Только PNG", correct: false},
      {text: "RGB, как на экране", correct: false}
    ]
  },
  {
    question: "Что такое допечатная подготовка?",
    answers: [
      {text: "Проверка и настройка макета перед печатью", correct: true},
      {text: "Очистка станков", correct: false},
      {text: "Выбор лака", correct: false},
      {text: "Забор коробок", correct: false}
    ]
  },
  {
    question: "Почему PDF предпочтительнее для офсетной печати?",
    answers: [
      {text: "Корректно сохраняет вектор и шрифты", correct: true},
      {text: "Сохраняет прозрачности", correct: false},
      {text: "Меньше весит", correct: false},
      {text: "Дешевле распечатывать", correct: false}
    ]
  },
  {
    question: "Зачем нужны плашечные цвета?",
    answers: [
      {text: "Для согласования специальных фирменных оттенков", correct: true},
      {text: "Для фотопечати", correct: false},
      {text: "Для печати на картоне", correct: false},
      {text: "Для лакировки", correct: false}
    ]
  },
  {
    question: "Что такое лакировка?",
    answers: [
      {text: "Нанесение защитного покрытия на тираж", correct: true},
      {text: "Склеивание листов", correct: false},
      {text: "Ламинация", correct: false},
      {text: "Резка бумаги", correct: false}
    ]
  }
];
