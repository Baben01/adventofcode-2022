import fs from 'fs'

fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const totalCountInventory = dataString.split('\n\n')
    .map((elfInventory) => {
      return elfInventory.split('\n').map(v => {
        return parseInt(v)
      }).reduce((sum, current) => sum + current, 0)
    })
  console.log(` Answer to question 1 : ${Math.max(...totalCountInventory)}`)
  const maxTopThree = totalCountInventory.sort((a, b) => b - a).slice(0, 3).reduce((sum, current) => sum + current, 0)
  console.log(` Answer to question 2 : ${maxTopThree}`)
})