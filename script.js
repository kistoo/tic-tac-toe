const board = (()=>{
    //ends game
    const endGame = () => {
        announcement.style.display= "flex";
        if (winner !== "tie"){
            announcement.querySelectorAll('h1')[0].textContent = `${winner} wins!`;
            announcement.className = "win";
            if (winner === "x") {
                info.setResult("win");
            } else {
                info.setResult("lose");
            }
        } else {
            announcement.querySelectorAll('h1')[0].textContent = "It's a tie";
            announcement.className = "tie";
            info.setResult("tie");
        }
        stats.refreshStats();
        //reset
        announcement.addEventListener('click',reset);
    }
    //clears everything
    const reset = () => {
        announcement.style.display="none";
        winner="";
        board.forEach(cell=>{
            cell.innerHTML="";
        })
        //makes first ia turn
        if (info.getInfo().gamemode==="AI" && turn === "o") {
            playTurn(cells[AI.AIplay(info.getInfo().difficulty,getValues())]);
        }
    }

    //plays round
    const playRound = (cell) => {
        if (info.getInfo().gamemode==="Local") {
            playTurn(cell);
            checkCells();
        } else if (info.getInfo().gamemode==="AI") {
            if (turn === "x") {
                if (playTurn(cell)) {
                    let AIturn = checkCells();
                    if (AIturn) {
                        playTurn(cells[AI.AIplay(info.getInfo().difficulty,getValues())]);
                        checkCells();
                    }   
                }        
            }
        }
    }
    //add x and o imagescell
    const playTurn = (cell) => {
        if (cell.firstChild === null) {
            const img = document.createElement('img');
            if (turn === "x") {
                img.src = "images/X.svg";
                turn = "o";
            } else if (turn === "o") {
                img.src = "images/O.svg";
                turn = "x";
            }
            cell.appendChild(img);
            info.changeTurn(turn);
            stats.refreshStats();
            return true;
        }
    };

    //checks if there is a winner
    const checkCells = () => {
        const values = getValues();
        //checks for empty cells
        if (values.indexOf(null)===-1) {
            winner="tie";
        }
        //checks winner
        switch (true) {
            //rows
            case (values[0]===values[1] && values[1]===values[2] && (values[0] !== null)):
                winner = values[0];
                break;
            case (values[3]===values[4] && values[4]===values[5] && (values[3] !== null)):
                winner = values[3];
                break;
            case (values[6]===values[7] && values[7]===values[8] && (values[6] !== null)):
                winner = values[6];
                break;
            //columns
            case (values[0]===values[3] && values[3]===values[6] && (values[0] !== null)):
                winner = values[0];
                break;
            case (values[1]===values[4] && values[4]===values[7] && (values[1] !== null)):
                winner = values[1];
                break;
            case (values[2]===values[5] && values[5]===values[8] && (values[2] !== null)):
                winner = values[2];
                break;
            //diagonals
            case (values[0]===values[4] && values[4]===values[8] && (values[0] !== null)):
                winner = values[0];
                break;
            case (values[2]===values[4] && values[4]===values[6] && (values[2] !== null)):
                winner = values[2];
                break;
        }
        //endgame if there is a winner
        if (winner!=="") {
            endGame();
            return false;
        } else { 
            return true;
        }
    };
    //returns array with cell values
    const getValues = () => {
        const values = [];
        cells.forEach(cell => {
            if (cell.firstChild === null) {
                values.push(null);
            } else if (cell.firstChild.src.includes("images/X.svg")) {
                values.push("x");
            } else if (cell.firstChild.src.includes("images/O.svg")) {
                values.push("o");
            }
        });
        return values;
    }

    //winner
    let winner = "";
    
    //turn
    let turn = "x";

    //selects board divs
    const board = document.getElementById("board").querySelectorAll('div');
    const cells = Array.from(board);
    cells.forEach(cell => {
        cell.addEventListener('click',()=>playRound(cell));
    });
    //announcement div
    const announcement = document.getElementById('end-game');

})();

const form = (() => {
    const checkFields = () => {
        //check select
        if (select.value!==""){
            info.createInfo(collectData());
            showGame();
        }
    }
    const showGame = () => {
        const form = document.getElementById('gamemode');
        const game = document.getElementById('game');
        form.style.display="none";
        game.style.display="flex";
        document.getElementsByClassName('player-2')[1].style.display = "flex";
        document.getElementsByClassName('player-2')[2].style.display = "flex";
    }
    const collectData = () => {
        const gamemode = select.value;
        let player1 = inputs[0].value;
        let player2;
        if (player1 === "") {
            player1 = "Player 1";
        }
        if (gamemode === "Local") {
            player2 = inputs[1].value;
            if (player2 === "") {
                player2 = "Player 2";
            }
        } else if (gamemode === "AI") {
            player2 = "AI ";
            const difficultyChose = document.getElementById('difficulty').value;
            player2 += `${difficultyChose}`;
        }
        
        return {gamemode,player1,player2}
    }
    const checkMode = () => {
        const player2Name = document.getElementsByClassName('player-2')[0];
        const difficulty = document.getElementsByClassName('difficulty')[0];
        if (select.value==="Local") {
            player2Name.style.display = "flex";
        } else {
            player2Name.style.display = "none";
        }
        if (select.value==="AI") {
            difficulty.style.display = "flex";
        } else {
            difficulty.style.display = "none";
        }
    }

    const button = document.querySelector('button');
    button.addEventListener('click',()=>checkFields());
    const select = document.getElementById('mode');
    select.addEventListener('change',()=>checkMode());
    const inputs = document.querySelectorAll('input');

})();

const stats = (() => {
    const refreshStats = () => {
        const newInfo = info.getInfo();
        gamemode.textContent = newInfo.gamemode;
        turn.textContent = newInfo.turn;
        player1name.textContent = `${newInfo.player1.name} stats:`;
        player1stats.textContent = `${newInfo.player1.wins}W ${newInfo.player1.ties}T ${newInfo.player1.loses}L`
        player2name.textContent = `${newInfo.player2.name} stats:`;
        player2stats.textContent = `${newInfo.player2.wins}W ${newInfo.player2.ties}T ${newInfo.player2.loses}L`
    }

    const gamemode = document.getElementsByClassName('gamemode')[0];
    const turn = document.getElementsByClassName('turn')[0];
    const player1name = document.getElementsByClassName('player-1')[0];
    const player1stats = document.getElementsByClassName('player-1')[1];
    const player2name = document.getElementsByClassName('player-2')[1];
    const player2stats = document.getElementsByClassName('player-2')[2];

    return {refreshStats}

})();

const info = (() => {
    const createInfo = (info) => {
        player1 = playerFactory(info.player1,"x");
        player2 = playerFactory(info.player2);
        gamemode = info.gamemode;
        if (gamemode === "AI") {
            difficulty = player2.name.split(' ')[1];
        }
        stats.refreshStats();
    }
    const getInfo = () => {
        //First play
        if (turn === undefined) {
            turn = player1.name;
        }
        return {gamemode,player1,player2,turn,difficulty}
    }
    const changeTurn = (boardTurn) => {
        if (player1.team === boardTurn) {
            turn = player1.name;
        } else {
            turn = player2.name;
        }
    }
    const setResult = (result) => {
        switch (result) {
            case "tie":
                player1.ties++;
                player2.ties++;
                break;
            case "win":
                player1.wins++;
                player2.loses++;
                break;
            case "lose":
                player1.loses++;
                player2.wins++;
                break;
        }
    }
    let gamemode,player1,player2,turn,difficulty;
    return {createInfo,getInfo,setResult,changeTurn}
})();

const AI = (() => {
    const AIplay = (level,board) => {
        let bestPlay = "not found";
        switch (level) {
            case "hard":

            case "medium":
                if (bestPlay === "not found") {
                    bestPlay = winPlay(board);
                }
                if (bestPlay === "not found") {
                    bestPlay = counterWinPlay(board);
                }
            case "easy":
                if (bestPlay === "not found") {
                    bestPlay = randomPlay(board);
                }
        }
        return bestPlay;
    };

    //AI plays
    const randomPlay = (board) => {
        let randomNumber = Math.floor(Math.random()*9);
        let i=0;
        while (true) {
            if (board[randomNumber+i]===null) {
                break;
            }
            if (randomNumber+i>8) {
                randomNumber = 0;
                i = 0;
            }
            i++;
            if (i===7) {
                break;
            }
        }
        return (randomNumber+i);
    }
    const winPlay = (board) => {
        for(let i=0;i<9;i++) {
            let tempCell = board[i];  
            if (board[i] === null) {
                board[i] = "o";
                //checks winner
                switch (true) {
                    //rows
                    case (board[0]===board[1] && board[1]===board[2] && (board[0] === "o")):
                        return i;
                    case (board[3]===board[4] && board[4]===board[5] && (board[3] === "o")):
                        return i;
                    case (board[6]===board[7] && board[7]===board[8] && (board[6] === "o")):
                        return i;
                    //columns
                    case (board[0]===board[3] && board[3]===board[6] && (board[0] === "o")):
                        return i;
                    case (board[1]===board[4] && board[4]===board[7] && (board[1] === "o")):
                        return i;
                    case (board[2]===board[5] && board[5]===board[8] && (board[2] === "o")):
                        return i;
                    //diagonals
                    case (board[0]===board[4] && board[4]===board[8] && (board[0] === "o")):
                        return i;
                    case (board[2]===board[4] && board[4]===board[6] && (board[2] === "o")):
                        return i;
                }
            }
            board[i] = tempCell;
        }
        return "not found";
    }
    const counterWinPlay = (board) => {
        for(let i=0;i<9;i++) {
            let tempCell = board[i];  
            if (board[i] === null) {
                board[i] = "x";
                //checks winner
                switch (true) {
                    //rows
                    case (board[0]===board[1] && board[1]===board[2] && (board[0] === "x")):
                        return i;
                    case (board[3]===board[4] && board[4]===board[5] && (board[3] === "x")):
                        return i;
                    case (board[6]===board[7] && board[7]===board[8] && (board[6] === "x")):
                        return i;
                    //columns
                    case (board[0]===board[3] && board[3]===board[6] && (board[0] === "x")):
                        return i;
                    case (board[1]===board[4] && board[4]===board[7] && (board[1] === "x")):
                        return i;
                    case (board[2]===board[5] && board[5]===board[8] && (board[2] === "x")):
                        return i;
                    //diagonals
                    case (board[0]===board[4] && board[4]===board[8] && (board[0] === "x")):
                        return i;
                    case (board[2]===board[4] && board[4]===board[6] && (board[2] === "x")):
                        return i;
                }
            }
            board[i] = tempCell;
        }
        return "not found";
    }

    return {AIplay,winPlay}
})();

const playerFactory = (name,team="o") => {
    let wins = 0;
    let ties = 0;
    let loses = 0;
    return {name,wins,ties,loses,team}
}