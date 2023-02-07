import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetUserPerformanceQuery } from 'state/api'
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import CustomColumnMenu from 'components/DataGridCustomColumnMenu'

const Performance = () => {

  const theme = useTheme()
  const userId = useSelector((state) => state.global.userId)
  const { data, isLoading } = useGetUserPerformanceQuery(userId)



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
      field: 'country',
      headerName: 'Country',
      flex: 0.4,
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.5,
    },
  ]


  return (
    <Box m='1.5rem 2.5rem' >
      <Header title='PERFORMANCE' subtitle='Track your affiliate sales' />
      <Box
        mt='40px'
        height='75vh'
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
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu
          }}
        />
      </Box>
    </Box>
  )
}

export default Performance