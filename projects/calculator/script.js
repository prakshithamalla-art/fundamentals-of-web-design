class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.history = this.loadHistory() || [];
        
        this.init();
    }

    init() {
        // Display elements
        this.previousOperandElement = document.getElementById('previousOperand');
        this.currentOperandElement = document.getElementById('currentOperand');
        
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => this.appendNumber(button.textContent));
        });
        
        // Operator buttons
        document.querySelectorAll('[data-action="operator"]').forEach(button => {
            button.addEventListener('click', () => this.chooseOperation(button.textContent));
        });
        
        // Equals button
        document.querySelector('[data-action="equals"]').addEventListener('click', () => this.compute());
        
        // Clear button
        document.querySelector('[data-action="clear"]').addEventListener('click', () => this.clear());
        
        // Delete button
        document.querySelector('[data-action="delete"]').addEventListener('click', () => this.delete());
        
        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Clear history button
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());
        
        this.updateDisplay();
        this.renderHistory();
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        if(this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = this.getOperatorSymbol(operation);
        this.previousOperand = `${this.currentOperand} ${this.operation}`;
        this.currentOperand = '';
        this.updateDisplay();
    }

    getOperatorSymbol(op) {
        const symbols = {
            '÷': '÷',
            '×': '×',
            '-': '-',
            '+': '+'
        };
        return symbols[op] || op;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if(isNaN(prev) || isNaN(current)) return;
        
        switch(this.operation) {
            case '÷':
                if(current === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '+':
                computation = prev + current;
                break;
            default:
                return;
        }
        
        // Add to history
        this.addToHistory(`${prev} ${this.operation} ${current}`, computation);
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if(this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if(this.operation != null) {
            this.previousOperandElement.textContent = `${this.previousOperand} ${this.currentOperand}`;
        } else {
            this.previousOperandElement.textContent = this.previousOperand;
        }
    }

    handleKeyboard(e) {
        if(e.key >= '0' && e.key <= '9') this.appendNumber(e.key);
        if(e.key === '.') this.appendNumber('.');
        if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            let op = e.key;
            if(op === '*') op = '×';
            if(op === '/') op = '÷';
            this.chooseOperation(op);
        }
        if(e.key === 'Enter' || e.key === '=') this.compute();
        if(e.key === 'Backspace') this.delete();
        if(e.key === 'Escape') this.clear();
    }

    addToHistory(expression, result) {
        const historyItem = {
            id: Date.now(),
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleString()
        };
        
        this.history.unshift(historyItem);
        if(this.history.length > 10) {
            this.history.pop();
        }
        
        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        const container = document.getElementById('historyList');
        container.innerHTML = this.history.map(item => `
            <div class="history-item">
                <span class="history-expression">${item.expression} =</span>
                <span class="history-result">${item.result}</span>
                <small style="color: #999;">${item.timestamp}</small>
            </div>
        `).join('');
    }

    clearHistory() {
        if(confirm('Clear all history?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    }

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize calculator
const calculator = new Calculator();