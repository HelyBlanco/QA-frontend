import { Collapse, Divider, ListItemText, 
    List, ListItemAvatar,Avatar, ListItemButton, 
    Chip} from "@mui/material";
import React, { useState } from "react";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WorkspaceService from "../../../../services/workspaceService";
import { detailMessage } from "../../../../store/actions/message";
import { useDispatch, useSelector } from "react-redux";
import EtapaItem from "./EtapaItem";
import VerticalMenuRequerimiento from "./VerticalMenuRequerimiento";
import RequerimientoService from "../../../../services/requerimientoService";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const DetailItem = ({ item, fn }) => {
const [isOpen, setIsOpen] = useState(false);
const [detalles, setDetalles] = useState([]);

const dispatch = useDispatch();
const currentUser = useSelector(state => state.authReducer.user)

const handleIsOpen = () => {
    setIsOpen(!isOpen);

    if(!isOpen)
    {
        obtenerDetalle()
    }
};

const handleEditEstado = (editEstadoRequerimiento) => {
    RequerimientoService.actualizarEstado ({id:editEstadoRequerimiento.id,estado:editEstadoRequerimiento.estado,usuario:currentUser.id})
    .then(res => {
        dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
        fn()
    })
    .catch(error => {
        dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
}

const obtenerDetalle = () => {
    
    if(item.ModuloEtapas && item.ModuloEtapas.length > 0)
    {
        WorkspaceService.obtenerModulo({data:item.ModuloEtapas})
            .then(res => {
                setDetalles(res);
            })
            .catch(error => {
                dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
            })
    }
}

return (
<List disablePadding>
   <ListItemButton sx={{ pl: 8 }} key={item.nombre} button="true" onClick={handleIsOpen}>
       <ListItemAvatar>
           <Avatar sx={{ backgroundColor:'#357a38'}}>
               <AutoStoriesIcon />
           </Avatar>
       </ListItemAvatar>
       <ListItemText primary={item.nombre} secondary={item.Usuario ? `Usuario asignado: ${item.Usuario.nombre}` : ''}/>
       <Chip label={item.Estado.nombre}  sx={{ backgroundColor:`${item.Estado.color}`, color:'#fff', fontWeight:'bold'}}/>
       <VerticalMenuRequerimiento item={item} fn={handleEditEstado}/>
       {isOpen ? <ExpandLess /> : <ExpandMore />}
   </ListItemButton>
   <Divider component="li" />
   <Collapse in={isOpen} timeout="auto" unmountOnExit>
       <List disablePadding>
           {detalles && detalles.map((detalle) => (
                <EtapaItem key={detalle.Etapa.nombre} item={detalle} fn={obtenerDetalle}/>
           ))}
       </List>
   </Collapse>
</List>
);
};

export default DetailItem;