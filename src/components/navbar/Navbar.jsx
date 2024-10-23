import { AppBar, Box, Button, Drawer } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({navLinks}){

    const [open, setOpen] = useState(false)

    return (
        <>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=> setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App QA
          </Typography>
          
          <Box sx={{ display: {xs:"none", sm:"block"} }}>
              {/* {navLinks.map((item) => (
                    <Button color="inherit" key={item.title} component={NavLink} to={item.path}>{item.title}</Button>
                ))} */}
          </Box>
        </Toolbar>
        </AppBar>
            <Drawer open={open} anchor="left" onClose = {()=>setOpen(false)}>
                <NavListDrawer navLinks={navLinks} setOpen={setOpen}></NavListDrawer>
            </Drawer>
        </>
    );
}