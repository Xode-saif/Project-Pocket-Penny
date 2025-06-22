import React, { useContext, useState } from 'react'
import axios from 'axios'

// const BASE_URL = "http://localhost:4000/api/v1/"

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    

    // income
    const addIncome = async (income) => {
        const response = await axios.post(`/api/v1/add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`/api/v1/get-incomes`)
        setIncomes(response.data)
    }

    const deleteIncome = async (id) => {
        await axios.delete(`/api/v1/delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome
    }

    // expense
    const addExpense = async (expense) => {
        const response = await axios.post(`/api/v1/add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`/api/v1/get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async (id) => {
        await axios.delete(`/api/v1/delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    // balance & transaction history
    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const recentHistory = () => {
        const recent_history = [...incomes, ...expenses]
        recent_history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return recent_history.slice(0, 5)
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            recentHistory,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}