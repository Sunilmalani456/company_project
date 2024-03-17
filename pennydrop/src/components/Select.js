import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../compound/Header'
import Titled from '../compound/Titled'

const Select = () => {

  const[data , setData] = React.useState("")

  async function getData(){
    const fetchData = await fetch("transtoken/");
    const data = await fetchData.json();
    const value = Object.values(data);
    const resp = value[1];
    console.log(resp);
    setData(resp)
  }

getData();

  const navigate = useNavigate();

  return (
    <div className="select" >
        {/* <Header  /> */}
      <div className='typo'>
      <Titled />
      </div>

      <div className='compo'>
        <span style={{ display:'flex' , alignItems:'center' , justifyContent:'space-evenly' , cursor:'pointer' , marginTop:'2rem'}}>

        


        <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        sx={{ height: 180 }}
        image="/2879845.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align='center' >
          NEFT
        </Typography>
        <Typography variant="body2" color="text.secondary">
        NEFT is an electronic funds transfer system set up and managed by the Reserve Bank of India. 
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={((e) => navigate("/neft" , {state : {id :2 , data}}) )} variant='contained' fullWidth  size="small">Access</Button>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        sx={{ height: 180 }}
        image="/4137379.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align='center' >
          IMPS
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Its a Single mobile application for accessing different bank accounts over a single Network
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' fullWidth  size="small" onClick={() => navigate("/imps" , {state : {id:1 , data}})}  >Access</Button>
      </CardActions>
    </Card>



    <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        sx={{ height: 180 }}
        image="/2903544.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align='center' >
          UPI
        </Typography>
        <Typography variant="body2" color="text.secondary">
        IMPS provides robust & real time fund transfer which offers an instant, 24X7
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate("/upi")} variant='contained' fullWidth  size="small">Access</Button>
      </CardActions>
    </Card>



   
    
          
        </span>
      </div>
      </div>
    
  )
}

export default Select