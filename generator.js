// @ts-nocheck
const SIZE = 8

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

const getRowSum = (i) => {
  var rowDigits = grid[i]

  var indexA = rowDigits.indexOf(SIZE)
  var indexB = rowDigits.indexOf(SIZE - 1)
  var betweens

  if (indexB > indexA) {
    betweens = _.slice(rowDigits, indexA + 1, indexB)
  } else {
    betweens = _.slice(rowDigits, indexB + 1, indexA)
  }
  return _.sum(betweens)
}

const getRowSums = () => {
  var rowSums = []
  for (let i = 0; i < SIZE; i++) {
    rowSums.push(getRowSum(i))
  }

  return rowSums;
}

const getColSum = (j) => {
  var colDigits = _.map(_.clone(grid), (item) => {
    return item[j]
  })

  var indexA = colDigits.indexOf(SIZE)
  var indexB = colDigits.indexOf(SIZE - 1)
  var betweens

  if (indexB > indexA) {
    betweens = _.slice(colDigits, indexA + 1, indexB)
  } else {
    betweens = _.slice(colDigits, indexB + 1, indexA)
  }

  return _.sum(betweens)
}

const getColSums = () => {
  var colSums = []
  for (let i = 0; i < SIZE; i++) {
    colSums.push(getColSum(i))
  }
  return colSums
}

const getAvailableDigits = (i, j) => {
  var availableDigits = _.clone(digits)
  _.pullAll(availableDigits, getRowDigits(i, j))
  _.pullAll(availableDigits, getColDigits(i, j))

  return availableDigits
}

const setDigit = (i, j) => {
  var availableDigits = getAvailableDigits(i, j)

  // TODO: handle if availableDigits is empty
  const digitToSet = availableDigits[_.random(availableDigits.length - 1)]
  if (digitToSet > 0) {
    return digitToSet
  } else {
    return "."
  }
}

const findFirstDot = () => {
  grid.some((row, i) => {
    var j = _.indexOf(row, '.')
    if (j > -1) {
      console.log(i, j)
      return [i, j]
    }
  })
}

const setGrid = () => {
  grid = _.times(SIZE, () => _.clone(initialRow))
  _.map(grid, (row, i) => {
    _.map(row, (item, j) => {
      grid[i][j] = setDigit(i, j)
    })
  })
}

const printGrid = () => {
  var html = ""
  var json = {
    colSums: getColSums(),
    rowSums: getRowSums(),
    grid: grid
  }

  html += "<div>&nbsp;&nbsp;";
  _.each(getColSums(), (sum) => {
    if (sum < 10) {
      html += "&nbsp;&nbsp;" + sum
    } else {
      html += "&nbsp;" + sum
    }
  });
  html += "</div>"

  _.map(grid, (row, i) => {
    html += "<div>"
    var sum = getRowSum(i);
    if (sum < 10) {
      html += "&nbsp;" + sum;
    } else {
      html += sum;
    }
    html += "&nbsp;&nbsp;"
    html += row.join("&nbsp;&nbsp;")
    html += "</div>"
  });

  html += "<br><br><div>"
  html += JSON.stringify(json)
  console.log(json)

  html += "</div>"

  return html
}

const helloWorld = () => {
  document.getElementById("grid").innerHTML = "hello world"
}

const generate = () => {
  console.log("generate")
  setGrid()

  document.getElementById("grid").innerHTML = printGrid()
}

document.getElementById("generate").onclick = generate
document.getElementById("findDot").onclick = findFirstDot
generate()
