import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { URL } from '../constants/allConstants'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch(URL)
    const products = await response.json()
    return products
})

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        productAdded(state, action) {
            state.entities.push(action.payload)
        },
        productUpdated(state, action) {
            const { id, name, category, amount } = action.payload
            const existingProduct = state.entities.find((product) => product.id === id)
            if (existingProduct) {
                existingProduct.name = name
                existingProduct.category = category
                existingProduct.amount = amount
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.entities = [...state.entities, ...action.payload]
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
        })
    },
})

export const { productAdded, productUpdated } = productsSlice.actions
export default productsSlice.reducer
