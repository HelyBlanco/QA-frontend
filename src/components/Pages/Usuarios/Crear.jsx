import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from '@mui/material';
import UsuarioService from '../../../services/usuarioService';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { detailMessage } from '../../../store/actions/message';
import { useEffect } from 'react';
import RolService from '../../../services/rolService';

export default function Crear(){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to='/Usuarios/Listar'>
      Usuarios
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Nuevo registro
    </Typography>,
  ];

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [rolesSeleccionados, setRolesSeleccionados] = useState([]);

  useEffect(()=>{
    RolService.listar()
    .then(res => {
        setRoles(res)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  },[])

  const [errorCorreo, setErrorCorreo] = useState({
    error:false,
    message:"",
  });

  const [errorNombre, setErrorNombre] = useState({
    error:false,
    message:"",
  });

  const [errorPassword, setErrorPassword] = useState({
    error:false,
    message:"",
  });

  const [errorRoles, setErrorRoles] = useState({
    error:false,
    message:"",
  });

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  }

  const validateNombre = (nombre) => {
    return nombre != ''
  }

  const validatePassword = (password, repeatPassword) => {
    return (password != '' && password === repeatPassword)
  }

  const validateRoles = (rolesSeleccionados) => {
    return rolesSeleccionados && rolesSeleccionados.length > 0
  }

  const handleChangeCheckbox = (event) => { 

    if(event.target.checked)
    {
      if(rolesSeleccionados.length > 0)
      {
        setRolesSeleccionados([...rolesSeleccionados,{id: event.target.name}])
        return;
      }
      
      setRolesSeleccionados([{id: event.target.name}])
      return;
    }
    
    if(!event.target.checked)
    {
      let obj = rolesSeleccionados.filter(function(item){
        return item.id !== event.target.name
      })

      setRolesSeleccionados(obj); 
      return;
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(validateEmail(correo)){
      setErrorCorreo({
        error:false,
        message:"",
      })
    }
    else
    {
      setErrorCorreo({
        error:true,
        message:"Correo no válido",
      })
      return;
    }

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

    if(validatePassword(password, repeatPassword))
    {
        setErrorPassword({
            error:false,
            message:"",
            })
    }
    else
    {
        setErrorPassword({
            error:true,
            message:"Las contraseñas no coinciden",
            })
            return;
    }

    if(validateRoles(rolesSeleccionados))
      {
          setErrorRoles({
              error:false,
              message:"",
              })
      }
      else
      {
          setErrorRoles({
              error:true,
              message:"Debe selecciona al menos un rol",
              })
              return;
      }
    
    UsuarioService.registrar({correo,nombre,password,roles:rolesSeleccionados})
        .then(res => {
          dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
          navigateTo('/Usuarios/Listar')
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
                        Registrar usuario
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
                    <TextField id="email" label="Correo electrónico" 
                      type="email" variant="outlined" 
                      error={errorCorreo.error}
                      helperText={errorCorreo.message}
                      value={correo}
                      autoComplete='off'
                      onChange={(e)=> setCorreo(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                    <TextField id="password" label="Contraseña" 
                      type="password" variant="outlined"
                      error={errorPassword.error}
                      helperText={errorPassword.message}
                      value={password}
                      autoComplete='off'
                      onChange={(e)=> setPassword(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                    <TextField id="repeatPassword" label="Repetir contraseña" 
                      type="password" variant="outlined"
                      error={errorPassword.error}
                      helperText={errorPassword.message}
                      value={repeatPassword}
                      autoComplete='off'
                      onChange={(e)=> setRepeatPassword(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                    <FormControl error={errorRoles.error}>
                      <FormLabel id="checkboxs-etapas">Seleccionar Roles</FormLabel>
                      <FormGroup>
                        {roles && roles.map(function(item){
                          return <FormControlLabel key={item.id} control={ <Checkbox key={item.nombre} onChange={handleChangeCheckbox} name={item.id.toString()} />} label={item.nombre}/>
                        })}
                      </FormGroup>
                      {errorRoles ? (<FormHelperText error>{errorRoles.message}</FormHelperText>) : null}
                    </FormControl>
                  </CardContent>
                  <CardActions> 
                    <Box sx={{ mx: 'auto', width: 'auto' }}>
                      <Button type="submit" variant="contained">Guardar</Button>
                    </Box>
                  </CardActions>
                </Box>  
              </Card>
              </Grid>
          </Grid>
      </>
  )
}