import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { admin, isAuth } = useAuth()

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="relative" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          {isAuth && (
            <Box>
              <Typography variant="h6" noWrap component="div">
                {admin.firstname} {admin.lastname}
              </Typography>
              <Typography variant="h8" noWrap textAlign="right" component="div">
                {admin.isSuperAdmin && 'Super'} Admin
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
