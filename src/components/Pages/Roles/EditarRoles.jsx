import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, FormGroup, Checkbox,InputLabel, MenuItem, Select, Typography } from '@mui/material';
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
import RolService from '../../../services/rolService';


export default function EditarRoles(){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user)

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to='/Roles/Listar'>
      Roles
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Editar registro
    </Typography>,
  ];

  let { id } = useParams();

  const [nombre, setNombre] = useState("");
  const [permisos, setPermisos] = useState([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  useEffect(()=>{
    RolService.obtenerRol({id})
    .then(res => {
        setNombre(res.nombre)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
    PermisoService.listar()
    .then(res => {
      setPermisos(res)
  })
  .catch(error => {
    dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
  })
  },[])

  const handleChangeCheckbox = (event) => { 

    if(event.target.checked)
    {
      if(permisosSeleccionados.length > 0)
      {
        setPermisosSeleccionados([...permisosSeleccionados,{id: event.target.name}])
        return;
      }
      
      setPermisosSeleccionados([{id: event.target.name}])
      return;
    }
    
    if(!event.target.checked)
    {
      let obj = permisosSeleccionados.filter(function(item){
        return item.id !== event.target.name
      })

      setPermisosSeleccionados(obj); 
      return;
    }
  }

  const [errorNombre, setErrorNombre] = useState({
    error:false,
    message:"",
  });

  const [errorPermisos, setErrorPermisos] = useState({
    error:false,
    message:"",
  });

  const handleChange = (event) => {
    setVisible(event.target.value);
  }

  const validateNombre = (nombre) => {
    return nombre != ''
  }

  const validatePermisos = (permisosSeleccionados) => {
    return permisosSeleccionados && permisosSeleccionados.length > 0
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

    if(validatePermisos(permisosSeleccionados))
      {
          setErrorPermisos({
              error:false,
              message:"",
            })
      }
      else
      {
          setErrorPermisos({
              error:true,
              message:"Debe seleccionar al menos un permiso",
            })
            return;
      }

    
    RolService.actualizar({id,nombre,permisos:permisosSeleccionados,usuario:currentUser.id})
        .then(res => {
          dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
          navigateTo('/Roles/Listar')
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
                        Editar rol
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
                    <FormControl error={errorPermisos.error}>
                      <FormLabel id="checkboxs-etapas">Seleccionar Permisos</FormLabel>
                      <FormGroup>
                        {permisos && permisos.map(function(item){
                          return <FormControlLabel key={item.id} control={ <Checkbox key={item.titulo} onChange={handleChangeCheckbox} name={item.id.toString()} />} label={item.titulo}/>
                        })}
                      </FormGroup>
                      {errorPermisos ? (<FormHelperText error>{errorPermisos.message}</FormHelperText>) : null}
                    </FormControl>
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