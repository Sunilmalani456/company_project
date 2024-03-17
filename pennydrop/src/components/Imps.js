import { Alert, AppBar, Box, Button, Card, CircularProgress, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import eezibLogo from "../images/eezib2.png";
import upiLogo from "../images/imps.png"
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import * as XLSX from 'xlsx';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { saveAs } from 'file-saver';




const Imps = () => {

    const[name , setName] = React.useState("");
    const [token , setToken] = React.useState('');
    const [mobile , setMobile] = React.useState('');
    const[account , setAccount] = React.useState("");
    const [ifsc , setIfsc] = React.useState("");
    const [ammount , setAmmount] = React.useState("");
    const [transition, setTransition] = React.useState(undefined);
    const [accountType , setAccountType] = React.useState("");
    const [remark , setRemark] = React.useState("");
    const [loading , setLoading] = React.useState(false);
    const [error , setError] = React.useState();
    const [respData , setRespData] = React.useState("")

    const handleChange = (event) => {
      setAccountType(event.target.value);
      console.log("account type: ",event.target.value)
    };

    React.useEffect(() => {
      const data1 = location.state.token;
      setToken(data1);

      const number = location.state.number;
      setMobile(number)

        console.log("data : ",data1 + "  number : ",number)
    },[])

    const [state, setState] = React.useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;


    const navigate = useNavigate();
    const location = useLocation();

    
    async function getData(){
      
      setLoading(true);
      const mode = "IMPS";
      // try{
        

        const userId = 107


        // const fetchData = await fetch("http://sapna.local/eezib_prod/public/api/dmt_order", {
        //     method:"POST",
        //     headers:{
        //       "Content-Type":"application/json",
        //       "Authorization":`bearer ${token}` 
        //     },
        //     body:JSON.stringify({ "user_id":userId, "mobile_no":mobile , "name":name, "account_number":account, "account_type":accountType ,"ifsc_code":ifsc ,"amount":ammount, "remark":remark })
        //   });

        const fetchData = await fetch("http://sapna.local/eezib_prod/public/api/dmt_order" , {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`bearer ${token}`
        },
        body:JSON.stringify({ "user_id":userId, "mobile_no":mobile , "name":name, "account_number":account, "account_type":accountType ,"ifsc_code":ifsc ,"amount":1, "remark":remark })
      });

          console.log({ "token":token, "user_id":userId, "mobile_no":mobile , "name":name, "account_number":account, "account_type":accountType ,"ifsc_code":ifsc ,"amount":1, "remark":remark })

          const apiData = await fetchData.json();
          setLoading(false);
          console.log("Api data is : ",apiData);
          setRespData(apiData.msg);
          
      // }catch(error){
      //   console.log(error)
      //   // navigate("/")
      // }


    if(name == ""){
     
      window.alert("please enter name");

    }else if(account == "" ){
      window.alert("please add valid account number");

    }else if(ifsc == ""){
      window.alert("please enter IFSC code");
    }
    else{
      // setState({ open: true, ...newState });
      // const data  =await fetchData.json();
      // console.log(data);
      // console.log({name , account , ifsc , ammount , accountType , remark})
    }

    setName("");
    setIfsc("");
    setAmmount("");
    setAccount("");
    setAccountType("");
    setRemark("");
    // setAccountType("");


  }

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if(ammount >=2){
    setAmmount("");
    window.alert("Limit crossed");
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        let isValid = true;
        // Validate the headers
        const expectedHeaders = ['name', 'account_number', 'account_type', 'isfc_code', 'amount', 'remark'];
        const headers = rows[0];
        const headersValid = expectedHeaders.every((header) => headers.includes(header));

        if (!headersValid) {
          alert('Invalid headers in the Excel file. Expected headers: name, account_number, account_type, isfc_code, amount, remark');
          window.location.reload();
          isValid = false;
          return;
        }

        // Check for empty values for each header
        expectedHeaders.forEach((header) => {
          const headerIndex = headers.indexOf(header);
          if (headerIndex === -1) {
            alert(`Header "${header}" is missing in the Excel file.`);
            window.location.reload();
            isValid = false;
          } else {
            const hasEmptyValues = rows.slice(1).some((row, rowIndex) => {
              const cellValue = row[headerIndex];
              if (cellValue === undefined || cellValue === '') {
                alert(`Empty value in header "${header}" for row ${rowIndex + 2}.`);
                window.location.reload();
                isValid = false;
                return true;
              }
              return false;
            });
          }
        });

        const noData = rows.slice(1).every((row) => row.every((cell) => cell === 'undefined' || cell === ''));
        if(noData){
          alert("no user data found in excel file.");
          window.location.reload();
          isValid = false;
        }

        if(isValid){
          
          const jsonData = rows.slice(1).map((row) => {
            const obj = {};
            expectedHeaders.forEach((header, headerIndex) => {
              obj[header] = row[headerIndex];
            });
            return obj;
          });

          console.log("json data is : ",jsonData);

          window.alert("excel file uploaded.");
          window.location.reload()
          
          console.log('Excel file is valid');
        }
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  const downloadExcel = () => {
    const data = [
        ['name' ,'account_number', 'account_type' , 'isfc_code', 'amount', 'remark'],
      
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    saveAs(blob, 'sample.xlsx');
  }


  return (
    <div className='back' >
        <Box  >
          <AppBar position='static' color='transparent' sx={{ display:"flex", flexDirection:{xs:"row", sm:"row" } , alignItems:"center" , justifyContent:{xs:"center", sm:"space-between"} }} >
        <Box component="img"  sx={{ width:{md:"10rem" , sm:"10rem" , xs:"7rem"} , padding:'10px' , marginLeft:{xs:"0rem" , bg:"2rem"} }} src={eezibLogo} alt="logo" onClick={ () => navigate("/")} />
        <Box component="img" src={upiLogo} alt="upi" sx={{ width:"12rem",float:"right",marginTop:{xs:"0.5rem" , md:"1rem"}}}  />
          </AppBar>
        </Box>
            
              
      <div className='formControl' >

        <Card elevation={24}  className='form' sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          flexDirection:"column",
          margin:"3rem",
          backdropFilter:'blur(2px)',
          backgroundColor:'white',
          padding:{xs:"2rem 2.5rem " , md:"2rem 4rem"},
          borderRadius:"1rem",
          marginTop:{md:"6rem" , sm:"6rem",xs:"4rem" , },
          boxShadow:"0px 0px 5px 3px white"
      }} >
        {
          loading ? <CircularProgress disableShrink  /> :

          <Grid style={{ display:'flex' , alignItems:"center" , justifyContent:'center' , flexDirection:"column"}} >  
          <Typography className="paymentMode" sx={{ color:"#0067ab" , fontFamily:"montserrat" , fontWeight:"600",fontSize:{sm:"1.5rem" , md:"2.1rem"} }} >Eezib Payment Transfer</Typography> &nbsp;

          <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }} >

          <OutlinedInput variant='outlined' onChange={((e) => setName(e.target.value))} value={name}  color="primary" placeholder='enter name'  sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem', fontFamily:"montserrat", margin:"0.5rem" , fontWeight:"500" }}  />

            
          {/* <OutlinedInput type='number' onChange={((e) => setAccount(e.target.value))} value={account} color="primary" placeholder='enter account number' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  /> */}
          
            <OutlinedInput type='number' onChange={(e) => setAccount(Number(e.target.value.substring(0,16)))}    value={account} color="primary" placeholder='enter account number' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' , fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />
          
          </Box >

          <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }}  >
          <FormControl id="hover"  >
              <InputLabel sx={{fontFamily:"montserrat" }} >account type</InputLabel>

                <Select
                  value={accountType}
                  label="account Type"
                  onChange={handleChange}
                  color='primary'
                  placeholder='account type'
                  sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem', fontFamily:"montserrat", margin:"0.5rem" , fontWeight:"500" }}
                >
                  <MenuItem  value="saving" >Saving</MenuItem>
                  <MenuItem value="current" >Current</MenuItem>
                  <MenuItem value="over draft" >Over Draft</MenuItem>

                </Select>

          </FormControl>
        
          <OutlinedInput onChange={((e) => setIfsc(e.target.value))} value={ifsc}  id="hover" color="primary" placeholder='enter IFSC code' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

          </Box>


          
        <Box sx={{ display:"flex" , alignItems:"center" , flexDirection:{md:"row",sm:'column',xs:"column"} }}  >
          <OutlinedInput type="number" onChange={((e) => setAmmount(e.target.value)  )} inputProps={{min:0}} value="1"  id="hover" color="primary" placeholder='enter amount' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" }}  />

          <OutlinedInput  color="primary" onChange={((e) => setRemark(e.target.value))} value={remark}  placeholder='enter remark' sx={{ width:{xs:"15rem", md:"20rem" }, fontSize:'1rem' ,fontWeight:"500" , margin:"0.5rem",fontFamily:"montserrat" , color:'black'}}  />

        </Box>

    

       

          </Grid>


        }
        
        
        
        
        
          

            {/* <Button onClick={() => getData(TransitionLeft)} color="secondary" id="hover"  variant='contained' sx={{ backgroundColor:"#8A28DB" , width:'18rem', marginTop:'1rem' }} >submit</Button> */}

              {
                name && account && ifsc && remark !== "" ? <Button onClick={() => getData({vertical: 'top',horizontal: 'right'})}  id="hover"  variant='contained' sx={{width:'18rem', marginTop:'1rem' }} >submit</Button> : <Button  sx={{width:'18rem', marginTop:'1rem' }} variant='contained' disabled >submit</Button>
              }


            

          

                &nbsp;
                <Box sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , gap:'1rem'}} >

                <Button
                variant="outlined"
                component="label"
                sx={{fontFamily:'montserrat' , width:150 , height:35 , fontSize:10}}
                >
                    <UploadFileRoundedIcon/> &nbsp;
                    Upload excel
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        hidden
                        onChange={handleFileChange}
                    />
                 </Button>

                  <Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'center', flexDirection:'column' }} >
                    <DownloadingIcon onClick={ downloadExcel} sx={{ color:'#1976d2' }}  />
                    <Typography sx={{fontSize:10 , fontFamily:'montserrat', fontWeight:500 , color:'#808080'}} >sample</Typography>
                  </Box>

                </Box>



        </Card>
            </div>
            {
              respData !== "unauthorized Token" ?
              <Snackbar open={open} autoHideDuration={2500} key={vertical + horizontal}  onClose={handleClose}  TransitionComponent={transition} anchorOrigin={{ vertical, horizontal }} >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' , backgroundColor:'#5cbd51' , fontWeight:600  , color:'white' }}>
              Data sent successfully !
            </Alert>
          </Snackbar>  :

          <Snackbar open={open} autoHideDuration={2500} key={vertical + horizontal}  onClose={handleClose}  TransitionComponent={transition} anchorOrigin={{ vertical, horizontal }} >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' , backgroundColor:'#e02424' , fontWeight:600  , color:'white' }}>
            credentials mismatch !
          </Alert>
          </Snackbar>              

            }
            
        </div>

        
  )
}

export default Imps