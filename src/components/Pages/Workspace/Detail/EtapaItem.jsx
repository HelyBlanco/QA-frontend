import { Collapse, Divider, ListItemText, 
    List, ListItemAvatar,Avatar, ListItemButton } from "@mui/material";
import React, { useState } from "react";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskItem from "./TaskItem";
import VerticalMenu from "./VerticalMenu";
import {useDispatch, useSelector} from 'react-redux'
import WorkspaceService from "../../../../services/workspaceService";
import { detailMessage } from "../../../../store/actions/message";

const EtapaItem = ({ item,fn }) => {

const currentUser = useSelector(state => state.authReducer.user)
const dispatch = useDispatch();

const [isOpen, setIsOpen] = useState(false);

const handleIsOpen = () => {
    setIsOpen(!isOpen);
};

const handleNewTask = (newTask) => {

    WorkspaceService.agregarTarea({nombre:newTask.nombre,estado:newTask.estado,moduloEtapa:newTask.moduloEtapa,usuario:currentUser.id})
    .then(res => {
        dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
        fn()
    })
    .catch(error => {
        dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
}

return (
<List disablePadding>
   <ListItemButton sx={{ pl: 8 }} key={item.Etapa.nombre} button="true" onClick={handleIsOpen}>
       <ListItemAvatar>
           <Avatar>
               <AssignmentIcon />
           </Avatar>
       </ListItemAvatar>
       <ListItemText primary={item.Etapa.nombre} />
       <VerticalMenu item={item} fn={handleNewTask}/>
       {isOpen ? <ExpandLess /> : <ExpandMore />}
   </ListItemButton>
   <Divider component="li" />
   <Collapse in={isOpen} timeout="auto" unmountOnExit>
       <List disablePadding>
           {item.Tareas && item.Tareas.map((tarea) => {
                return (<TaskItem key={tarea.nombre} item={tarea} fn={fn}/>)
           })}
       </List>
   </Collapse>
</List>
);
};

export default EtapaItem;