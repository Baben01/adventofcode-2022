import fs from 'fs'

type Position = {
  x: number,
  y: number
}

const calculRopePosition = (newHeadPosition: Position, ropePosition: Position) => {
  const xDiff = ropePosition.x - newHeadPosition.x
  const yDiff = ropePosition.y - newHeadPosition.y
  if (xDiff !== 0 && yDiff === 0) {
    return {
      x: xDiff > 0 ? newHeadPosition.x + 1 : newHeadPosition.x - 1,
      y: newHeadPosition.y
    }
  } else if (xDiff === 0 && yDiff !== 0) {
    return {
      x: newHeadPosition.x,
      y: yDiff > 0 ? newHeadPosition.y + 1 : newHeadPosition.y - 1
    }
  } else if (Math.abs(xDiff) === 1 && Math.abs(yDiff) === 1) {
    return {
      ...ropePosition
    }
  } else if (Math.abs(xDiff) === 0 && yDiff === 0) {
    return {
      ...ropePosition
    }
  } else if (Math.abs(xDiff) === 2 && Math.abs(yDiff) === 2) {
    return {
      x: xDiff < 0 ? newHeadPosition.x - 1 : newHeadPosition.x + 1,
      y: yDiff < 0 ? newHeadPosition.y - 1 : newHeadPosition.y + 1
    }
  } else {
    const directionReal = Math.abs(xDiff) > Math.abs(yDiff)
      ? xDiff < 0 ? 'R' : 'L'
      : yDiff < 0 ? 'U' : 'D'
    return {
      x: directionReal === 'R' ? newHeadPosition.x - 1 : directionReal === 'L' ? newHeadPosition.x + 1 : newHeadPosition.x,
      y: directionReal === 'U' ? newHeadPosition.y - 1 : directionReal === 'D' ? newHeadPosition.y + 1 : newHeadPosition.y
    }
  }
}

const drawGame = (positions: Position[], hmin: number, hmax: number, wmin: number, wmax: number) => {
  for (let y = hmax; y >= hmin; y--) {
    let line = ""
    for (let x = wmin; x < wmax; x++) {
      if (positions.find(p => p.x === x && p.y === y)) {
        line += '#'
      } else {
        line += '.'
      }
    }
    console.log(line)
  }
}

const question1 = (instructions: string[]) => {
  const initialPosition: Position = { x: 0, y: 0 }
  const positions: Position[] = [initialPosition]
  const currentHPosition = { ...initialPosition }
  let currentTPosition = { ...initialPosition }
  instructions.forEach((instruction) => {
    const direction = instruction.split(' ')[0]
    const move = parseInt(instruction.split(' ')[1])
    for (let i = 0; i < move; i++) {
      currentHPosition.x = currentHPosition.x + (direction === 'R' ? 1 : direction === 'L' ? -1 : 0)
      currentHPosition.y = currentHPosition.y + (direction === 'U' ? 1 : direction === 'D' ? -1 : 0)
      currentTPosition = calculRopePosition(currentHPosition, currentTPosition)
      if (!positions.find(p => p.x === currentTPosition.x && p.y === currentTPosition.y)) {
        positions.push({ ...currentTPosition })
      }
    }
  })
  return positions.length
}

const question2 = (instructions: string[]) => {
  const initialPosition: Position = { x: 0, y: 0 }
  const positions: Position[] = [initialPosition]
  const currentHPosition = { ...initialPosition }
  const knotPositions: Position[] = Array(9).fill({ ...initialPosition })
  instructions.forEach((instruction) => {
    const direction = instruction.split(' ')[0]
    const move = parseInt(instruction.split(' ')[1])
    for (let i = 0; i < move; i++) {
      currentHPosition.x = currentHPosition.x + (direction === 'R' ? 1 : direction === 'L' ? -1 : 0)
      currentHPosition.y = currentHPosition.y + (direction === 'U' ? 1 : direction === 'D' ? -1 : 0)
      knotPositions[0] = { ...calculRopePosition(currentHPosition, knotPositions[0]) }
      for (let knot = 1; knot < knotPositions.length; knot++) {
        knotPositions[knot] = { ...calculRopePosition(knotPositions[knot - 1], knotPositions[knot]) }
      }
      if (!positions.find(p => p.x === knotPositions[8].x && p.y === knotPositions[8].y)) {
        positions.push({ ...knotPositions[8] })
      }
    }
  })
  return positions.length
}


fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const instruction = dataString.split('\n')
  // console.log(question1(instruction))
  console.log(question2(instruction))
})