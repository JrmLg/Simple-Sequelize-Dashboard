import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'

import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import TableView from '../components/tableView'

import { useState } from 'react'
import { AuthProvider } from '../contexts/AuthContext'

function App() {
  const [currentTable, setCurrentTable] = useState()

  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Navbar />

          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Sidebar onTableNameClick={setCurrentTable} />
            {currentTable && <TableView table={currentTable} />}
          </Box>
        </Box>
      </AuthProvider>
    </>
  )
}

export default App
