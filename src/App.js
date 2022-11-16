import React from 'react'
import { AddProduct } from './components/AddProduct'
import { ProductList } from './components/ProductList'

export const App = () => {
    return (
        <>
            <h1 className='titlePage'>Shopping List</h1>
            <AddProduct />
            <ProductList />
        </>
    )
}
