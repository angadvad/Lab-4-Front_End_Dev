const numberButtons = document.querySelectorAll('[data-num]')
const operationButtons = document.querySelectorAll('[data-op]');
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const prevOpText = document.querySelector('[data-prevOp]');
const currentOpText = document.querySelector('[data-currentOp]');

class Calculator {
    constructor(currentOpText, prevOpText) {
        this.currentOpText = currentOpText;
        this.prevOpText = prevOpText;
        this.clear();
    }

    clear() {
        this.currentOp = "";
        this.prevOp = "";
        this.op = undefined;
    }

    appendNumber(num) {
        if (num === '.' && this.currentOp.includes('.')){return};
        this.currentOp=this.currentOp.toString() + num.toString();
    }

    chooseOperation(op) {
        if(this.currentOp!='' && this.currentOp !='.'){
            if(this.prevOp!=''){
                this.compute();
            }
            this.op=op;
            this.prevOp=this.currentOp;
            this.currentOp='';
        }else{
            return;
        }
        
    }


    compute() {
        let output;
        const op = this.op;
        const prev = parseFloat(this.prevOp);
        const current = parseFloat(this.currentOp);
        if(this.prevOp==''||this.currentOp=='') return;

        this.operands = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "÷": (a, b) => a / b,
        }

        output=this.operands[op](prev,current);
        this.currentOp = output;
        this.op = undefined
        this.prevOp = '';
    }

    updateDisplay() {
        this.currentOpText.innerHTML = this.currentOp;
        if(this.op != undefined){
            this.prevOpText.innerHTML = this.prevOp + ' ' + this.op;
        }else{
            this.prevOpText.innerHTML = this.prevOp;
        }
        
    }
}

const calculator = new Calculator(currentOpText, prevOpText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    });
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    });
})

clearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

equalButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})
