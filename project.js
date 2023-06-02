//CONSTANTS

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


// 1. Deposit money from the user

const prompt = require('prompt-sync')();

const deposit = () => {
    while(true){
    const depositAmount = prompt('Enter a deposit amount: ');
    const numDepositAmount = parseFloat(depositAmount);

    if(isNaN(numDepositAmount) || numDepositAmount <= 0){
        console.log('Invalid amount')
    } else {
        return numDepositAmount;
    }

  } 
};


// 2. Number of lines you want to bet on

const getNumberOfLines = () => {
    while(true){
        const lines = prompt('Enter the number of lines you want to bet on(1-3): ');
        const numOfLines = parseFloat(lines);
    
        if(isNaN(numOfLines) || numOfLines <= 0 || numOfLines > 3){
            console.log('Invalid number')
        } else {
            return numOfLines;
        }
    
    } 
};


// 3. The amount of money you want to bet on (can't be more then the amount of money you deposited)


const betAmountOfMoney = (balance, numOfLines) => {
    while(true){
        const amountOfMoney = prompt('Amount of money per line: ');
        const numAmountOfMoney = parseFloat(amountOfMoney);
    
        if(isNaN(numAmountOfMoney) || numAmountOfMoney <= 0 || numAmountOfMoney > balance / numOfLines){
            console.log('Invalid number')
        } else {
            return numAmountOfMoney;
        }
    
    } 
}


// 4. Spin the slot machine 

const spinTheSlotMachine = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol)
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([])
        const reelSymbols = [...symbols]
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels
}

//CHANGING THE ROWS INTO COLUMNS 

const transpose  = (reels) => {
    const row = [];

    for(let i = 0; i < ROWS; i++) {
        row.push([]);
        for(let j = 0; j < COLS; j++){
            row[i].push(reels[j][i]);
        };
    }; 
    return row
};


//MAKING THE COLUMNS MORE STYLISH

const stringRows = (rows) => {
    for(const row of rows) {
        let rowString = '';
        for(const [i, symbol] of row.entries()) {
            rowString += symbol;
            if(i != row.length - 1) {
                rowString += ' | '
            };
        };
        console.log(rowString);
    };
};

// 5. Check if the user has won

const getWinnings = (rows , bets, lines) => {
    let winnings = 0 

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings = bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings
}

const game = () => {
    let balance = deposit();

    while(true){
        console.log(`Your balance is: $${balance}`)
       const numberOfLines = getNumberOfLines()
       const bet = betAmountOfMoney(balance, numberOfLines);
       balance -= bet * numberOfLines;
       const reels = spinTheSlotMachine()
       const transposeColumns = transpose(reels)
       console.log(stringRows(transposeColumns));
       const winnings = getWinnings(transposeColumns, bet, numberOfLines);
       balance += winnings;
       console.log(`you WON: $${winnings}`);

       if(balance <= 0){
         console.log('You ran out of money!');
         break;
       }

       const playAgain = prompt(`Do you want to play again (y/n)? : `);
       if (playAgain != 'y') break; 
    }
}

game()
