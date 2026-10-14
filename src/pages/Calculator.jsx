import React, { useState } from 'react'
import '../styles/Calculator.scss'
import buttons from '../data/data'

export const CalculatorAPP = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('0')

  const handleClick = value => {
    if (value === '=') {
      if (!input.trim()) return

      try {
        const calculated = eval(input)

        if (!Number.isFinite(calculated)) {
          setResult('Cannot divide by zero')
        } else {
          setResult(String(calculated))
        }
      } catch (error) {
        console.error('Calculator error:', error)
        setResult('Syntax Error')
      }
    } else if (value === 'C') {
      setInput('')
      setResult('0')
    } else if (value === 'X') {
      setInput(prev => prev.slice(0, -1))
    } else {
      setInput(prev => prev + value)
    }
  }

  const getButtonClass = value => {
    if (value === 'C') return 'btn clear'
    if (value === 'X') return 'btn delete'
    if (value === '=') return 'btn equals'

    if (['+', '-', '*', '/', '%'].includes(String(value))) {
      return 'btn operator'
    }

    if (String(value) === '0') return 'btn zero'

    return 'btn'
  }

  return (
    <main className="calculator-page">
      <div className="calculator-container">
        <div className="calculator-heading">
          <div>
            <span className="calculator-label">CALCULATOR</span>
            <h2>
              Calculate<span>.</span>
            </h2>
          </div>

          <div className="calculator-status">
            <span />
            READY
          </div>
        </div>

        <div className="calculator-top">
          <div className="expression">
            {input || 'Enter an expression'}
          </div>

          <div className="result-row">
            <span className="result-symbol">=</span>
            <div className="result-value">{result}</div>
          </div>
        </div>

        <div className="calculator-bottom">
          {buttons.map((element, i) => (
            <button
              key={`${element}-${i}`}
              type="button"
              className={getButtonClass(element)}
              onClick={() => handleClick(String(element))}
              aria-label={
                element === 'X'
                  ? 'Delete last character'
                  : element === 'C'
                    ? 'Clear calculator'
                    : String(element)
              }
            >
              {element === 'X' ? '⌫' : element}
            </button>
          ))}
        </div>

        <div className="calculator-footer">
          <span>PRECISION IN EVERY CLICK</span>
          <span>@jiteshpandey</span>
        </div>
      </div>
    </main>
  )
}

export default CalculatorAPP