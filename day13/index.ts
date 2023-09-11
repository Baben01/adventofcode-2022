import fs from 'fs'
import _ from 'lodash'

const isRightOrder = (left: any, right: any) => {
  if (Array.isArray(left) && !Array.isArray(right)) return isRightOrder(left, [right])
  else if (Array.isArray(right) && !Array.isArray(left)) return isRightOrder([left], right)
  else if (Array.isArray(right) && Array.isArray(left)) {
    while (right.length > 0 && left.length > 0) {
      const _r = right.shift()
      const _l = left.shift()
      const check = isRightOrder(_l, _r)
      if (check !== 0) return check
    }
    return left.length - right.length
  } else if (!Array.isArray(right) && !Array.isArray(left)) {
    return left - right
  }
}

const question1 = (pairs: string[]) => {
  return pairs.reduce((sum, p, index) => {
    const _l = JSON.parse(p.split('\n')[0])
    const _r = JSON.parse(p.split('\n')[1])
    return isRightOrder(_l, _r) < 0 ? sum + index + 1 : sum
  }, 0)
}

const question2 = (pairs: string[]) => {
  const pairsOrdered = [
    ...pairs.flatMap(p => p.split('\n')),
    '[[2]]',
    '[[6]]'
  ].sort((a, b) => {
    return isRightOrder(JSON.parse(a), JSON.parse(b))
  })
  return (pairsOrdered.findIndex(v => v === '[[2]]') + 1) * (pairsOrdered.findIndex(v => v === '[[6]]') + 1)
}


fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  // console.log(question1(dataString.split(`\n\n`)))
  console.log(question2(dataString.split(`\n\n`)))
})