const board = (()=>{
    //plays round
    const playRound = (cell) => {
        playTurn(cell);
        checkCells();
        if (winner==="X"){
            console.log("nice")
        }
    }
    //add X and O images
    const playTurn = (cell) => {
        if (cell.firstChild === null) {
            const img = document.createElement('img');
            if (turn === "X") {
                img.src = "images/X.svg";
                turn = "O"
            } else if (turn === "O") {
                img.src = "images/O.svg";
                turn = "X";
            }
            cell.appendChild(img);
        }
    };

    //checks if there is a winner
    const checkCells = () => {
        const values = getValues();
        console.log(values);
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
                values.push("X");
            } else if (cell.firstChild.src.includes("images/O.svg")) {
                values.push("O");
            }
        });
        return values;
    }

    //winner
    let winner = "";
    
    //turn
    let turn = "X";

    //selects board divs
    const board = document.getElementById("board").querySelectorAll('div');
    const cells = Array.from(board);
    cells.forEach(cell => {
        cell.addEventListener('click',()=>playRound(cell));
    });


})();

const playerFactory = () => {
    const play = () =>{};
}