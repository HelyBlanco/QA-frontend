import { Route, Routes} from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import { Container } from '@mui/material'
import Home from './components/Pages/Home/Home'
import Login from './components/Pages/Login/Login'

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ProtectedRoute from './components/Router/ProtectedRoute'
import PublicRoute from './components/Router/PublicRoute'
import Crear from './components/Pages/Usuarios/Crear'
import Listar from './components/Pages/Usuarios/Listar'
import {useDispatch, useSelector } from 'react-redux'
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { detailMessage } from './store/actions/message'
import Editar from './components/Pages/Usuarios/Editar'
import ListarProyectos from './components/Pages/Proyectos/ListarProyectos'
import CrearProyectos from './components/Pages/Proyectos/CrearProyectos'
import EditarProyectos from './components/Pages/Proyectos/EditarProyectos'
import ListarEtapas from './components/Pages/Etapas/ListarEtapas'
import CrearEtapas from './components/Pages/Etapas/CrearEtapas'
import EditarEtapa from './components/Pages/Etapas/EditarEtapas'
import ListarSistemas from './components/Pages/Sistemas/ListarSistemas'
import CrearSistemas from './components/Pages/Sistemas/CrearSistema'
import EditarSistemas from './components/Pages/Sistemas/EditarSistema'
import ListarEstados from './components/Pages/Estados/ListarEstados'
import CrearEstados from './components/Pages/Estados/CrearEstados'
import EditarEstados from './components/Pages/Estados/EditarEstados'
import ListarRequerimientos from './components/Pages/Sistemas/Requerimientos/ListarRequerimientos'
import CrearRequerimiento from './components/Pages/Sistemas/Requerimientos/CrearRequerimiento'
import EditarRequerimiento from './components/Pages/Sistemas/Requerimientos/EditarRequerimiento'
import ListarWorkspace from './components/Pages/Workspace/ListarWorkspace'
import MostrarReporte from './components/Pages/Reportes/MostrarReporte'
import ListarPermisos from './components/Pages/Permisos/ListarPermisos'
import CrearPermiso from './components/Pages/Permisos/CrearPermiso'
import EditarPermiso from './components/Pages/Permisos/EditarPermiso'
import ListarRoles from './components/Pages/Roles/ListarRoles'
import CrearRoles from './components/Pages/Roles/CrearRoles'
import EditarRoles from './components/Pages/Roles/EditarRoles'

const navLinks = [
  {
    title:"Inicio", path:"/", icon:<InboxIcon />
  },
  {
    title:"Permisos", path:"/Permisos/Listar", icon:<DraftsIcon />
  },
  {
    title:"Roles", path:"/Roles/Listar", icon:<DraftsIcon />
  },
  {
    title:"Usuarios", path:"/Usuarios/Listar", icon:<InboxIcon />
  },
  {
    title:"Proyectos", path:"/Proyectos/Listar", icon:<InboxIcon />
  },
  {
    title:"Etapas", path:"/Etapas/Listar", icon:<InboxIcon />
  },
  {
    title:"Sistemas", path:"/Sistemas/Listar", icon:<InboxIcon />
  },
  {
    title:"Estados", path:"/Estados/Listar", icon:<InboxIcon />
  },
  {
    title:"Mis requerimientos", path:"/workspace", icon:<InboxIcon />
  },
  {
    title:"Reportes", path:"/reportes", icon:<InboxIcon />
  },
];

function App() {

  const dispatch = useDispatch()

  const showMessage = useSelector(state => state.messageReducer.showMessage)
  const detailsMessage = useSelector(state => state.messageReducer.detailMessage)
  const colorMessage = useSelector(state => state.messageReducer.color)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(detailMessage({detailMessage:'',color:'',showMessage:false}))
  };

  return (
    <>
      <Navbar navLinks={navLinks}/>
      <Container sx={{ mt: 1, height:'100vh'}}>
        <Snackbar open={showMessage} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={colorMessage}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {detailsMessage}
          </Alert>
        </Snackbar>
         <Routes>
            <Route exact path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
            <Route exact path='/Usuarios/Crear' element={<ProtectedRoute><Crear/></ProtectedRoute>}></Route>
            <Route exact path='/Usuarios/Listar' element={<ProtectedRoute><Listar/></ProtectedRoute>}></Route>
            <Route exact path='/Usuarios/Editar/:id' element={<ProtectedRoute><Editar/></ProtectedRoute>}></Route>

            <Route exact path='/Proyectos/Listar' element={<ProtectedRoute><ListarProyectos/></ProtectedRoute>}></Route>
            <Route exact path='/Proyectos/Crear' element={<ProtectedRoute><CrearProyectos/></ProtectedRoute>}></Route>
            <Route exact path='/Proyectos/Editar/:id' element={<ProtectedRoute><EditarProyectos/></ProtectedRoute>}></Route>

            <Route exact path='/Etapas/Listar' element={<ProtectedRoute><ListarEtapas/></ProtectedRoute>}></Route>
            <Route exact path='/Etapas/Crear' element={<ProtectedRoute><CrearEtapas/></ProtectedRoute>}></Route>
            <Route exact path='/Etapas/Editar/:id' element={<ProtectedRoute><EditarEtapa/></ProtectedRoute>}></Route>

            <Route exact path='/Estados/Listar' element={<ProtectedRoute><ListarEstados/></ProtectedRoute>}></Route>
            <Route exact path='/Estados/Crear' element={<ProtectedRoute><CrearEstados/></ProtectedRoute>}></Route>
            <Route exact path='/Estados/Editar/:id' element={<ProtectedRoute><EditarEstados/></ProtectedRoute>}></Route>

            <Route exact path='/Sistemas/Listar' element={<ProtectedRoute><ListarSistemas/></ProtectedRoute>}></Route>
            <Route exact path='/Sistemas/Crear' element={<ProtectedRoute><CrearSistemas/></ProtectedRoute>}></Route>
            <Route exact path='/Sistemas/Editar/:id' element={<ProtectedRoute><EditarSistemas/></ProtectedRoute>}></Route>

            <Route exact path='/Sistemas/Requerimientos/:id' element={<ProtectedRoute><ListarRequerimientos/></ProtectedRoute>}></Route>
            <Route exact path='/Sistemas/Requerimientos/:id/Crear' element={<ProtectedRoute><CrearRequerimiento/></ProtectedRoute>}></Route>
            <Route exact path='/Sistemas/Requerimientos/:id/Editar/:requerimiento' element={<ProtectedRoute><EditarRequerimiento/></ProtectedRoute>}></Route>

            <Route exact path='/Workspace' element={<ProtectedRoute><ListarWorkspace/></ProtectedRoute>}></Route>
            <Route exact path='/reportes' element={<ProtectedRoute><MostrarReporte/></ProtectedRoute>}></Route>

            <Route exact path='/Permisos/Listar' element={<ProtectedRoute><ListarPermisos/></ProtectedRoute>}></Route>
            <Route exact path='/Permisos/Crear' element={<ProtectedRoute><CrearPermiso/></ProtectedRoute>}></Route>
            <Route exact path='/Permisos/Editar/:id' element={<ProtectedRoute><EditarPermiso/></ProtectedRoute>}></Route>

            <Route exact path='/Roles/Listar' element={<ProtectedRoute><ListarRoles/></ProtectedRoute>}></Route>
            <Route exact path='/Roles/Crear' element={<ProtectedRoute><CrearRoles/></ProtectedRoute>}></Route>
            <Route exact path='/Roles/Editar/:id' element={<ProtectedRoute><EditarRoles/></ProtectedRoute>}></Route>

            <Route path='/Login' element={<PublicRoute><Login/></PublicRoute>}/>
          </Routes>
      </Container>
    </>
  )
}

export default App
