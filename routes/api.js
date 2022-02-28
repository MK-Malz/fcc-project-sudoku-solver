'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function(app) {

  let solver = new SudokuSolver();


  app.route('/api/check')
    .post((req, res) => {
      let isValid = solver.validateCheck(req.body.puzzle, req.body.coordinate, req.body.value)
      if (isValid !== true) {
        res.json(isValid)
      } else {
        //convert coordinate to index
        let index = solver.convertCoordinateToIndex(req.body.coordinate)
        solver.setBoard(req.body.puzzle)
        if (index > 81 || index < 0 || isNaN(index)) {
          res.json({ "error": 'Invalid coordinate' })
        } else {
          let modyPuzzleString = req.body.puzzle
          modyPuzzleString = modyPuzzleString.substring(0, index) + "." + modyPuzzleString.substring(index + 1);
          solver.setBoard(modyPuzzleString)
          if (solver.acceptable(index, req.body.value).result) {
            res.json({ "valid": true })
          } else {
            res.json({ "valid": false, "conflict": solver.acceptable(index, req.body.value).conflict })
          }



        }
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      let isValid = solver.validateSolve(req.body.puzzle)
      if (isValid !== true) {
        res.json(isValid)
      } else if (!solver.validate(req.body.puzzle)) {
        res.json({ error: 'Puzzle cannot be solved' })
      } else {
        let solution = solver.solve(req.body.puzzle)
        if (solution == 'Puzzle cannot be solved') {
          res.json({ "error": solution })
        } else {
          res.json({ "solution": solution })
        }

      }


    });
};
