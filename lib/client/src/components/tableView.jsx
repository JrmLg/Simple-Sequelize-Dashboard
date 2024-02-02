import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { useState, useEffect } from 'react'

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'

import backend from '../utils/backend'

export default function TableView({ table }) {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const [primaryKey, setPrimaryKey] = useState('id')

  const materialTable = useMaterialReactTable({
    columns,
    data: rows,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableColumnResizing: true,
    enableColumnPinning: true,
    muiTablePaperProps: ({ table }) => ({
      // elevation: 1,
      style: {
        zIndex: table.getState().isFullScreen ? 1300 : undefined,
      },
    }),
  })

  useEffect(() => {
    backend.get(table.url).then((res) => {
      setPrimaryKey(table.primaryKey)
      setRows(res.data)

      setColumns(
        Array.from(Object.entries(table.fields)).map(([fieldName, fieldInfo]) => {
          return {
            header: fieldName,
            accessorKey: fieldName,
            // Cell: (row) => <Typography paragraph>{row[fieldName]}</Typography>,
          }
        }),
      )
      console.log('Data for table : ', table.modelName, res.data, typeof res.data)
      console.log(table)
    })
  }, [table.tableName])

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: 1, width: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, height: 56 }}>
        <Typography variant="h6" component="h1">
          {table.modelName}
        </Typography>
      </Box>
      <Divider />

      <MaterialReactTable table={materialTable} sx={{ boxShadow: 1 }} />
    </Box>
  )
}
