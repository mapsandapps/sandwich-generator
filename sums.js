// @ts-nocheck
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
