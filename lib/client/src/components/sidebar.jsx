import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Tooltip from '@mui/material/Tooltip'

import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import TableChartIcon from '@mui/icons-material/TableChart'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { useEffect, useState, useRef } from 'react'

import backend from '../utils/backend'
import { useAuth } from '../contexts/AuthContext'

import ConditionalWrapper from '../components/utils/conditionalWrapper'

function MenuItem({ key, text, tooltip, color = 'primary' }) {
  return (
    <ListItem key={key} disablePadding>
      <ConditionalWrapper
        condition={tooltip}
        wrapper={(children) => {
          return (
            <Tooltip title={tooltip} placement="right">
              {children}
            </Tooltip>
          )
        }}
      >
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <TableChartIcon color={color} />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ConditionalWrapper>
    </ListItem>
  )
}

export default function Sidebar() {
  const [appTableNames, setAppTableNames] = useState([])
  const [sdTableNames, setSdTableNames] = useState([])
  const [open, setOpen] = useState(true)
  const [drawerWidth, setDrawerWidth] = useState(240)

  const { admin } = useAuth()

  const drawerRef = useRef(null)

  useEffect(() => {
    backend.get('./tables/').then((tableNames) => {
      setAppTableNames(tableNames.data)
    })
    backend.get('./superAdmin/tables/').then((tableNames) => {
      setSdTableNames(tableNames.data)
    })
  }, [])

  return (
    <nav>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Drawer
          ref={drawerRef}
          variant="persistent"
          open={true}
          sx={{
            position: 'relative',
            width: open ? drawerWidth : 55,
            flexShrink: 0,
            transition: 'width 0.5s',

            '& .MuiDrawer-paper': {
              position: 'relative',
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ overflowX: 'hidden' }}>
            {admin.isSuperAdmin && (
              <>
                <List>
                  {sdTableNames
                    .map((tableName) => {
                      let displayedName = tableName.replace('sd_', '')
                      displayedName = displayedName.at(0).toUpperCase() + displayedName.slice(1)
                      return [tableName, displayedName]
                    })
                    .map(([tableName, displayedName], index) => (
                      <MenuItem key={tableName} text={displayedName} color="warning" tooltip={!open && displayedName} />
                    ))}
                </List>
                <Divider />
              </>
            )}
            <List>
              {appTableNames
                .map((tableName) => [tableName, tableName.at(0).toUpperCase() + tableName.slice(1)])
                .map(([tableName, displayedName], index) => (
                  <MenuItem key={tableName} text={displayedName} tooltip={displayedName} />
                ))}
            </List>
          </Box>
        </Drawer>
        <Button
          sx={{ minWidth: 10, p: 0 }}
          onClick={() => {
            setOpen(!open)
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
      </Box>
    </nav>
  )
}
