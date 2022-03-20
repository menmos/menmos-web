import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { lightGreen } from '@mui/material/colors'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { logout } from './utils/use-auth'

import * as styles from '../styles/profile.module.scss'

type Properties = {
  username: string
}

const Profile: FC<Properties> = (properties) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement>()
  const open = Boolean(anchorElement)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }
  const handleClose = () => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setAnchorElement(undefined)
  }

  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('login')
  }

  return (
    <div className={styles['profile']} id="profile-menu">
      <Box>
        <IconButton onClick={handleClick} size="small">
          <Avatar sx={{ bgcolor: lightGreen['A400'] }}>{properties.username.charAt(0).toUpperCase()}</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorElement}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            // '^' arrow on top of the menu
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onLogout} id="logout">
          <ListItemIcon>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size="sm" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Profile
