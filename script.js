//HTML element
const statusDiv=document.querySelector('.status');
const resetDiv=document.querySelector('.reset');
const cellDivs=document.querySelectorAll('.game-cell');
//game constant 
const xSymbol='×';
const oSymbol='○';
//game variable
let gameIsLive=true;
let xIsNext=true;
//functions
const letterToSymbol =(letter)=>letter==='x'?xSymbol:oSymbol;
const handleWinner =(letter) =>{
    gameIsLive=false;
    
    if(letter==='x'){
    statusDiv.innerHTML= `${letterToSymbol(letter)} has won!!`;
    }
    else
    {
        statusDiv.innerHTML=`<span> ${letterToSymbol(letter)} has won!! </span>`;
    }
}
const checkGameStatus = () =>{
    const topLeft=cellDivs[0].classList[1];
    const topMiddle=cellDivs[1].classList[1];
    const topRight=cellDivs[2].classList[1];
    const middleLeft=cellDivs[3].classList[1];
    const middleMiddle=cellDivs[4].classList[1];
    const middleRight=cellDivs[5].classList[1];
    const bottomLeft=cellDivs[6].classList[1];
    const bottomMiddle=cellDivs[7].classList[1];
    const bottomRight=cellDivs[8].classList[1];
    //winner
    if(topLeft && topLeft===topMiddle && topLeft===topRight)
    {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    } 
    else if(middleLeft && middleLeft===middleMiddle && middleLeft===middleRight)
    {
        handleWinner(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
        
    }
    else if(bottomLeft && bottomLeft===bottomMiddle && bottomLeft===bottomRight)
    {
        handleWinner(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topLeft && topLeft===bottomLeft && topLeft===middleLeft)
    {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMiddle && topMiddle===bottomMiddle && topMiddle===middleMiddle)
    {
        handleWinner(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');

    }
    else if(topRight && topRight===bottomRight && topRight===middleRight)
    {
        handleWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
        
    }
    else if(topLeft && topLeft===middleMiddle && topLeft===bottomRight)
    {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
          
    }
    else if(topRight && topRight===middleMiddle && topRight===bottomLeft)
    {
        handleWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
        
    }
    else if(topLeft && topMiddle && topRight && middleLeft && middleRight && middleMiddle && bottomLeft && bottomMiddle &&bottomRight)
    {
        gameIsLive=false;
        statusDiv.innerHTML=`Game Tie`;
    }
    else{
        xIsNext=!xIsNext;
        if(xIsNext)
        {
            statusDiv.innerHTML=`${xSymbol} is next`;
        }
        else{
            statusDiv.innerHTML=`<span> ${oSymbol} is next </span>`;
        }
    }

};
//event handler 
const handleReset = (e) => {
    xIsNext=true;
    gameIsLive=true;
    statusDiv.innerHTML=`${xSymbol} is next`;
    winner=null;
    for(const cellDiv of cellDivs){
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
      cellDiv.classList.remove('won');
    }
};
const handleCellClick =(e) => {
  const classList=e.target.classList;
 
  if(!gameIsLive || classList[1]==='x'|| classList[1]==='o'){
  return;
  }
  if(xIsNext)
  {
      classList.add('x');
       checkGameStatus();
  }
  else{
      classList.add('o');
      checkGameStatus();
      
  }
};
//event listeners
resetDiv.addEventListener('click',handleReset);
for  (const cellDiv of cellDivs)
{
    //console.log(cellDiv);
    cellDiv.addEventListener('click',handleCellClick);
}