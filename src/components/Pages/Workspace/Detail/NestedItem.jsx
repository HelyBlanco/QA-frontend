import { Collapse, Divider, ListItemText, 
         List, ListItemAvatar,Avatar, ListItemButton } from "@mui/material";
import React, { Fragment, useState } from "react";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import SistemaItem from "./SistemaItem";

const NestedItem = ({ item, fn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleEditEstado = () => {
    fn()
  }

  return (
    <List disablePadding>
        <ListItemButton key={item.nombre} button="true" onClick={handleIsOpen}>
            <ListItemAvatar>
                <Avatar sx={{ backgroundColor:'#1769aa'}}>
                    <WorkIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.nombre} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Divider component="li" />
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List disablePadding>
                {item.Sistemas && item.Sistemas.map((sistema) => (
                    <SistemaItem key={sistema.nombre} item={sistema} fn={handleEditEstado}/>
                ))}
            </List>
        </Collapse>
    </List>
  );
};

export default NestedItem;