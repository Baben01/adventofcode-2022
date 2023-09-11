import fs from 'fs'
import { parse } from 'path'

type Position = {
  x: number,
  y: number
}

type Node = {
  id: number
  fValue: number,
  gValue: number,
  hValue: number
  heigth: string,
  position: Position
  parentNode?: Node
}

const recreatePath = (node: Node) => {
  const path = []
  let currentNode = node
  while (!!currentNode.parentNode) {
    path.push(currentNode)
    currentNode = currentNode.parentNode
  }
  return path
}

const findNeighbours = (grid: Node[][], currentNode: Node) => {
  const result = []
  for (let y = currentNode.position.y - 1; y <= currentNode.position.y + 1; y++) {
    for (let x = currentNode.position.x - 1; x <= currentNode.position.x + 1; x++) {
      if ((y !== currentNode.position.y && x !== currentNode.position.x)
        || x < 0
        || y < 0
        || y >= grid.length
        || x >= grid[0].length
        || grid[y][x].heigth.charCodeAt(0) - currentNode.heigth.charCodeAt(0) > 1
      ) continue;
      result.push(grid[y][x])
    }
  }
  return result
}

const aStar = (start: Node, target: Node, grid: Node[][]) => {
  const h = (currentP: Position) => (target.position.x - currentP.x) + (target.position.y - currentP.y)
  const closedList = []
  const openList = [start]

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const node = grid[y][x]
      node.hValue = h(node.position)
      node.fValue = node.hValue + node.gValue
    }
  }

  while (openList.length > 0) {
    const currentNode = openList.sort((a, b) => a.fValue - b.fValue).shift()
    closedList.push(currentNode)
    if (currentNode.id === target.id) return recreatePath(currentNode)
    const neighbours = findNeighbours(grid, currentNode)
    neighbours.forEach(neighbor => {
      if (closedList.find(_ => _.id === neighbor.id)) return
      const nextGValue = currentNode.gValue + 1
      if (!openList.find(_ => _.id === neighbor.id) || nextGValue < neighbor.gValue) {
        neighbor.gValue = nextGValue
        neighbor.fValue = neighbor.hValue + neighbor.gValue
        neighbor.parentNode = { ...currentNode }
        if (!openList.find(_ => _.id === neighbor.id)) {
          openList.push(neighbor)
        }
      }
    })
  }
  return []
}

const buildNodeTable = (data: string[][]) => {
  return data.map((l, y) => l.map((cell, x) => ({
    id: (x * 100) + y,
    fValue: 0,
    gValue: 0,
    hValue: 0,
    heigth: data[y][x],
    position: { x, y }
  })))
}

const question1 = (grid: Node[][]) => {
  let startNode;
  let endNode
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].heigth === 'S') {
        grid[y][x].heigth = 'a'
        startNode = grid[y][x]
      }
      if (grid[y][x].heigth === 'E') {
        grid[y][x].heigth = 'z'
        endNode = grid[y][x]
      }
    }
  }
  const path = aStar(startNode, endNode, grid)
  return path.length
}

const question2 = (grid: Node[][]) => {
  let startNodes = [];
  let endNode
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].heigth === 'S' || grid[y][x].heigth === 'a') {
        grid[y][x].heigth = 'a'
        startNodes.push(grid[y][x])
      }
      if (grid[y][x].heigth === 'E') {
        grid[y][x].heigth = 'z'
        endNode = grid[y][x]
      }
    }
  }
  const lengths = startNodes.map(sn => {
    const _grid = JSON.parse(JSON.stringify(grid))
    return aStar(sn, endNode, _grid).length
  }).filter(l => l > 0)
  return Math.min(...lengths)
}

fs.readFile('./input.txt', (err, data) => {
  const dataString = data.toString()
  const grid = buildNodeTable(dataString.split('\n').map(_ => _.split('')))
  // console.log(question1(grid))
  console.log(question2(grid))
})