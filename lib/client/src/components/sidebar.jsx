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
import MenuIcon from '@mui/icons-material/Menu'

import { useEffect, useState, useRef } from 'react'

import backend from '../utils/backend'
import { useAuth } from '../contexts/AuthContext'

import ConditionalWrapper from '../components/utils/conditionalWrapper'

function MenuItem({ key, text, tooltip, color = 'primary', onClick }) {
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
        <ListItemButton onClick={onClick}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <TableChartIcon color={color} />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ConditionalWrapper>
    </ListItem>
  )
}

export default function Sidebar({ onTableNameClick }) {
  const [appTables, setAppTables] = useState([])
  const [sdTables, setSdTables] = useState([])
  const [open, setOpen] = useState(true)
  const [drawerWidth, setDrawerWidth] = useState(240)

  const { admin } = useAuth()

  const drawerRef = useRef(null)

  useEffect(() => {
    backend.get('./tables/').then((tables) => {
      setAppTables(tables.data)
    })
    backend.get('./superAdmin/tables/').then((tables) => {
      setSdTables(tables.data)
    })
  }, [])

  return (
    <Drawer
      ref={drawerRef}
      variant="persistent"
      open={true}
      height="100%"
      sx={{
        position: 'relative',
        width: open ? drawerWidth : 55,
        flexShrink: 0,
        transition: 'width 0.4s',

        '& .MuiDrawer-paper': {
          position: 'relative',
          boxSizing: 'border-box',
        },
      }}
    >
      <Button
        sx={{ minWidth: 40, minHeight: 56 }}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </Button>
      <Divider />

      <Box sx={{ overflowX: 'hidden' }}>
        {admin.isSuperAdmin && (
          <>
            <List>
              {sdTables
                .filter((table) => !table.isJonctionTable)
                .map((table, index) => (
                  <MenuItem
                    key={table.tableName}
                    text={table.modelName}
                    color="warning"
                    tooltip={!open && table.modelName}
                    onClick={() => {
                      onTableNameClick(table)
                    }}
                  />
                ))}
            </List>
            <Divider />
          </>
        )}
        <List>
          {appTables
            .filter((table) => !table.isJonctionTable)
            .map((table, index) => (
              <MenuItem
                key={table.tableName}
                text={table.modelName}
                tooltip={!open && table.modelName}
                onClick={() => {
                  onTableNameClick(table)
                }}
              />
            ))}
        </List>
      </Box>
    </Drawer>
  )
}
