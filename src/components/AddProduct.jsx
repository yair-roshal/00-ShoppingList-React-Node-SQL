import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productAdded, productUpdated } from '../redux/productsSlice'
import { URL } from '../constants/allConstants'
import { axiosWrappers } from '../helpers/axios-wrappers'
import Button from '@mui/material/Button'
import _ from 'lodash'

export const AddProduct = () => {
    const dispatch = useDispatch()

    const { entities } = useSelector((state) => state.products)
    const entitiesAmount = useSelector((state) => state.products.entities.length)
console.log('entitiesAmount :>> ', entitiesAmount);
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null)

    const handleName = (e) => setName(e.target.value)
    const handleCategory = (e) => setCategory(e.target.value)

    const onSubmitAddProduct = () => {
        if (name && category) {
            let existProductInCategory = _.find(entities, { name: name, category: category })

            //create new product  ==================
            if (!existProductInCategory) {
                let newProduct = {
                    id: entitiesAmount + 1,
                    name: name,
                    category: category,
                    amount: 1,
                }
console.log('newProduct :>> ', newProduct);
                dispatch(productAdded(newProduct))

                axiosWrappers.postAxios(URL, newProduct)
            } else {
                //update product  ==================
                let product = {
                    id: existProductInCategory.id,
                    name: existProductInCategory.name,
                    category: existProductInCategory.category,
                    amount: existProductInCategory.amount + 1,
                }
                console.log('product :>> ', product);

                dispatch(productUpdated(product))

                axiosWrappers.putAxios(URL, product)
            }

            setError(null)
        } else {
            setError('Fill in all fields!')
        }
    }

    return (
        <>
            <div className='addProductContainer'>
                <div className='inputsRow'>
                    <input
                        type='text'
                        placeholder='Name'
                        id='nameInput'
                        onChange={handleName}
                        value={name}
                    />

                    <select
                        onChange={(e) => handleCategory(e)}
                        name='category'
                        id='category-select'
                    >
                        <option value=''>--Choose Category--</option>
                        <option value='cleaning-products'> Cleaning Products</option>
                        <option value='cheeses'>Cheeses</option>
                        <option value='vegetables-fruits'> Vegetables and Fruits </option>
                        <option value='meat-fish'>Meat and Fish</option>
                        <option value='baking'>Baking</option>
                    </select>

                    <Button onClick={onSubmitAddProduct}>Add product</Button>
                </div>
                {error && <div className='errorStyle'> {error} </div>}
            </div>
        </>
    )
}
