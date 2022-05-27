const Gameboard = (() => {
    let turnCounter = 1
    const board = [[null, null, null],
                 [null, null, null],
                 [null, null, null]]
    const placeX = (row, col) => {
        if (board[row][col] === null && getTurn() === 'X' && checkWinner() === 'playing') {
            board[row][col] = 'X'
            turnCounter += 1
            return true
        }
        return false
    }
    const placeO = (row, col) => {
        if (board[row][col] === null && getTurn() === 'O' && checkWinner() === 'playing') {
            board[row][col] = 'O'
            turnCounter += 1
            return true
        }
        return false
    }
    const getTurn = () => {
        if (turnCounter % 2 === 1) {
            return 'X'
        } else {
            return 'O'
        }
    }
    const getBoard = () => {
        return board
    }
    const checkWinner = () => {
        // Check for winner in row
        for (row of board) {
            if (row.every(i => i === row[0]) && row[0] !== null) return row[0]
        }

        // Check for winner in columns
        for (let i = 0; i < 3; i++) {
            let isColWinner = true
            for (let j = 0; j < 3; j++) {
                if (board[j][i] !== board[0][i] || board[0][i] === null) isColWinner = false
            }
            if (isColWinner) return board[0][i]
        }

        // Check for winner in diagonal
        let isDiagonalWinner = true
        let isAntiDiagonalWinner = true

        for (let i = 0; i < 3; i++) {
            if (board[1][1] !== board[i][i] || board[i][i] === null) {
                isDiagonalWinner = false
            }
            if (board[1][1] !== board[2-i][i] || board[2-i][i] === null) {
                isAntiDiagonalWinner = false
            }
        }
        if (isDiagonalWinner || isAntiDiagonalWinner) return board[1][1]
        if (isAntiDiagonalWinner) return board[1][1]

        // Check for draw
        if (board.every(row => row.every(val => val !== null))) return 'draw'

        return 'playing'
    }
    const reset = () => {
        board.forEach(row => row.splice(0,3,null,null,null))
        turnCounter = 1
    }
    return {placeX, placeO, getTurn, getBoard, checkWinner, reset}
})()

const DisplayController = (()=> {
    const boardDiv = document.querySelector('.board')
    const resetButton = document.querySelector('button.reset')
    const message = document.querySelector('.message')

    const _playSquare = (i) => {
        if (Gameboard.checkWinner() !== 'playing') return
        Gameboard.getTurn() === 'X' 
            ? Gameboard.placeX(Math.floor(i/3), i % 3) 
            : Gameboard.placeO(Math.floor(i/3), i % 3)
        DisplayController.update()
    }

    const _reset =  () => {
        const boardSquares = boardDiv.querySelectorAll('.board-square')
        boardSquares.forEach((square)=> {
            square.innerText = ''
        })
        update()
    }

    resetButton.addEventListener('click', () => {
        Gameboard.reset()
        _reset()
    })


    const initBoard = () => {
        for (let i = 0; i < 9; i++) {
            const boardSquare = document.createElement('div')
            boardSquare.className = 'board-square'
            boardSquare.setAttribute('data-square', i.toString())
            boardSquare.addEventListener('click', _playSquare.bind(null, i))
            boardDiv.appendChild(boardSquare)
        }
        update()
    }

    const update = () => {
        const board = [].concat(...Gameboard.getBoard())
        for (let i = 0; i < 9; i++) {
            const boardSquare = boardDiv.querySelector(`.board-square[data-square="${i}"]`)
            board[i] === null ? boardSquare.innerText = '' : boardSquare.innerText = board[i]
        }

        switch (Gameboard.checkWinner()) {
            case 'playing':
                message.innerText = `Player ${Gameboard.getTurn()} turn`
                break
            case 'draw':
                message.innerText = 'It is a draw...'
                break
            default:
                message.innerText = `The winner is ${Gameboard.checkWinner()}!`
                const scream = new Audio('./scream.m4a');
                const apex = new Audio('./youaretheapexchampions.mp3')
                apex.volume = 0.3
                apex.play()
                scream.play()
        }


    }
    return {initBoard, update}
})()

DisplayController.initBoard()



