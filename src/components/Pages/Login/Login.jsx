import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Typography } from '@mui/material';

import {useDispatch} from 'react-redux'
import {login} from '../../../store/actions/auth'
import { useNavigate } from 'react-router-dom';

export default function Login(){
  
  const dispatch = useDispatch()
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    error:false,
    message:"",
  });

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(validateEmail(email)){
      setError({
        error:false,
        message:"",
      })
    }
    else
    {
      setError({
        error:true,
        message:"Correo no válido",
      })
      return;
    }
    
    dispatch(login({correo:email, password:password}, navigateTo))
  }
  return(
      <>
          <Grid container>
              <Grid size={{ xs: 12, sm: 8, md: 4 }} offset={{ xs:0, sm: 2, md: 4 }}>
              <Card sx={{ minWidth: 275 }}>
                <Box component="form" onSubmit={handleSubmit}>
                  <CardContent>
                    <Typography sx={{ textAlign:'center', pb:2, color: 'text.secondary' }}>
                        Ingresar credenciales
                    </Typography>
                    <TextField id="email" label="Correo electrónico" 
                      type="email" variant="outlined" 
                      error={error.error}
                      helperText={error.message}
                      value={email}
                      autoComplete='off'
                      onChange={(e)=> setEmail(e.target.value)}
                      fullWidth sx={{pb:2}}>
                    </TextField>
                    <TextField id="password" label="Contraseña" 
                      type="password" variant="outlined"
                      error={error.error}
                      helperText={error.message}
                      value={password}
                      autoComplete='off'
                      onChange={(e)=> setPassword(e.target.value)}
                      fullWidth xs={{pb:2}}>
                    </TextField>
                  </CardContent>
                  <CardActions> 
                    <Box sx={{ mx: 'auto', width: 'auto' }}>
                      <Button type="submit" variant="contained">Ingresar</Button>
                    </Box>
                  </CardActions>
                </Box>  
              </Card>
              </Grid>
          </Grid>
      </>
  )
}