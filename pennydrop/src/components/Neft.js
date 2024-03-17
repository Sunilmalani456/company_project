import { Alert, Box, Button, OutlinedInput, Snackbar, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import eezibLogo from "../images/eezib.png";
import neftLogo from "../images/neft.webp"
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'



const Neft = () => {
    const[name , setName] = React.useState("");
  const[account , setAccount] = React.useState("");
  const [ifsc , setIfsc] = React.useState("");
  const [ammount , setAmmount] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const location =  useLocation();

  async function getData(newState){

    var variable = location.state.data;
    console.log(variable);

    const mode = "NEFT"

    const fetchData = await fetch("http://192.168.0.147/payuser/", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${variable}`
      },
      body:JSON.stringify({name ,account ,ifsc ,ammount , mode })
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
      const data  =await fetchData.json();
      console.log(data);
      setState({ open: true, ...newState });
    }

    setName("");
    setIfsc("");
    setAmmount("");
    setAccount("");

  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  console.log(ammount)
if(ammount >= 500001){
  window.alert("at the point");
  setAmmount("")
}

React.useEffect(() => {
  Aos.init({duration:2000})
},[])

const navigate = useNavigate();

  return (
    <div  className="upi1" >
        
        <Box component="img" id="logo1" src={eezibLogo} alt="logo" sx={{ maxWidth:{xs:"8rem", sm:"10rem"} }} onClick={ () => navigate("/DMT")} />
        <Box component="img" src={neftLogo} alt="upi" sx={{ width:"12rem",float:"right", padding:"0rem",marginTop: "1rem",marginRight:'2rem'}}  />
        <div className='back1' >
            <div className='back3' >
            <div className='formControl' >

        <div data-aos="fade-up" className='form1' >
            <Typography sx={{ color:"rgb(7, 87, 28)" , fontFamily:"montserrat" , fontWeight:"700",fontSize:'2rem' , marginTop:"-1rem"}} >Penny Drop</Typography> &nbsp;
            <OutlinedInput  onChange={((e) => setName(e.target.value))} value={name} id="hover1" color="success" placeholder='Enter Name'  sx={{ width:'20rem', fontSize:'1rem', fontFamily:"montserrat" , fontWeight:"500" }}  />

            <OutlinedInput onChange={((e) => setAccount(e.target.value))} type="number" value={account} id="hover1" color="success" placeholder='Enter Account Number' sx={{ width:'20rem', fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

            <OutlinedInput onChange={((e) => setIfsc(e.target.value))} value={ifsc}  id="hover1" color="success" placeholder='Enter IFSC Code' sx={{ width:'20rem', fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

            <OutlinedInput onChange={((e) => setAmmount(e.target.value))} max="10" type="number"  value={ammount} id="hover1" color="success" placeholder='Enter Amount' sx={{ width:'20rem', fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

            
            {
                name && account && ifsc && ammount !== "" ? <Button onClick={() => getData({vertical: 'top',horizontal: 'right',})} color="success" id="hover"  variant='contained' sx={{ width:'18rem', marginTop:'1rem' }} >submit</Button> : <Button disabled fullWidth >submit</Button>
              }


            <Snackbar open={open} autoHideDuration={3000} key={vertical + horizontal}  onClose={handleClose}  TransitionComponent={transition} anchorOrigin={{ vertical, horizontal }} >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' , backgroundColor:'#5cbd51' , fontWeight:600  , color:'white' }}>
              Data sent successfully
            </Alert>
          </Snackbar>
            
            &nbsp;
                <span style={{display:'flex' , alignItems:'center' , justifyContent:"space-evenly"}} >
                <HomeIcon sx={{color:"gren"}} />
                <Link id="link" to="/" style={{color:"green"}} >Back to home</Link>
                </span>
        </div>
            </div>
        </div>

        </div>
        
    </div>
  )
}

export default Neft