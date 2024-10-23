import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Typography, FormHelperText } from '@mui/material';
import Link from '@mui/material/Link';
import { NavLink } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { detailMessage } from '../../../store/actions/message';
import {useSelector} from 'react-redux'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EstadoService from '../../../services/estadoService';

export default function CrearEstados(){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user)

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to='/Estados/Listar'>
      Estados
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Nuevo registro
    </Typography>,
  ];

  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("");

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };

  const [errorNombre, setErrorNombre] = useState({
    error:false,
    message:"",
  });

  const [errorColor, setErrorColor] = useState({
    error:false,
    message:"",
  });

  const validateNombre = (nombre) => {
    return nombre != ''
  }

  const validateColor = (color) => {
    return color != ''
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

    if(validateColor(color))
      {
          setErrorColor({
              error:false,
              message:"",
            })
      }
      else
      {
          setErrorColor({
              error:true,
              message:"Debe elegir un color",
            })
            return;
      }
    
    EstadoService.registrar({nombre,color,usuario:currentUser.id})
        .then(res => {
          dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
          navigateTo('/Estados/Listar')
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
                        Registrar nuevo estado
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
                    <FormControl error={errorColor.error}>
                    <FormLabel id="radio-buttons-color">Color</FormLabel>
                    <RadioGroup
                        aria-labelledby="radio-buttons-color"
                        name="radio-buttons-group"
                        value={color}
                        onChange={handleChangeColor}
                    >
                        <FormControlLabel value="#1976d2" control={<Radio />} label="Azul" sx={{color:'#1976d2', fontWeight:'bold'}}/>
                        <FormControlLabel value="#19d298" control={<Radio />} label="Aqua" sx={{color:'#19d298', fontWeight:'bold'}}/>
                        <FormControlLabel value="#e5d60f" control={<Radio />} label="Amarillo" sx={{color:'#e5d60f', fontWeight:'bold'}}/>
                        <FormControlLabel value="#e52e0f" control={<Radio />} label="Rojo" sx={{color:'#e52e0f', fontWeight:'bold'}}/>
                        <FormControlLabel value="#01b100" control={<Radio />} label="Verde" sx={{color:'#01b100', fontWeight:'bold'}}/>
                        <FormControlLabel value="#000cb1" control={<Radio />} label="Lila" sx={{color:'#000cb1', fontWeight:'bold'}}/>
                        <FormControlLabel value="#e1830b" control={<Radio />} label="Naranja" sx={{color:'#e1830b', fontWeight:'bold'}}/>
                        
                    </RadioGroup>
                    {errorColor ? (<FormHelperText error>{errorColor.message}</FormHelperText>) : null}
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