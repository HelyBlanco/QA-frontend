import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { NavLink, useParams } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { detailMessage } from '../../../store/actions/message';
import {useSelector} from 'react-redux'
import PermisoService from '../../../services/permisoService';
import { useEffect } from 'react';


const estadoVisible = [
    {
      'id':1,
      'nombre':'Si'
    },
    {
      'id':0,
      'nombre':'No'
    },
  ]

export default function EditarPermiso(){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user)

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to='/Permisos/Listar'>
      Permisos
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Editar registro
    </Typography>,
  ];

  let { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [ruta, setRuta] = useState("");
  const [orden, setOrden] = useState('');
  const [visible, setVisible] = useState('');

  useEffect(()=>{
    PermisoService.obtenerPermiso({id})
    .then(res => {
        setNombre(res.titulo)
        setRuta(res.ruta)
        setOrden(res.orden)
        setVisible(res.visible)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  },[])

  const [errorNombre, setErrorNombre] = useState({
    error:false,
    message:"",
  });

  const [errorVisible, setErrorVisible] = useState({
    error:false,
    message:"",
  });

  const [errorRuta, setErrorRuta] = useState({
    error:false,
    message:"",
  });

  const [errorOrden, setErrorOrden] = useState({
    error:false,
    message:"",
  });

  const validateVisible = (visible) => {
    return !isNaN(visible)
  }

  const handleChange = (event) => {
    setVisible(event.target.value);
  }

  const validateNombre = (nombre) => {
    return nombre != ''
  }

  const validateRuta = (ruta) => {
    return ruta != ''
  }

  const validateOrden = (ruta) => {
    return !isNaN(orden) && orden > 0
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(validateNombre(nombre))
    {
        setErrorNombre({
            error:false,
            message:"",
          })
    }
    else
    {
        setErrorNombre({
            error:true,
            message:"El nombre es requerido",
          })
          return;
    }

    if(validateRuta(ruta))
      {
          setErrorRuta({
              error:false,
              message:"",
            })
      }
      else
      {
          setErrorRuta({
              error:true,
              message:"La ruta es requerida",
            })
            return;
      }

      if(validateVisible(visible))
        {
          setErrorVisible({
              error:false,
              message:"",
            })
      }
      else
      {
        setErrorVisible({
              error:true,
              message:"La visibilidad es requerida",
            })
            return;
      } 

      if(validateOrden(orden))
        {
            setErrorOrden({
                error:false,
                message:"",
              })
        }
        else
        {
            setErrorOrden({
                error:true,
                message:"El número de orden de despliegue es requerido",
              })
              return;
        }

    
    PermisoService.actualizar({id,nombre,ruta,orden,visible,usuario:currentUser.id})
        .then(res => {
          dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
          navigateTo('/Permisos/Listar')
        })
        .catch(error => {
          dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
        })
  }
  return(
      <>
      <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb">
          {breadcrumbs}
      </Breadcrumbs>
          <Grid container>
              <Grid size={{ xs: 12, sm: 8, md: 6 }} offset={{ xs:0, sm: 2, md: 3 }}>
              <Card sx={{ minWidth: 275 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <CardContent>
                    <Typography sx={{ textAlign:'center', pb:2, color: 'text.secondary' }}>
                        Editar permiso
                    </Typography>
                    <TextField id="nombre" label="Nombre" 
                      type="text" variant="outlined" 
                      error={errorNombre.error}
                      helperText={errorNombre.message}
                      value={nombre}
                      autoComplete='off'
                      onChange={(e)=> setNombre(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                    <FormControl fullWidth error={errorVisible.error} sx={{ pb:2 }}>
                        <InputLabel id="select-visible-id">Menú visible</InputLabel>
                        <Select
                        labelId="select-visible-id"
                        id="select-visible"
                        value={visible}
                        label="Menú visible"
                        onChange={handleChange}
                        >
                        {estadoVisible && estadoVisible.map(function(option){
                            return (<MenuItem key={option.id} value={option.id}>{option.nombre}</MenuItem>)
                        })}
                        </Select>
                        {errorVisible ? (<FormHelperText error>{errorVisible.message}</FormHelperText>) : null}
                    </FormControl>
                    <TextField id="ruta" label="Ruta" 
                      type="text" variant="outlined" 
                      error={errorRuta.error}
                      helperText={errorRuta.message}
                      value={ruta}
                      autoComplete='off'
                      onChange={(e)=> setRuta(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                    <TextField id="orden" label="Orden de despliegue" 
                      type="text" variant="outlined" 
                      error={errorOrden.error}
                      helperText={errorOrden.message}
                      value={orden}
                      autoComplete='off'
                      onChange={(e)=> setOrden(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                  </CardContent>
                  <CardActions> 
                    <Box sx={{ mx: 'auto', width: 'auto' }}>
                      <Button type="submit" variant="contained" color="success">Editar</Button>
                    </Box>
                  </CardActions>
                </Box>  
              </Card>
              </Grid>
          </Grid>
      </>
  )
}