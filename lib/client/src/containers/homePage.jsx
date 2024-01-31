import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'

import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'

import { AuthProvider } from '../contexts/AuthContext'

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <Box sx={{ display: 'flex', height: '100%' }}>
          <Sidebar />

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            <Typography paragraph>Consequat mauris nunc congue nisi vitae suscipit.</Typography>
          </Box>
        </Box>
      </AuthProvider>
    </>
  )
}

export default App
