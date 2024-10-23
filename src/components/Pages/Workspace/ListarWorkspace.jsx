import * as React from 'react';
import {Box, } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch } from 'react-redux'
import { detailMessage } from '../../../store/actions/message';
import {useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

import EtapaService from '../../../services/etapaService';
import WorkspaceService from '../../../services/workspaceService';
import NestedItem from './Detail/NestedItem';

export default function ListarWorkspace(props){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user)

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Mis requerimientos
    </Typography>,
  ];

  const [requerimientos, setRequerimientos] = useState([]);
  const [estadoProyecto, setEstadoProyecto] = useState({});

  useEffect(()=>{
    listarRegistros()
  },[])

  const listarRegistros = ()=>{
    
    WorkspaceService.listar()
    .then(res => {
      setRequerimientos(res)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  }

  const handleEdit = (code) => {
    navigateTo('/Etapas/Editar/'+code)
  }

  const handleRemove = (code) => {
    showSwal(code)
  }

  const showSwal = (code) => {
    Swal.fire({
      title: 'Mensaje de confirmación',
      icon: "warning",
      text: "Está seguro de eliminar el registro?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Ok",
    }).then((result)=>{
      if (result.isConfirmed) {
          EtapaService.eliminarEtapa({id:code,usuario:currentUser.id})
            .then(res => {
              dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
              listarRegistros()
            })
            .catch(error => {
              if(error !== 'undefined' && error.response !== 'undefined')
              {
                  let {response} = error
                  let {data} = response
                  let {message} = data
                  
                  dispatch(detailMessage({detailMessage:message,color:'error',showMessage:true}))
                  return
              }
              dispatch(detailMessage({detailMessage:'Error desconocido',color:'error',showMessage:true}))
            })
      }
    })
  }

  return (
    <>
    <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
    </Breadcrumbs>
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ margin: '1%' }}>
        <Typography sx={{ color: 'text.secondary', fontWeight:'bold' }}>
            Listado de requerimientos
        </Typography>
      </div>
    </Box>
    <Paper sx={{ margin: '1%' }}>
      <div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} disablePadding>
        {requerimientos.length > 0 && requerimientos.map((item) => (
          <NestedItem key={item.nombre} item={item} fn={listarRegistros}/>
        ))}
      </List>  
      </div>
    </Paper>
    </>
  )
}