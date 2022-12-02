const board = (()=>{

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
    }
    
    //turn
    let turn = "X";

    //selects board divs
    const cells = document.getElementById("board").querySelectorAll('div');
    cells.forEach(cell => {
        cell.addEventListener('click',()=>playTurn(cell));
    });


})();

