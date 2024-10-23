import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import { logout } from "../../store/actions/auth";
import InboxIcon from "@mui/icons-material/Inbox";

export default function NavListDrawer({navLinks, setOpen}){

    const dispatch = useDispatch()
    const menu = useSelector(state => state.authReducer.menu)

    const salir = (e)=>{
        e.preventDefault()
        setOpen(false)
        dispatch(logout())
    }

    return (
        <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
            <List>
                {menu &&
                    menu.map((item) => (
                        <ListItem disablePadding key={item.titulo}>
                            <ListItemButton component={NavLink} to={item.ruta} onClick={()=> setOpen(false)}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText>{item.titulo}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
            <List>
                <ListItem disablePadding key='salir'>
                    <ListItemButton component={NavLink} to='#' onClick={salir}>
                        <ListItemText>Cerrar sesión</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            </nav>
      </Box>
    )
}