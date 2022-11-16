import { TableCell, Table } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TableCellHeader = styled(TableCell)({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderStyle: 'border-box',
    fontWeight: 'bold',
    fontSize: '18px',
})

export const StyledTable = styled(Table)({
    maxWidth: 300,
})
