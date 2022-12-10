import fs from 'fs'

const getColumnValues = (table: string[][], index: number) => {
  return table.map(row => row[index])
}

const question1 = (table: string[][]) => {
  let nbTrees = (table.length + (table[0].length - 2)) * 2
  for (let i = 1; i < table.length - 1; i++) {
    for (let j = 1; j < table[i].length - 1; j++) {
      const columnValues = getColumnValues(table, j).map(v => parseInt(v))
      const lineValues = table[i].map(v => parseInt(v))
      const westValue = lineValues.filter((v, index) => index < j)
      const eastValue = lineValues.filter((v, index) => index > j)
      const northValues = columnValues.filter((v, index) => index < i)
      const southValues = columnValues.filter((v, index) => index > i)

      const northMax = Math.max(...northValues)
      const southMax = Math.max(...southValues)
      const westMax = Math.max(...westValue)
      const eastMax = Math.max(...eastValue)
      if (parseInt(table[i][j]) > northMax
        || parseInt(table[i][j]) > southMax
        || parseInt(table[i][j]) > westMax
        || parseInt(table[i][j]) > eastMax) {
        nbTrees++
      }
    }
  }
  return nbTrees
}

const question2 = (table: string[][]) => {
  let maxValue = 0;
  for (let i = 1; i < table.length - 1; i++) {
    for (let j = 1; j < table[i].length - 1; j++) {
      const currentValue = parseInt(table[i][j])
      const columnValues = getColumnValues(table, j).map(v => parseInt(v))
      const lineValues = table[i].map(v => parseInt(v))
      const westValue = lineValues.filter((v, index) => index < j)
      const eastValue = lineValues.filter((v, index) => index > j)
      const northValues = columnValues.filter((v, index) => index < i)
      const southValues = columnValues.filter((v, index) => index > i)

      let W = westValue.reverse().findIndex(v => v >= currentValue)
      let E = eastValue.findIndex(v => v >= currentValue)
      let N = northValues.reverse().findIndex(v => v >= currentValue)
      let S = southValues.findIndex(v => v >= currentValue)

      W = W === -1 ? 0 : (westValue.length - 1) - W
      E = E === -1 ? (lineValues.length - 1) : westValue.length + 1 + E
      N = N === -1 ? 0 : (northValues.length - 1) - N
      S = S === -1 ? (columnValues.length - 1) : northValues.length + 1 + S

      const scenicScore =
        (j - W) *
        (E - j) *
        (i - N) *
        (S - i)
      if (scenicScore > maxValue) {
        maxValue = scenicScore
      }
    }
  }
  return maxValue
}


fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const input = dataString.split('\n').map(s => s.split(''))
  // console.log(question1(input))
  console.log(question2(input))
})