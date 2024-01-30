import './homePage.css'
import Navbar from '../../components/navbar/navbar'
import Sidebar from '../../components/sidebar/sidebar'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { AuthProvider } from '../../contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          <Typography paragraph>Consequat mauris nunc congue nisi vitae suscipit.</Typography>
        </Box>
      </Box>
    </AuthProvider>
  )
}

export default App
