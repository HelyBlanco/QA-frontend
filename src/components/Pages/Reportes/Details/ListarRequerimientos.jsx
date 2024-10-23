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
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch } from 'react-redux'
import { detailMessage } from '../../../../store/actions/message';
import {useSelector} from 'react-redux'
import { Badge, Chip } from '@mui/material';
import { useState } from 'react';
import ReporteService from '../../../../services/reporteService';

export default function ListarRequerimientos(props){

  const dispatch = useDispatch();

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
      { id: 'nombre', name: 'Nombre del requerimiento' },
      { id: 'Usuario.Nombre', name: 'Usuario asignado' },
      { id: 'Estado.Nombre', name: 'Estado del requerimiento' }
  ]

  const [requerimientos, setRequerimientos] = useState([]);

  useEffect(()=>{
    listarRegistros()
  },[])

  const listarRegistros = ()=>{
    ReporteService.listarRequerimientos()
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

  return (
    <>
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
                                          <TableCell>{row.nombre}</TableCell>
                                          <TableCell>{row.Usuario.nombre}</TableCell>
                                          <TableCell>
                                          <Chip label={row.Estado.nombre}  sx={{ backgroundColor:`${row.Estado.color}`, color:'#fff', fontWeight:'bold'}}/>
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