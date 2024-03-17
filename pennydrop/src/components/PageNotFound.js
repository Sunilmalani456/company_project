import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import logo from "../images/eezib2.png";
import { redirect, useNavigate } from 'react-router-dom';

const PageNotFound = () => {

  const [second , setSecond] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecond(second => second +1);
    }, 2000);
    return () => window.history.pushState(window.location.previousPage)
  },[])

  const navigate = useNavigate();

  return (
    <Box className="notFound" >
      <Box component="img" src={logo} onClick={() => navigate("/") } sx={{ width:"9rem", float:'left' }} />
        <Box component='img' src="https://pngimg.com/d/moon_PNG42.png" sx={{marginLeft:"auto" , width:"15rem" , marginTop:'-3rem'}} />

      <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , flexDirection:'column', marginTop:"-2rem"}} >
        <Typography className='pagenot' sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , color:'white' , fontFamily:'montserrat' , fontWeight:800,fontSize:"8rem"  }}> 4 <Box sx={{ width:"10rem", color:'white' }} component="img" src="./skl2.png" /> 4  </Typography>
        <Typography className='pagenot' sx={{fontFamily:'montserrat' , fontSize:"3rem",fontWeight:800 , color:'white' , textShadow:'2px 2px black' }} >Page Not Found !!</Typography>


      </Box>
      <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'center' , gap:"4rem" , marginTop:"4rem" }} >
        <Button variant='contained' className="pagenobtn"  onClick={() => navigate("/")} sx={{backgroundColor:'#252525' , fontFamily:'montserrat' , width:"12rem" , '&:hover':{ backgroundColor:'black' }}}>Go to Home</Button>
        <Button variant='contained' className="pagenobtn" onClick={() => window.location.replace("https://eezib.in/contactus")} sx={{backgroundColor:'#252525', fontFamily:'montserrat' ,  width:"12rem" , '&:hover':{ backgroundColor:'black'}}}>Know more..</Button>
      </Box>

      {/* <Typography sx={{fontFamily:"Rubik Wet Paint" , fontSize:"6rem", marginTop:'5rem' , color:'white'} } > 404 not found  </Typography> */}
    </Box >
  )
}

export default PageNotFound