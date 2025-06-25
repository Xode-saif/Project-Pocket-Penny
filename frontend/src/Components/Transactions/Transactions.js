import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

function Transactions() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()

    return (
        <TransactionsStyled>
            <h1>All transactions</h1>
            {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="transactions-item">
                        <p style={{color: type === 'expense' ? 'red' : 'var(--color-green)'}}>
                            {title}
                        </p>

                        <p style={{color: type === 'expense' ? 'red' : 'var(--color-green)'}}>
                            { 
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
    width:60vw;
    padding:1rem;
    
    .transactions-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        margin: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

export default Transactions