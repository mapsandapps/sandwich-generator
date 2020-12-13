// @ts-nocheck

// {'colSums':[2,0,0,0,0],'rowSums':[1,2,2,1,6],'grid':[[3,4,1,5,2],[1,5,2,4,3],[4,2,5,3,1],[2,3,4,1,5],[5,1,3,2,4]]}

var completeGrid

const difficultySums = 0.5
const difficultyGrid = 0.8

const makePuzzle = () => {
  completeGrid = JSON.parse(document.getElementById('textarea').value)
  console.log(completeGrid)
  console.log(_.random(true))

  completeGrid.colSumsFixed = []
  completeGrid.rowSumsFixed = []
  completeGrid.gridFixed = []
  completeGrid.difficultySums = difficultySums
  completeGrid.difficultyGrid = difficultyGrid
  completeGrid.difficultyVersion = 0.2

  _.map(completeGrid.colSums, sum => {
    if (_.random(true) > difficultySums) {
      completeGrid.colSumsFixed.push(true)
    } else {
      completeGrid.colSumsFixed.push(false)
    }
  })

  _.map(completeGrid.rowSums, sum => {
    if (_.random(true) > difficultySums) {
      completeGrid.rowSumsFixed.push(true)
    } else {
      completeGrid.rowSumsFixed.push(false)
    }
  })

  _.map(completeGrid.grid, (row, i) => {
    completeGrid.gridFixed.push([])
    _.map(row, item => {
      if (_.random(true) > difficultyGrid) {
        completeGrid.gridFixed[i].push(true)
      } else {
        completeGrid.gridFixed[i].push(false)
      }
    })
  })

  printPuzzle()
}

const printPuzzle = () => {
  var html = '<div>Solution:</div>'

  html += '<div>&nbsp;&nbsp;';
  _.each(completeGrid.colSums, (sum) => {
    if (sum < 10) {
      html += '&nbsp;&nbsp;' + sum
    } else {
      html += '&nbsp;' + sum
    }
  });
  html += '</div>'

  _.map(completeGrid.grid, (row, i) => {
    html += '<div>'
    var sum = completeGrid.rowSums[i];
    if (sum < 10) {
      html += '&nbsp;' + sum;
    } else {
      html += sum;
    }
    html += '&nbsp;&nbsp;'
    html += row.join('&nbsp;&nbsp;')
    html += '</div>'
  });

  html = '<div>Puzzle:</div>'
  html += '<div>&nbsp;&nbsp;';
  _.each(completeGrid.colSums, (sum, j) => {
    if (completeGrid.colSumsFixed[j]) {
      if (sum < 10) {
        html += '&nbsp;&nbsp;' + sum
      } else {
        html += '&nbsp;' + sum
      }
    } else {
      html += '&nbsp;&nbsp;&nbsp;'
    }
  });
  html += '</div>'

  _.map(completeGrid.grid, (row, i) => {
    html += '<div>'
    var sum = completeGrid.rowSums[i];
    if (completeGrid.rowSumsFixed[i]) {
      if (sum < 10) {
        html += '&nbsp;' + sum;
      } else {
        html += sum;
      }
    } else {
      html += '&nbsp;&nbsp;'
    }
    _.map(row, (item, j) => {
      html += '&nbsp;&nbsp;'
      if (completeGrid.gridFixed[i][j]) {
        const value = completeGrid.grid[i][j]
        if (value >= completeGrid.size - 1) {
          html += 'X'
        } else {
          html += completeGrid.grid[i][j]
        }
      } else {
        html += '_'
      }
    })
    html += '</div>'
  });

  html += '<br><br><div>'
  html += JSON.stringify(completeGrid)

  html += '</div>'

  document.getElementById('puzzle').innerHTML = html
}

document.getElementById('makePuzzle').onclick = makePuzzle
