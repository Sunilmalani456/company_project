import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Snackbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import eezibLogo from "../images/eezib.png";
import upiLogo from "../images/upi.jpg"
import Aos from 'aos';




const Upi = () => {

    const[name , setName] = React.useState("");
    const[account , setAccount] = React.useState("");
    const [ifsc , setIfsc] = React.useState("");
    const [ammount , setAmmount] = React.useState("");
    const [transition, setTransition] = React.useState(undefined);
    const [accountType , setAccountType] = React.useState("");
    const [remark , setRemark] = React.useState("");

    const handleChange = (event) => {
      setAccountType(event.target.value);
    };

    const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;


    const navigate = useNavigate();
    const location = useLocation();
    
    async function getData(newState){
      
      const data = location.state.data;
      console.log(data)
  
    const mode = "upi";

    const fetchData = await fetch("http://192.168.0.153/payuser/", {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${data}` 
      },
      body:JSON.stringify({name ,account ,ifsc ,ammount, accountType , mode , remark })
    });

    if(name == ""){
     
      window.alert("please enter name");

    }else if(account == "" ){
      window.alert("please add valid account number");

    }else if(ifsc == ""){
      window.alert("please enter IFSC code");

    }else if(ammount == ""){
      window.alert("please enter amount");
    }
    else{
      setState({ open: true, ...newState });
      const data  =await fetchData.json();
      console.log(data);
    }

    setName("");
    setIfsc("");
    setAmmount("");
    setAccount("");
    // setAccountType("");


  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if(ammount >= 500001){
    window.alert("Limit crossed");
    setAmmount("")
  }

  React.useEffect(() => {
      Aos.init({duration:2500})
  },[])

  return (
    <div data-aos="fade-up" className="upi" >
        <Box sx={{ display:"flex", flexDirection:{xs:"column", sm:"row" } , alignItems:"center" , justifyContent:{xs:"center", sm:"space-between"} }} >
        <Box component="img"  sx={{ width:"8rem", padding:'10px' , marginLeft:{xs:"0rem" , bg:"2rem"} }} src={eezibLogo} alt="logo" onClick={ () => navigate("/")} />
        <Box component="img" src={upiLogo} alt="upi" sx={{ width:"12rem",float:"right",marginTop:{xs:"0.5rem" , md:"1rem"}}}  />
        </Box>

        <div className='back' >
            <div className='back2' >
            <div className='formControl' >

        <Paper elevation={24} className='form' sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          flexDirection:"column",
          margin:"3rem",
            backdropFilter:'blur(2px)',
          backgroundColor:'transparent',
          padding:{xs:"0.6rem 1.5rem " , md:"2rem 4rem"},
          borderRadius:"1rem",
          marginTop:{md:"2rem" , sm:"0rem",xs:"-2rem"}
      }} >
          <Grid style={{ display:'flex' , alignItems:"center" , justifyContent:'center' , flexDirection:"column" }} >  
            <Typography sx={{ color:"purple" , fontFamily:"montserrat" , fontWeight:"700",fontSize:{sm:"1.5rem" , md:"2rem"} }} >Eezib Payment Transfer</Typography> &nbsp;

            <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }} >

            <OutlinedInput onChange={((e) => setName(e.target.value))} value={name} id="hover" color="secondary" placeholder='enter name'  sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem', fontFamily:"montserrat", margin:"0.5rem" , fontWeight:"500" }}  />

            <OutlinedInput type='number' onChange={((e) => setAccount(e.target.value))} value={account} id="hover" color="secondary" placeholder='enter account number' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />
            </Box >

            <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }}  >
            <FormControl id="hover"  >
                <InputLabel sx={{fontFamily:"montserrat" }} >account type</InputLabel>

                  <Select
                    value={accountType}
                    label="account Type"
                    onChange={handleChange}
                    color='secondary'
                    placeholder='account type'
                    sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem', fontFamily:"montserrat", margin:"0.5rem" , fontWeight:"500" }}
                  >
                    <MenuItem  value="saving" >Saving</MenuItem>
                    <MenuItem value="current" >Current</MenuItem>
                    <MenuItem value="over draft" >Over Draft</MenuItem>

                  </Select>

            </FormControl>
          
            <OutlinedInput onChange={((e) => setIfsc(e.target.value))} value={ifsc}  id="hover" color="secondary" placeholder='enter IFSC code' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

            </Box>


            
          <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }}  >
            <OutlinedInput type="number" onChange={((e) => setAmmount(e.target.value)  )} inputProps={{min:0}}  value={ammount} id="hover" color="secondary" placeholder='enter amount' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

            <OutlinedInput  color="secondary" onChange={(e) => setRemark(e.target.value)} value={remark}  placeholder='enter remark' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

          </Box>

            </Grid>

            {/* <Button onClick={() => getData(TransitionLeft)} color="secondary" id="hover"  variant='contained' sx={{ backgroundColor:"#8A28DB" , width:'18rem', marginTop:'1rem' }} >submit</Button> */}

              {
                name && account && ifsc && ammount !== "" ? <Button onClick={() => getData({vertical: 'top',horizontal: 'right'})} color="secondary" id="hover"  variant='contained' sx={{ backgroundColor:"#8A28DB" , width:'18rem', marginTop:'1rem' }} >submit</Button> : <Button disabled >submit</Button>
              }


            <Snackbar open={open} autoHideDuration={2500} key={vertical + horizontal}  onClose={handleClose}  TransitionComponent={transition} anchorOrigin={{ vertical, horizontal }} >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' , backgroundColor:'#5cbd51' , fontWeight:600  , color:'white' }}>
              Data sent successfully !
            </Alert>
          </Snackbar>

          

                &nbsp;
              <span style={{display:'flex' , alignItems:'center' , justifyContent:"space-evenly"}} >
                <HomeIcon sx={{color:"purple"}} />
                <Link id="link" to="/" style={{color:"purple"}} >Back to home</Link>
              </span>

        </Paper>
            </div>
        </div>

        </div>
        
    </div>
  )
}

export default Upi