import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch } from 'react-redux'
import {useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import { Typography } from '@mui/material';
import { detailMessage } from '../../../../store/actions/message';
import RequerimientoService from '../../../../services/requerimientoService';

export default function ListarRequerimientos(props){

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.authReducer.user)

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={NavLink} to='/'>
      Inicio
    </Link>,
    <Link underline="hover" key="2" color="inherit" component={NavLink} to='/Sistemas/Listar'>
      Sistemas
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Requerimientos
    </Typography>,
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const columns = [
      { id: 'id', name: 'Id' },
      { id: 'nombre', name: 'Nombre' },
      { id: 'Usuario.nombre', name: 'Usuario asignado' },
      { id: 'accion', name: 'Accion' }
  ]
  
  let { id } = useParams();

  const [requerimientos, setRequerimientos] = useState([]);
  const [nombreSistema,setNombreSistema] = useState('');

  useEffect(()=>{
    detalleSistema()
    listarRegistros()
  },[])

  const detalleSistema = () =>{
    RequerimientoService.detalle({id:id})
    .then(res => {
      setNombreSistema(res.nombre.toUpperCase())
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  }

  const listarRegistros = ()=>{
    RequerimientoService.listar({id:id})
    .then(res => {
      setRequerimientos(res)
    })
    .catch(error => {
      dispatch(detailMessage({detailMessage:error.response,color:'error',showMessage:true}))
    })
  }

  const [rowperpage, rowperpagechange] = useState(10);
  const [page, pagechange] = useState(0);

  const handlepagechange = (event, newpage) => {
    pagechange(newpage);
  }

  const handlerowperpagechange = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  }

  const functionadd = () => {
    navigateTo(`/Sistemas/Requerimientos/${id}/Crear`)
  }

  const handleEdit = (code) => {
    navigateTo('/Sistemas/Requerimientos/'+id+'/Editar/'+code)
  }

  const handleRequirements = (code) => {
    navigateTo('/Sistemas/Requerimientos/'+code)
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
          RequerimientoService.eliminarSistema({id:code,usuario:currentUser.id})
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
            Listado de requerimientos de sistema {nombreSistema}
        </Typography>
      </div>
      <div style={{ margin: '1%' }}>
          <Button onClick={functionadd} variant="contained">Nuevo registro</Button>
      </div>
    </Box>
    <Paper sx={{ margin: '1%' }}>
      <div>
          <TableContainer>
              <Table size="small">
                  <TableHead>
                      <TableRow>
                          {columns.map((column) =>
                              <StyledTableCell key={column.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>{column.name}</StyledTableCell>
                          )}
                      </TableRow>

                  </TableHead>
                  <TableBody>
                      {requerimientos &&
                          requerimientos
                              .slice(page * rowperpage, page * rowperpage + rowperpage)
                              .map((row, i) => {
                                  return (
                                      <TableRow key={i}>
                                          <TableCell>{row.id}</TableCell>
                                          <TableCell>{row.nombre}</TableCell>
                                          <TableCell>{row.Usuario.nombre}</TableCell>
                                          <TableCell>
                                              <Button size="small" onClick={e => { handleEdit(row.id) }} variant="contained" color="success">Detalle</Button>
                                              <Button size="small" onClick={e => { handleRemove(row.id) }} variant="contained" color="error">Eliminar</Button>
                                          </TableCell>
                                      </TableRow>
                                  )
                              })
                      }

                  </TableBody>
              </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[2, 5, 10, 20]}
              rowsPerPage={rowperpage}
              page={page}
              count={requerimientos.length}
              component={'div'}
              onPageChange={handlepagechange}
              onRowsPerPageChange={handlerowperpagechange}
          >

          </TablePagination>
      </div>
  </Paper>
    </>
  )
}