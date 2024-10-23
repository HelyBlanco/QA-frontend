import { Collapse, Divider, ListItemText, 
    List, ListItemAvatar,Avatar, ListItemButton, 
    Chip} from "@mui/material";
import React, { useState } from "react";

import TaskIcon from '@mui/icons-material/Task';
import ListItemIcon from '@mui/material/ListItemIcon';
import VerticalMenuEdit from "./VerticalMenuEdit";
import TareaService from "../../../../services/tareaService";
import {useDispatch, useSelector} from 'react-redux'
import { detailMessage } from "../../../../store/actions/message";

const TaskItem = ({ item,fn }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authReducer.user)

const handleNewTask = (editTask) => {

    TareaService.actualizar({id:editTask.id,nombre:editTask.nombre,estado:editTask.estado,usuario:currentUser.id})
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
   <ListItemButton sx={{ pl: 10 }} button="true" key={item.nombre}>
       <ListItemIcon>
            <TaskIcon />
       </ListItemIcon>
       <ListItemText primary={item.nombre} />
       <Chip label={item.Estado.nombre}  sx={{ backgroundColor:`${item.Estado.color}`, color:'#fff', fontWeight:'bold'}}/>
       <VerticalMenuEdit item={item} fn={handleNewTask}/>
   </ListItemButton>
   <Divider component="li" />
</List>
);
};

export default TaskItem;