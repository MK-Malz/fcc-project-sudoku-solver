const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  //Logic handles a valid puzzle string of 81 characters
  test("Logic handles a valid puzzle string of 81 characters", function(done) {
    let input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.validateSolve(input), true);
    done();
  });
  //Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function(done) {
    let input = "INVALID!!"
    assert.equal(solver.hasInvalidCharacters(input), true);
    done();
  });
  //Logic handles a puzzle string that is not 81 characters in length
  test("Logic handles a puzzle string that is not 81 characters in length", function(done) {
    let input = '1.5..2.84..63.12.7.2..5.....9..1....8.2..2..9.47...8..1..16....926914.37.'
    assert.equal(solver.validateCheck(input, 'A1', 1).error, 'Expected puzzle to be 81 characters long' );
    assert.equal(solver.validateSolve(input).error,  'Expected puzzle to be 81 characters long' );
    done();
  });
  //Logic handles a valid row placement
  test("Logic handles a valid row placement", function(done) {
    solver.setBoard('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    assert.equal(solver.acceptable(2, 3).result, true);
    done();
  });
  //Logic handles an invalid row placement
  test("Logic handles an invalid row placement", function(done) {
    solver.setBoard('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    assert.equal(solver.acceptable(2, 2).result, false);
    assert.equal(solver.acceptable(2, 2).conflict[1], "row");
    done();
  });
  //Logic handles a valid column placement
  test("Logic handles a valid column placement", function(done) {
    solver.setBoard('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    assert.equal(solver.acceptable(2, 3).result, true)
    done();
  });
  //Logic handles an invalid column placement
  test("Logic handles an invalid column placement", function(done) {
    solver.setBoard('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    assert.equal(solver.acceptable(2, 2).result, false);
    assert.equal(solver.acceptable(2, 2).conflict[0], "column");
    done();
  });
  //Logic handles a valid region (3x3 grid) placement
  test("Logic handles a valid region (3x3 grid) placement", function(done) {
    solver.setBoard('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    assert.equal(solver.acceptable(2, 3).result, true);
    done();
  });
  //Logic handles an invalid region (3x3 grid) placement
  test("Logic handles an invalid region (3x3 grid) placement", function(done) {
    solver.setBoard('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.')
    assert.equal(solver.acceptable(2, 2).result, false);
    assert.equal(solver.acceptable(2, 2).conflict[2], "region");
    done();
  });
  //Valid puzzle strings pass the solver
  test("Valid puzzle strings pass the solver", function(done) {
    let input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.validateSolve(input), true);
    done();
  });
  //Invalid puzzle strings fail the solver
  test("Invalid puzzle strings fail the solver", function(done) {
    let input = "999999999999999999999999999999999999999999999999999999999999999999999999999999999"
    assert.equal(solver.solve(input), input);
    done();
  });
  //Solver returns the expected solution for an incomplete puzzle
  test("Solver returns the expected solution for an incomplete puzzle", function(done) {
    let input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.solve(input), "135762984946381257728459613694517832812936745357824196473298561581673429269145378");
    done();
  });

});
