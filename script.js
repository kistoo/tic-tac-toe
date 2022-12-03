const board = (()=>{
    //ends game
    const endGame = () => {
        announcement.style.display= "flex";
        if (winner!=="tie"){
            announcement.querySelectorAll('h1')[0].textContent = `${winner} wins!`;
            announcement.className = "win";
        } else {
            announcement.querySelectorAll('h1')[0].textContent = "It's a tie";
            announcement.className = "tie";
        }
        
        //reset
        announcement.addEventListener('click',()=>reset());
    }
    //clears everything
    const reset = () => {
        announcement.style.display="none";
        winner="";
        board.forEach(cell=>{
            cell.innerHTML="";
        })
    }

    //plays round
    const playRound = (cell) => {
        playTurn(cell);
        checkCells();
        if (winner!=="") {
            endGame();
        }
    }
    //add x and o images
    const playTurn = (cell) => {
        if (cell.firstChild === null) {
            const img = document.createElement('img');
            if (turn === "x") {
                img.src = "images/X.svg";
                turn = "o"
            } else if (turn === "o") {
                img.src = "images/O.svg";
                turn = "x";
            }
            cell.appendChild(img);
        }
    };

    //checks if there is a winner
    const checkCells = () => {
        const values = getValues();
        //checks for empty cells
        if (values.indexOf(null)===-1) {
            winner="tie";
            endGame();
        }
        //checks winner
        for(let i=0;i<3;i++) {
            //for columns
            if(values[i]===values[i+3]
                && values[i+3]===values[i+6]
                && values[i]!==null) {
                    winner = values[i];
                    break;
            }
            //for rows
            if(values[i*3]===values[i*3+1] &&
                values[i*3+1]===values[i*3+2] &&
                values[i*3]!==null) {
                    winner = values[i*3];
                    break;
            }
        }
        //for diagonals
        if (((values[0]===values[4]
            && values[4]===values[8])
            || (values[2]===values[4]
            && values[4]===values[6]))
            && values[4]!==null) {
                winner = values[4];
        }
    };
    //returns array with cell values
    const getValues = (text) => {
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
            collectData();
            showGame();
            return true;
        }
    }
    const showGame = () => {
        const form = document.getElementById('gamemode');
        const game = document.getElementById('game');
        form.style.display="none";
        game.style.display="flex";
    }
    const collectData = () => {
        const gamemode = select.value;
        let player1 = inputs[0].value;
        if (player1 === "") {
            player1 = "Player 1";
        }
        let player2 = inputs[1].value;
        if (player2 === "") {
            player2 = "Player 2";
        }
        return {gamemode,player1,player2}
    }
    const checkMode = () => {
        const player2Name = document.getElementsByClassName('player-2')[0];
        if (select.value==="local") {
            player2Name.style.display = "flex";
        } else {
            player2Name.style.display = "none";
        }
    }
    
    const select = document.getElementById('mode');
    select.addEventListener('change',()=>checkMode());
    const inputs = document.querySelectorAll('input');
    
    return {collectData,checkFields}

})();

const playerFactory = (name,team="o") => {
    let wins = 0;
    let ties = 0;
    let loses = 0;
    return {name,wins,ties,loses,team}
}

let player1,player2;
const button = document.querySelector('button');
button.addEventListener('click',()=>{
    let createPlayers = form.checkFields();
    if (createPlayers === true) {
        let info = form.collectData();
        player1 = playerFactory(info.player1,"x");
        player2 = playerFactory("AI");
        if (info.gamemode === "local") {
            player2 = playerFactory(info.player2);   
        }
        console.log(player1);
        console.log(player2);
    }
});