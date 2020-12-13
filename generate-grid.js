// @ts-nocheck
const SIZE = 7

var initialRow = _.times(SIZE, _.constant(0))

const digits = _.map(Array(SIZE), (item, i) => {
  return i + 1
})

var grid = _.times(SIZE, () => _.clone(initialRow))

const setRandomDigit = (i, j) => {
  return _.random(1, SIZE)
}

const getRowDigits = (i, j) => {
  // TODO: ignore 0's
  var rowDigits = _.clone(grid[i])
  rowDigits.splice(j, 1)

  return rowDigits
}

const getColDigits = (i, j) => {
  // TODO: ignore 0's
  var colDigits = _.map(_.clone(grid), (item) => {
    return item[j]
  })
  colDigits.splice(i, 1)

  return colDigits
}

const getAvailableDigits = (i, j) => {
  var availableDigits = _.clone(digits)
  _.pullAll(availableDigits, getRowDigits(i, j))
  _.pullAll(availableDigits, getColDigits(i, j))

  return availableDigits
}

const findProblemDigit = (i, j) => {
  // get all available digits for the column
  var availableColDigits = _.pullAll(_.clone(digits), getColDigits(i, j))

  // if one of those is in the row, replace that digit
  var l = _.indexOf(getRowDigits(i, j), availableColDigits[0])
  // grid[i][l] = '.'
  // printGrid()
  setDigit(i, l, true)
}

const setDigit = (i, j, isRecursing = false) => {
  if (i < 0 || j < 0) {
    return
  }

  var availableDigits = getAvailableDigits(i, j)

  if (availableDigits.length < 1) {
    findProblemDigit(i, j)
    grid[i][j] = '.'
  } else {
    if (isRecursing) {
      // give the digit a chance to be '.', to back out of a hole
      const randomNumber = _.random(availableDigits.length)
      if (randomNumber === availableDigits.length) {
        // TODO: recurse
        console.log('setting position ', i, ',', j, 'to .')
        findProblemDigit(i, j)
        grid[i][j] = '.'
      } else {
        const digitToSet = availableDigits[randomNumber]
        console.log('setting position ', i, ',', j, 'to ', digitToSet)
        grid[i][j] = digitToSet
      }
    } else {
      const digitToSet = availableDigits[_.random(availableDigits.length - 1)]
      grid[i][j] = digitToSet
    }
  }

  printGrid()
}

const findFirstDot = () => {
  var firstDotI
  var firstDotJ
  _.map(grid, (row, i) => {
    var j = _.indexOf(row, '.')
    if (!firstDotI && !firstDotJ && j > -1) {
      firstDotI = i
      firstDotJ = j
      console.log(i, j)
    }
  })

  if (firstDotI >= 0 && firstDotJ >= 0) {
    // try to set the dot to a digit, in case its blockers have already been cleared, if not, that function will recurse
    setDigit(firstDotI, firstDotJ)
  }
}

const setGrid = () => {
  grid = _.times(SIZE, () => _.clone(initialRow))
  _.map(grid, (row, i) => {
    _.map(row, (item, j) => {
      setDigit(i, j)
    })
  })
}

const printGrid = () => {
  var html = ''
  var json = {
    colSums: getColSums(),
    rowSums: getRowSums(),
    grid: grid
  }

  html += '<div>&nbsp;&nbsp;';
  _.each(getColSums(), (sum) => {
    if (sum < 10) {
      html += '&nbsp;&nbsp;' + sum
    } else {
      html += '&nbsp;' + sum
    }
  });
  html += '</div>'

  _.map(grid, (row, i) => {
    html += '<div>'
    var sum = getRowSum(i);
    if (sum < 10) {
      html += '&nbsp;' + sum;
    } else {
      html += sum;
    }
    html += '&nbsp;&nbsp;'
    html += row.join('&nbsp;&nbsp;')
    html += '</div>'
  });

  html += '<br><br><div>'
  json.size = SIZE
  html += JSON.stringify(json)

  html += '</div>'

  document.getElementById('grid').innerHTML = html
}

const helloWorld = () => {
  document.getElementById('grid').innerHTML = 'hello world'
}

const generate = () => {
  setGrid()
}

document.getElementById('generate').onclick = generate
document.getElementById('findDot').onclick = findFirstDot
generate()


// TODO: maybe instead of this, it should fill all with numbers (random numbers instead of dots)
// then check if the grid is good
// if bad number is found in grid, try swapping it with another number up or to the left of it
// repeat
