
import React from 'react';
import { AppBar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, Paper, Select, Slide, Toolbar, Typography } from '@mui/material';
import { useLocation , useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import Aos from 'aos';
import { set } from 'date-fns';

const Transitions = () => {

  const [resp , setResp] = React.useState([]);
  const [secureToken , setSecureToken] = React.useState("");
  const [dialog , setDialog] = React.useState(false);
  const [dialogData , setDialogData] = React.useState([]);
  const [progress , setProgress] = React.useState(false);
  const [page , setPage] = React.useState(1)



  const navigate = useNavigate();
  const location = useLocation();

  const api  = process.env.REACT_APP_AXIOS_URL;


  async function getData(){
    try{

      
  const data =  location.state.id;
  const values =Object.values(data);
  const medium = values[0];
  const date = values[1];
  const type = values[2];
  const report = values[3];
  const token = values[4];
  setSecureToken(token);

  // ************************************* Api for getting users data *******************************

      const apiData = await fetch(`http://192.168.0.154/checkbal/` , {
        method:'post',
        headers:{
          "Content-Type":"application/json",
          "authorization":`Bearer ${token} `
        },
        body:JSON.stringify(data)
      })
  
      const resp = await apiData.json();
      const value = Object.values(resp)
      setResp(value[0]);
      
      console.log("resp is : ",value);
    }catch(error){
      alert('unknown error has been occured');
      navigate("/")
    }
  }

  

  React.useEffect(() => {
    getData();
  },[])

 async function handleDialog(object){

  setDialog(true)
  setProgress(true)

  try{

    const viewData = await fetch("http://192.168.0.154/checkpend/" , {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
          'Authorization':` Bearer ${secureToken} `
      },
      body:JSON.stringify({object})
    });
    const data = await viewData.json();
    const key = Object.values(data)
    setDialogData(key);
    console.log("key is ",key)
    setProgress(false)

  
}catch(err){
  alert('unknown error has been occured');
  navigate("/")
}
    
  }

   

const handleClose = () => {
  setDialog(false);
};


  
  return (
    <Box  className='sss' sx={{height:"100vh" , cursor:"pointer"}} >
      <Box sx={{margin:"0rem 1.5rem"}} >

        <AppBar color="transparent" sx={{backgroundColor:'#1d66db'}} position="static" >
            <Toolbar  sx={{ display:'flex' , alignItems:'center' , justifyContent:"space-between" }} >
                    <Typography sx={{fontFamily:'montserrat' , fontSize:"1.2rem" , color:'white' }} >Welcome To Eezib Transactions </Typography> 
                    {/* <Button  sx={{fontFamily:'Castoro' , fontSize:"1.2rem" , float:'right' }}>  {mode} </Button> */}

                  
            </Toolbar>
        </AppBar>

    <TableContainer sx={{marginTop:"1rem" , backgroundColor:'transparent' , backdropFilter:"blur(2px)"}} elevation={24} component={Paper}   >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow  >
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Name</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Payment type</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Account no.</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Created at</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >IFSC</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Transaction status</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Amount</TableCell>
            <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:600}} >Enquiry</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          { Array.isArray(resp) && resp?.slice((page - 1)*10 , (page-1)*10+10 )?.map((row,index) => (
            <TableRow
            className="tableRow"
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },fontFamily:'montserrat' }}
            >
              <TableCell component="th" scope="row" align="center" sx={{fontFamily:'montserrat' , fontWeight:500}}  >
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.payment_type}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.accountno}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.created_at}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.ifsc}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.transactionstatus}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >{row.amount}</TableCell>
              <TableCell align="center" sx={{fontFamily:'montserrat' , fontWeight:500}} >
                  {
                    row.transactionstatus === "Pending" ?
                    <Button size="small"  variant='contained' sx={{fontFamily:'montserrat',fontWeight:500 , width:"7rem"}} onClick={()=> handleDialog(row) } value={row} >Enquiry</Button> : 
                    <Button sx={{fontFamily:'montserrat'}} size="small" variant='contained' color="primary"  >view detail</Button>
                  }
              </TableCell>
              


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog
        open={dialog}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        

        <DialogTitle align='center' sx={{ fontFamily:'montserrat' }} >{"Transition Enquiry"}</DialogTitle>
        

       
       
        
        {  progress ? <CircularProgress sx={{ marginLeft:"40%" }} /> :  dialogData?.map((e,index) => {
          
          return (
            
            
          <Box key={index} sx={{display:'flex' , flexDirection:'column'}} >
            
            
          
            
            
            <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'center' }} >
            <Typography  sx={{fontFamily:'montserrat', fontWeight:500, marginLeft:"0.5rem", textAlign:'left'}} >Transition ID :&nbsp; </Typography>
            <Typography  sx={{fontFamily:'montserrat', fontWeight:500, marginRight:"0.5rem"}} >{e.txnid}</Typography>
            </Box>
            
                  <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'left' }}>
                    <Typography align="left" sx={{fontFamily:'montserrat', fontWeight:500, marginLeft:"0.5rem" , textAlign:'left'}} >Transition mode :&nbsp; </Typography>
                    <Typography  sx={{fontFamily:'montserrat', fontWeight:500, marginRight:"0.5rem"}} >{e.reqdtls.reqtype}</Typography>
                  </Box>

                  <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'left' }}>
                    <Typography align="left" sx={{fontFamily:'montserrat', fontWeight:500, marginLeft:"0.5rem"}} >Refrence no :&nbsp; </Typography>
                    <Typography  sx={{fontFamily:'montserrat', fontWeight:500, marginRight:"0.5rem"}} >{e.reqdtls.usrtxnrefno}</Typography>
                  </Box>
             
            
          </Box>
          )
        })}

          <DialogActions>
            <Button size='small' onClick={() => handleClose()} variant='contained' sx={{width:'5rem', height:"1.8rem", fontFamily:'montserrat'}} >close</Button>
          </DialogActions>
        
      </Dialog>
    </Box>
                  
                 
        <Pagination 
          style={{
            padding:50,
            width:"100%",
            display:'flex',
            alignContent:'center',
            justifyContent:'center'
          }}
          variant='outlined'
          color='primary'
          count={(resp?.length/10).toFixed(0)}
          onChange={(_,value) =>{
            setPage(value);
          }}
        />
    

   

     </Box>
)
}

export default Transitions

// {
//   Array.isArray && resp.map((prop,index) => (
//    <Box  key={index}  className="zzz" >

     
//    </Box>

//    ))
// }