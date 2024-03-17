import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import upiLogo from "../images/4137379.jpg";
import neftLogo from "../images/2879845.jpg";
import impsLogo from "../images/2903544.jpg";
import eeezibLogo from "../images/eezib2.png";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import "aos/dist/aos.css"; 

const Rcards = () => {

  React.useEffect(() => { AOS.init({duration:1000});return()=> { AOS.refresh(); } },[])
     
    

  const location = useLocation();
  const navigate = useNavigate();

  const [name , setName] = React.useState("");
  const [token , setToken] = React.useState("")


   async function getData(){
    //   const headersData = location.state;
    //  const token = Object.values(headersData);
    //  const secureTKN = token[0];
    //  setTokenObj(secureTKN);
    //  const name = token[1];
    //  console.log("token obj : ",tokenObj)
    //   if(secureTKN == ""){
    //     navigate("/DMT");
    //   }

    //   const fetchData = await fetch("http://192.168.0.153/DMT/check/",{
    //     headers:{
    //       "Authorization":`Bearer ${secureTKN}`
    //     }
    //   });

    //   const data = await fetchData.json();
    //   console.log("api data is : ",data )

   
// try{
  
//         const headersData =await location.state;
      
//         const datas = Object.values(headersData);
//         const token = datas[0];
//         setToken(token);
//         const userName = datas[1];
//         setName(userName)

  
//         console.log("token data is : ",token);

// }catch(error){
//   console.log("error is ",error);
//   navigate("/")
// }


 
   }
   React.useEffect(() => {
    getData();
   },[]);
 
        

  return (

  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}} style={{backgroundColor:"#5eaff7" , display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} >

      <Box onClick={()=> navigate("/")} component="img" src={eeezibLogo} sx={{ width:"10rem" , marginRight:"auto" }} />

      <Box elevation={12} sx={{marginLeft:"auto"  ,marginTop:"-1rem" , backgroundColor:"white" , borderRadius:"3rem 0rem 0rem 3rem" , padding:"0.6rem 2rem", fontWeight:500 , textAlign:'center',fontSize:"1.2rem" }} >Welcome <br/>  <span style={{color:'red', fontWeight:600}} >{name}</span></Box>

    
      
    <Box className='simple' sx={{ fontSize:{md:"3.5rem",xs:"1.7rem"},display:"flex" ,alignItems:'center',justifyContent:'center',flexDirection:{md:"row",sm:"row",xs:"column"} }} >Select&nbsp;<Box  className='stokeText' sx={{fontSize:{md:"3.5rem",xs:"1.7rem"}}} >eezib payment transfer</Box>&nbsp;mode.</Box>

    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display:'flex' , minHeight:"75vh", alignItems:'center' , justifyContent:'space-evenly' , flexDirection:{xl:'column'}, cursor:'pointer' , marginTop:{md:"0",xs:"2.5rem"}}}>




<Card sx={{ maxWidth: 270 , margin:"1rem", boxShadow:'0px 0px 10px 1px white' }}>
  <CardMedia
    sx={{ height: 180 }}
    image={upiLogo}
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div" align='center' >
      UPI
    </Typography>
    <Typography variant="body2" color="text.secondary"  sx={{fontFamily:'montserrat',fontWeight:500}} >
    IMPS provides robust & real time fund transfer which offers an instant, 24X7
    </Typography>
  </CardContent>
  <CardActions>
    <Button variant='contained' fullWidth  size="small">Comming soon</Button>
  </CardActions>
</Card>


    <Card sx={{ maxWidth: 270 , boxShadow:'0px 0px 10px 1px white' }}>
  <CardMedia
    sx={{ height: 180 }}
    image={impsLogo}
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div" align='center' sx={{fontFamily:'montserrat', fontWeight:500}} >
      IMPS
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{fontFamily:'montserrat',fontWeight:500}} >
    Its a Single mobile application for accessing different bank accounts over a single Network
    </Typography>
  </CardContent>
  <CardActions>
    <Button variant='contained' fullWidth  size="small"   >Access</Button>
  </CardActions>
</Card>


    <Card sx={{ maxWidth: 270 ,  margin:"1rem", boxShadow:'0px 0px 10px 1px white' }}>
  <CardMedia
    sx={{ height: 180 }}
    image={neftLogo}
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div" align='center' >
      NEFT
    </Typography>
    <Typography variant="body2" color="text.secondary"  sx={{fontFamily:'montserrat',fontWeight:500}} >
    NEFT is an electronic funds transfer system set up and managed by RBI. 
    </Typography>
  </CardContent>
  <CardActions>
    <Button  variant='contained' fullWidth  size="small">comming soon.</Button>
  </CardActions>
</Card>




    </Grid>
    </ motion.div>

  )
}

export default Rcards