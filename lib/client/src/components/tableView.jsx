import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import backend from '../utils/backend'

export default function TableView({ table }) {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [primaryKey, setPrimaryKey] = useState('id')

  useEffect(() => {
    backend.get(table.url).then((res) => {
      setPrimaryKey(table.primaryKey)
      setRows(res.data)
      setColumns(
        Array.from(Object.entries(table.fields)).map(([fieldName, fieldInfo]) => {
          return {
            field: fieldName,
            headerName: fieldName,
            // width: 150,
            flex: 1,
          }
        }),
      )
      console.log('Data for table : ', table.modelName, res.data, typeof res.data)
      console.log(table)
    })
  }, [table.tableName])

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: 1, width: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', pr: 2, pl: 2, height: 56 }}>
        <Typography variant="h6" component="h1">
          {table.modelName}
        </Typography>
      </Box>

      <DataGrid
        sx={{
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
        }}
        rows={rows}
        columns={columns}
        getRowId={(row) => row[primaryKey]}
      />
    </Box>
  )
}
