import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './styles/App.scss'
import { Provider } from 'react-redux'
import { fetchProducts } from './redux/productsSlice'
import store from './redux/store'

store.dispatch(fetchProducts())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)
