const Gameboard = (() => {
    let turnCounter = 1
    const board = [[null, null, null],
                 [null, null, null],
                 [null, null, null]]
    const placeX = (row, col) => {
        if (board[row][col] === null) {
            board[row][col] = 'X'
            turnCounter += 1
            return true
        }
        return false
    }
    const placeO = (row, col) => {
        if (board[row][col] === null) {
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
    return {placeX, placeO, getTurn, getBoard, checkWinner}
})();
