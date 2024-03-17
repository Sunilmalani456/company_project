import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import eezib2 from "../images/eezib2.png";
import { motion } from 'framer-motion';



const Titled = () => {
  return (
    <Box sx={{display:"flex" , alignItems:"center" , justifyContent:'center', marginTop:"0rem" , backgroundColor:"#2596be" ,minHeight:"10vh"  , padding:"10px" }}  >
      <motion.div initial={{opacity:0 , translateX:-0}}  animate={{opacity:1 , translateX:0 }} exit={{opacity:0}} transition={{duration:0.3}} >      
      <Grid style={{ display:'flex' , alignItems:"center" , justifyContent:"center" }} >
      <img src={eezib2} alt="logo" style={{ width:"10rem" , marginBottom:"3px"  }} />
      <Typography sx={{  fontFamily:"Metamorphous" , fontWeight:'bolder' , fontSize:{lg:"2.5rem" , md:"2rem" , xs:"1rem"}  }} >  PAYMENT TRANSFER..</Typography>
      </Grid>
      </motion.div>
    </Box>
  )
}

export default Titled