import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Navbar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          <Box>
            <Typography variant="h6" noWrap component="div">
              Jérôme LEGO
            </Typography>
            <Typography variant="h8" noWrap textAlign="right" component="div">
              Super Admin
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
