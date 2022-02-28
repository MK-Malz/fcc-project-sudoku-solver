let board = [] //gloabal variable for sudoku board state
class SudokuSolver {



  // index -> { row, col }
  i2rc(index) {
    return { row: Math.floor(index / 9), col: index % 9 };
  }

  // { row, col } -> index
  rc2i(row, col) {
    return row * 9 + col;
  }

  acceptable(index, value) {
    let { row, col } = this.i2rc(index);
    let acceptObject = { "result": true, "conflict": [] }
    // if already present on the column, not acceptable
    for (let r = 0; r < 9; ++r) {
      if (board[this.rc2i(r, col)] == value) {
        acceptObject.result = false
        acceptObject.conflict.push("column")
      }
    }
    // if already present on the row, not acceptable
    for (let c = 0; c < 9; ++c) {
      if (board[this.rc2i(row, c)] == value) {
        acceptObject.result = false
        acceptObject.conflict.push("row")
      }
    }
    // if already present in the same region, also not acceptable
    let r1 = Math.floor(row / 3) * 3;
    let c1 = Math.floor(col / 3) * 3;
    for (let r = r1; r < r1 + 3; ++r) {
      for (let c = c1; c < c1 + 3; ++c) {
        if (board[this.rc2i(r, c)] == value) {
          acceptObject.result = false
          acceptObject.conflict.push("region")
        }
      }
    }
    return acceptObject;
  }

  getChoices(board, index) {
    let choices = [];
    for (let value = 1; value <= 9; ++value) {
      if (this.acceptable(index, value).result) {
        choices.push(value);
      }
    }
    return choices;
  }


  validate(puzzleString) {
    return true
  }

  validateCheck(puzzle, coordinate, value) {
    if (!puzzle || !coordinate || !value) {
      return { "error": "Required field(s) missing" }
    } else if (puzzle.length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    } else if (this.hasInvalidCharacters(puzzle)) {
      return { error: 'Invalid characters in puzzle' }
    } else if (this.hasInvalidCharacters(value) || parseInt(value) > 9 || parseInt(value) < 1 || value == ".") {
      return { "error": "Invalid value" }
    } else {
      return true
    }

  }

  validateSolve(puzzle) {
    if (!puzzle) {
      return { error: 'Required field missing' }
    } else if (this.hasInvalidCharacters(puzzle)) {
      return { error: 'Invalid characters in puzzle' }
    } else if (puzzle.length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    } else {
      return true
    }

  }

  hasInvalidCharacters(puzzleString) {
    let nonRegex = /[^1-9.]/g;
    if (nonRegex.test(puzzleString)) {
      return true;
    } else {
      return false
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  convertCoordinateToIndex(coordinate) {
    return ((parseInt(coordinate.toLowerCase().charCodeAt(0) - 96) - 1) * 9) + parseInt(coordinate[1]) - 1
  }

  convertToSudokuArray(puzzleString) {
    let splittedStringArray = [...puzzleString]
    splittedStringArray = splittedStringArray.map(x => { if (x == '.') { return '0' } else return x })
    splittedStringArray = splittedStringArray.map(x => { return parseInt(x) })
    return splittedStringArray
  }

  convertToSudokuString(puzzeArray) {
    let sudokuString = ""
    for (let i = 0; i < puzzeArray.length; i++) {
      sudokuString += puzzeArray[i]
    }
    return sudokuString
  }

  setBoard(puzzleString) {
    board = this.convertToSudokuArray(puzzleString)
  }

  bruteForceSolve(index) {
    while (index < 81 && board[index]) {
      ++index; // skip non-empty cells
    }
    if (index == 81) return true;               // we filled'em all, success!
    let moves = this.getChoices(board, index);
    for (let m of moves) {
      board[index] = m;              // try one choice
      if (this.bruteForceSolve(index + 1)) {        // if we can solve for the next cell

        return true;               // then return true, success!
      }
    }
    board[index] = 0;  // no move worked; we failed, clear the cell
    return false;      // and backtrack    
  }


  solve(puzzleString) {
    board = this.convertToSudokuArray(puzzleString)
    let solved = this.bruteForceSolve(0)
    if (solved) {
      // convert to solution string and return
      let solutionString = this.convertToSudokuString(board)
      return solutionString
    } else {
      return "Puzzle cannot be solved"
    }
  }
}

module.exports = SudokuSolver;

