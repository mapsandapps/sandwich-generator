// @ts-nocheck

var reconfiguredGrid

const reconfigureGrid = () => {
  document.getElementById('swapped').innerHTML = ''

  reconfiguredGrid = JSON.parse(document.getElementById('reconfigureTextarea').value)
  console.log(reconfiguredGrid)

  // decide a number of times to swap rows
  const numberOfRowSwaps = _.random(reconfiguredGrid.size)
  // swap rows
  _.times(numberOfRowSwaps, () => swapRows())

  // decide a number of times to swap cols
  const numberOfColSwaps = _.random(reconfiguredGrid.size)
  // swap cols
  _.times(numberOfColSwaps, () => swapCols())

  swapCols()

  // recalculate sums
  reconfiguredGrid.colSums = getColSums(reconfiguredGrid.grid)
  reconfiguredGrid.rowSums = getRowSums(reconfiguredGrid.grid)

  printReconfiguredGrid()
}

const swapCols = () => {
  var colAIndex = _.random(reconfiguredGrid.size - 1)
  var colBIndex = _.random(reconfiguredGrid.size - 1)

  if (colAIndex === colBIndex) return

  document.getElementById('swapped').innerHTML += `<div>Swapped cols ${colAIndex} and ${colBIndex}</div>`

  _.each(reconfiguredGrid.grid, row => {
    const colAValue = _.cloneDeep(row[colAIndex])
    const colBValue = _.cloneDeep(row[colBIndex])
    row[colAIndex] = colBValue
    row[colBIndex] = colAValue
  })
}

const swapRows = () => {
  const rowAIndex = _.random(reconfiguredGrid.size - 1)
  const rowBIndex = _.random(reconfiguredGrid.size - 1)

  if (rowAIndex === rowBIndex) return

  const rowA = _.cloneDeep(reconfiguredGrid.grid[rowAIndex])
  const rowB = _.cloneDeep(reconfiguredGrid.grid[rowBIndex])

  document.getElementById('swapped').innerHTML += `<div>Swapped rows ${rowAIndex} and ${rowBIndex}</div>`

  reconfiguredGrid.grid[rowAIndex] = rowB
  reconfiguredGrid.grid[rowBIndex] = rowA
}

const printReconfiguredGrid = () => {
  var html = ''

  html += '<div>&nbsp;&nbsp;';
  _.each(reconfiguredGrid.colSums, (sum) => {
    if (sum < 10) {
      html += '&nbsp;&nbsp;' + sum
    } else {
      html += '&nbsp;' + sum
    }
  });
  html += '</div>'

  _.map(reconfiguredGrid.grid, (row, i) => {
    html += '<div>'
    var sum = reconfiguredGrid.rowSums[i];
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
  html += JSON.stringify(reconfiguredGrid)

  html += '</div>'

  document.getElementById('reconfiguredGrid').innerHTML = html
}

document.getElementById('reconfigureGrid').onclick = reconfigureGrid
