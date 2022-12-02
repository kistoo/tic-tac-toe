const board = (()=>{
    //ends game
    const endGame = () => {
        announcement.querySelectorAll('h1')[0].textContent = `${winner} wins!`;
        announcement.style.display= "flex";
        announcement.className = "win";
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
        //checks for empty cells
        if (values.indexOf(null)===-1) {
            endGame();
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
        }
    }
    const collectData = () => {
        const gamemode = select.value;
        const player1 = inputs[0].value;
        const player2 = inputs[1].value;
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
    const button = document.querySelector('button');
    button.addEventListener('click',()=>checkFields());
    
})();


const playerFactory = () => {
    const play = () =>{};
}