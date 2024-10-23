import { Collapse, Divider, ListItemText, 
    List, ListItemAvatar,Avatar, ListItemButton } from "@mui/material";
import React, { Fragment, useState } from "react";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ComputerIcon from '@mui/icons-material/Computer';
import DetailItem from "./DetailItem";

const SistemaItem = ({ item, fn }) => {
const [isOpen, setIsOpen] = useState(false);

const handleIsOpen = () => {
setIsOpen(!isOpen);
};

const handleEditEstadoRequerimiento = () => {
    fn()
}

return (
<List disablePadding>
   <ListItemButton sx={{ pl: 5 }} key={item.nombre} button="true" onClick={handleIsOpen}>
       <ListItemAvatar>
           <Avatar sx={{ backgroundColor:'#f50057'}}>
               <ComputerIcon />
           </Avatar>
       </ListItemAvatar>
       <ListItemText primary={item.nombre} />
       {isOpen ? <ExpandLess /> : <ExpandMore />}
   </ListItemButton>
   <Divider component="li" />
   <Collapse in={isOpen} timeout="auto" unmountOnExit>
       <List disablePadding>
           {item.Modulos && item.Modulos.map((modulo)=>{
                return (<DetailItem key={modulo.nombre} item={modulo} fn={handleEditEstadoRequerimiento}/>)
           })}
       </List>
   </Collapse>
</List>
);
};

export default SistemaItem;