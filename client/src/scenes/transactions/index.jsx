import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetTransactionsQuery } from 'state/api'
import Header from 'components/Header'
import { useTheme, Box } from '@mui/material'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const Transactions = () => {

    const theme = useTheme()
    // values to be sent to the backend
    const [page, setPage] = useState(0)

    const [pageSize, setPageSize] = useState(100)

    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState('')
    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    })

    console.log("🚀 ~ file: index.jsx:22 ~ Transactions ~ data", data)
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1
        },
        {
            field: 'userId',
            headerName: 'User Id',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1,
        },

        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortabe: false,
            renderCell: (params) => params.value.length
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },

    ]
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='TRANSACTIONS' subtitle='entire list of transactions' />
            <Box height='80vh'
                sx={{
                    "& .MuiDataGrid-root": {
                        border: 'none'
                    },
                    "& .MuiDataGrid-cell": {
                        borderButtom: 'none'
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderButtom: 'none'
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: 'none'
                    },
                    "& .MuiDataGrid-footerContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data ? data.transactions : []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100, 150]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode='server'
                    sortingMode='server'
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions