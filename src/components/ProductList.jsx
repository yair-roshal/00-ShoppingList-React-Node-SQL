import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { TableCellHeader, StyledTable } from '../styles/styledComponent'
import { allCategories } from '../constants/allConstants'

export const ProductList = () => {
    const { entities } = useSelector((state) => state.products)
    const loading = useSelector((state) => state.loading)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const takeCategories = () => {
            let categories = []

            for (const entity of entities) {
                categories.push(entity.category)
            }
            return _.uniq(categories)
        }
        setCategories(takeCategories())
    }, [entities])

    const sumAllProducts = () => {
        let sum = 0
        for (const entity of entities) {
            sum = sum + entity.amount
        }
        return sum
    }

    return (
        <>
            {loading ? (
                'Loading...'
            ) : (
                <div className='tablesContainer'>
                    {categories.length &&
                        categories.map((category, index) => (
                            <StyledTable aria-label='customized table' key={category + index}>
                                <TableHead>
                                    <TableRow>
                                        <TableCellHeader>{allCategories[category]}</TableCellHeader>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {entities.length &&
                                        entities.map((entity, index) =>
                                            entity.category === category ? (
                                                <TableRow key={entity.name + index}>
                                                    <TableCell>{entity.name}</TableCell>
                                                    {entity.amount > 1 ? (
                                                        <TableCell>{entity.amount}</TableCell>
                                                    ) : null}
                                                </TableRow>
                                            ) : null,
                                        )}
                                </TableBody>
                            </StyledTable>
                        ))}
                </div>
            )}

            <h2 className='cartText'> Cart : {sumAllProducts()} products</h2>
        </>
    )
}
