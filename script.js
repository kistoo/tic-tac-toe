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
        for(let i = 0;i++;i<3) {
            //for columns
            let row1 = cells[i].firstChild.src;
            let row2 = cells[i+3].firstChild.src;
            let row3 = cells[i+6].firstChild.src;
            if(row1===row2 && row2===row3 && row1!==null) {
                getWinner(row1);
                break;
            }
            //for rows
            let col1 = cells[i*3].firstChild.src;
            let col2 = cells[i*3+1].firstChild.src;
            let col3 = cells[i*3+2].firstChild.src;
            if(col1===col2 && col2===col3 && col1!==null) {
                getWinner(col1);
                break;
            }
        }
        //for diagonals
        if (((cells[0].firstChild.src===cells[4].firstChild.src
            && cells[4].firstChild.src===cells[8].firstChild.src)
            || (cells[2].firstChild.src===cells[4].firstChild.src
            && cells[4].firstChild.src === cells[6].firstChild.src))
            && cells[4].firstChild.src !== null) {
                getWinner(cells[4].firstChild.src);
        }
    };
    //returns O or X based on winner
    const getWinner = (text) => {
        if (text.includes("images/X.svg")) {
            winner = "X";
        } else if (text.includes("images/O.svg")) {
            winner = "O"
        }
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