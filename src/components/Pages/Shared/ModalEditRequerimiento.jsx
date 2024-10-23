import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import EstadoService from '../../../services/estadoService';
import { useDispatch } from 'react-redux';
import { CardActions, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import TareaService from '../../../services/tareaService';
import RequerimientoService from '../../../services/requerimientoService';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ConfirmationDialogEditRequerimiento(props) {
    const dispatch = useDispatch();

    const { onClose, value: valueProp, open, message, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const [detailMessage, setDetailMessage] = React.useState(message);
    const [estados,setEstados] = React.useState([])

    const [estado,setEstado] = useState('')
  
    const [errorEstado, setErrorEstado] = useState({
      error:false,
      message:"",
    });
  
    React.useEffect(() => {
      setValue(valueProp);
      setDetailMessage(message);
      if(open)
      {
        cargarEstados()
      }
    }, [valueProp, open, message]);

    const cargarEstados = () => {
      EstadoService.listar()
      .then(res => {
          setEstados(res)
          cargarEstadoRequerimiento()
      })
      .catch(error => {
        dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
      })
    }

    const cargarEstadoRequerimiento = () => {
        RequerimientoService.obtenerEstadoRequerimiento({id:valueProp.id})
        .then(res => {
            setEstado(res.estadoId)
        })
        .catch(error => {
          dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
        })
    }

    const handleChange = (event) =>{
      setEstado(event.target.value);
    }

    const handleCancel = () => {
      onClose();
    };
  
    const handleSubmit = (e) => {
      e.preventDefault()

      if(estado == '')
        {
          setErrorEstado({
              error:true,
              message:"El estado es requerido",
          })
          return
        }
        else
        {
          setErrorEstado({
              error:false,
              message:"",
          })
        }

      let resp = {id:valueProp.id,estado}

      onClose(resp);
    };
  
    return (
      <BootstrapDialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        {...other}
      >
        <DialogTitle sx={{ display: 'flex', flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
          <IconButton
              aria-label="close"
              onClick={handleCancel}
              sx={(theme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
            <CloseIcon />
          </IconButton>
            Editar estado requerimiento
        </DialogTitle>
        <DialogContent  sx={{ display: 'flex', justifyContent:'center' }} dividers>
        <Box component="form" onSubmit={handleSubmit} sx={{ width:'100%' }}>
            <CardContent>
              <FormControl fullWidth error={errorEstado.error}>
                  <InputLabel id="select-estado-id">Estado</InputLabel>
                  <Select
                  labelId="select-estado-id"
                  id="select-estado"
                  value={estado}
                  label="Estado"
                  onChange={handleChange}
                  >
                  {estados && estados.map(function(option){
                      return (<MenuItem key={option.id} value={option.id}>{option.nombre}</MenuItem>)
                  })}
                  </Select>
                  {errorEstado ? (<FormHelperText error>{errorEstado.message}</FormHelperText>) : null}
              </FormControl>
            </CardContent>
            <CardActions> 
              <Box sx={{ mx: 'auto', width: 'auto' }}>
                <Button type="submit" variant="contained" color="success">Actualizar</Button>
              </Box>
            </CardActions>
          </Box>  
        </DialogContent>
      </BootstrapDialog>
    );
  }

  ConfirmationDialogEditRequerimiento.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.any.isRequired,
    message:PropTypes.string.isRequired,
  };