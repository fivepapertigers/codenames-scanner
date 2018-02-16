export const MOCK_DATA = {
  boardImage: "https://www.magicmadhouse.co.uk/articles/wp-content/uploads/2016/12/Codenames-board.jpg",
  board: [
    [
      {
        termResult: {term: "EUROPE", id: "SOMEID0", confidence: 1},
      },
      {
        termResult: {term: "CAT", id: "SOMEID1", confidence: 1},
      },
      {
        termResult: {term: "BERMUDA", id: "SOMEID2", confidence: 1},
      },
      {
        termResult: {term: "JUPITER", id: "SOMEID3", confidence: .7},
      },
      {
        termResult: {term: "DANCE", id: "SOMEID4", confidence: 1},
      },
    ],
    [
      {
        termResult: {term: "PUPIL", id: "SOMEID5", confidence: 1},
      },
      {
        termResult: {term: "MAIL", id: "SOMEID6", confidence: 1},
      },
      {
        termResult: {term: "FAIR", id: "SOMEID7", confidence: 1},
      },
      {
        termResult: {term: "GERMANY", id: "SOMEID8", confidence: 1},
      },
      {
        termResult: {term: "FOREST", id: "SOMEID9", confidence: 1},
      },
    ],
    [
      {
        termResult: {term: "THUMB", id: "SOMEID10", confidence: 1},
      },
      {
        termResult: {term: "PRESS", id: "SOMEID11", confidence: 1},
      },
      {
        termResult: {term: "SNOW", id: "SOMEID12", confidence: 1},
      },
      {
        termResult: {term: "DAY", id: "SOMEID13", confidence: 1},
      },
      {
        termResult: {term: "WASHINGTON", id: "SOMEID14", confidence: 1},
      },
    ],
    [
      {
        termResult: {term: null, id: "SOMEID15", confidence: 0},
      },
      {
        termResult: {term: "HEAD", id: "SOMEID16", confidence: 1},
      },
      {
        termResult: {term: "DOG", id: "SOMEID17", confidence: 1},
      },
      {
        termResult: {term: "IRON", id: "SOMEID18", confidence: 1},
      },
      {
        termResult: {term: "TRAIN", id: "SOMEID19", confidence: 1},
      },
    ],
    [
      {
        termResult: {term: "BEAT", id: "SOMEID20", confidence: 1},
      },
      {
        termResult: {term: "NAIL", id: "SOMEID21", confidence: 1},
      },
      {
        termResult: {term: "CHARGE", id: "SOMEID22", confidence: 1},
      },
      {
        termResult: {term: "BELL", id: "SOMEID23", confidence: 1},
      },
      {
        termResult: {term: "ALPS", id: "SOMEID24", confidence: 1},
      },
    ],
  ]
};

export const mockDetectTerm = (row, col) => MOCK_DATA.board[row][col].termResult;
