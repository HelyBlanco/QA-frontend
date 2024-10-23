import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Typography, FormHelperText, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Link from '@mui/material/Link';
import { NavLink, useParams } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { detailMessage } from '../../../../store/actions/message';
import {useSelector} from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import SistemaService from '../../../../services/sistemaService';
import ProyectoService from '../../../../services/proyectoService';
import RequerimientoService from '../../../../services/requerimientoService';
import EstadoService from '../../../../services/estadoService';

export default function EditarRequerimiento(){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user)
  let { id, requerimiento } = useParams();
  const rutaAnterior = `/Sistemas/Requerimientos/${id}`

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to='/Sistemas/Listar'>
      Sistemas
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to={rutaAnterior}>
      Requerimientos
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Detalle de registro
    </Typography>,
  ];

  const [nombre, setNombre] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [etapasSeleccionadas, setEtapasSeleccionadas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [estado, setEstado] = useState('');

  useEffect(()=>{
    listarRegistros()
    listarEstados()
  },[])

  const listarEstados = () => {
    EstadoService.listar()
    .then(res => {
      setEstados(res)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  }

  const cargarRegistro = () =>{
    RequerimientoService.obtenerRequerimiento({id,requerimiento})
        .then(res => {
            setNombre(res.nombre)
            setUsuarioId(res.usuarioId)
            setEstado(res.estadoId)
            
            res.ModuloEtapas.map(item => {
              setEtapasSeleccionadas([...etapasSeleccionadas, {id: `${item.etapaId}`}])
            })

            listarEtapas()
        })
        .catch(error => {
          dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
        })
  }

  const listarRegistros = ()=>{
    RequerimientoService.usuarios()
      .then(res => {
        setUsuarios(res)
        cargarRegistro()
      })
      .catch(error => {
        dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
      })
  }

  const listarEtapas = ()=>{
    RequerimientoService.etapas()
    .then(res => {
      setEtapas(res)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  }

  const handleChange = (event) => {
    setProyecto(event.target.value);
  };

  const handleChangeEstado = (event) => {
    setEstado(event.target.value)
  }

  const handleChangeCheckbox = (event) => { 
    
    if(event.target.checked)
    {
      if(etapasSeleccionadas.length > 0)
      {
        setEtapasSeleccionadas([...etapasSeleccionadas,{id: event.target.name}])
        return;
      }
      
      setEtapasSeleccionadas([{id: event.target.name}])
      return;
    }
    
    if(!event.target.checked)
    {
      let obj = etapasSeleccionadas.filter(function(item){
        return item.id !== event.target.name
      })

      setEtapasSeleccionadas(obj); 
      return;
    }
  }

  const [errorEstado, setErrorEstado] = useState({
    error:false,
    message:"",
  });

  const [errorNombre, setErrorNombre] = useState({
    error:false,
    message:"",
  });

  const [errorUsuario, setErrorUsuario] = useState({
    error:false,
    message:"",
  });

  const validateEstado = (estado) => {
    return estado != undefined && estado > 0
  }


  const [errorEtapas, setErrorEtapas] = useState({
    error:false,
    message:"",
  });

  const validateNombre = (nombre) => {
    return nombre != ''
  }

  const validateUsuario = (usuarioId) => {
    return usuarioId != undefined && usuarioId > 0
  }

  const validateEtapas = (etapas) => {
    return etapasSeleccionadas.length > 0
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

    if(validateEstado(estado))
      {
          setErrorEstado({
              error:false,
              message:"",
            })
      }
      else
      {
          setErrorEstado({
              error:true,
              message:"El estado inicial es requerido",
            })
            return;
      }

    if(validateUsuario(usuarioId))
        {
            setErrorUsuario({
                error:false,
                message:"",
              })
        }
        else
        {
            setErrorUsuario({
                error:true,
                message:"El nombre del usuario es requerido",
              })
              return;
        }
    
    RequerimientoService.actualizar({id:id,nombre,usuarioId,estado,usuario:currentUser.id})
        .then(res => {
          dispatch(detailMessage({detailMessage:res.message,color:'success',showMessage:true}))
          navigateTo(rutaAnterior)
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
                        Detalle registro de requerimiento
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
                    <FormControl fullWidth error={errorUsuario.error} sx={{pb:2}}>
                        <InputLabel id="select-proyecto-id">Usuario Asignado</InputLabel>
                        <Select
                        labelId="select-proyecto-id"
                        id="select-proyecto"
                        value={usuarioId}
                        label="Usuario Asignado"
                        onChange={handleChange}
                        >
                        {usuarios && usuarios.map(function(option){
                            return (<MenuItem key={option.id} value={option.id}>{option.nombre}</MenuItem>)
                        })}
                        </Select>
                        {errorUsuario ? (<FormHelperText error>{errorUsuario.message}</FormHelperText>) : null}
                    </FormControl>
                    <FormControl fullWidth error={errorEstado.error} sx={{pb:2}}>
                        <InputLabel id="select-estado-id">Seleccionar estado</InputLabel>
                        <Select
                        labelId="select-estado-id"
                        id="select-estado"
                        value={estado}
                        label="Seleccionar estado"
                        onChange={handleChangeEstado}
                        >
                        {estados && estados.map(function(option){
                            return (<MenuItem key={option.id} value={option.id}>{option.nombre}</MenuItem>)
                        })}
                        </Select>
                        {errorUsuario ? (<FormHelperText error>{errorUsuario.message}</FormHelperText>) : null}
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