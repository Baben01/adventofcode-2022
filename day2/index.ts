
import fs from 'fs'
// A => ROCK
// B => PAPER
// C => SCISSORS

// X => ROCK
// Y => PAPER
// Z => SCISSORS
const question1 = (rounds: string[]) => {
  return rounds.reduce((totalPoint, currentGame) => {
    const play = currentGame.split(' ')
    let toAdd = 0
    const choicePoint = play[1] === 'X' ? 1 : play[1] === 'Y' ? 2 : 3
    if (play[0].charCodeAt(0) - 64 === choicePoint) toAdd = choicePoint + 3
    else if (choicePoint - (play[0].charCodeAt(0) - 64) === -1 || choicePoint - (play[0].charCodeAt(0) - 64) === 2) toAdd = choicePoint + 0
    else toAdd = choicePoint + 6
    return totalPoint + toAdd
  }, 0)
}

const question2 = (rounds: string[]) => {
  return rounds.reduce((totalPoint, currentGame) => {
    const play = currentGame.split(' ')
    const enemyPlay = play[0].charCodeAt(0) - 64
    let toAdd = 0
    if (play[1] === 'Y') toAdd = enemyPlay + 3
    else if (play[1] === 'X') toAdd = (enemyPlay === 1 ? 3 : enemyPlay === 2 ? 1 : 2)
    else if (play[1] === 'Z') toAdd = 6 + (enemyPlay === 1 ? 2 : enemyPlay === 2 ? 3 : 1)
    console.log(toAdd)
    return totalPoint + toAdd
  }, 0)
}
fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const rounds = dataString.split('\n')
  // question1(rounds)
  console.log(question2(rounds))
})