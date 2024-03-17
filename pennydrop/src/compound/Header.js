import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import eezib2 from "../images/eezib2.png";
import StartIcon from "@mui/icons-material/Start";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Aos from "aos";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auth, setAuth] = React.useState("");
  const [contact, setContact] = React.useState("");

  const navigate = useNavigate();

  async function getData() {
    try {
      const windowUrl = window.location.search;
      const value = windowUrl.replace("?eezib=", "");
      console.log(value);

      // const api  = process.env.REACT_APP_AXIOS_URL;
      // console.log("api : ",api)
      // const mode = process.env.NODE_ENV;
      // console.log("Mode : ",mode)

      // const env = process.env.NODE_ENV;

      // ********** First Authentication api to be fetched ************

      // const data1 = await fetch(`http://192.168.0.153:80/rauth?auth=${value}`);
      // let respo1 = await data1.json();
      // console.log({ respo1 });

      const data = await fetch(
        "http://sapna.local/eezib_prod/public/api/corporate_detail",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${value}`,
          },
          body: JSON.stringify({}),
        }
      );
      let respo = await data.json();
      console.log({ respo });

      const token = respo.access_token;
      setAuth(token);

      const mobile = respo.mobile_no;
      setContact(mobile);

      if (token && mobile) {
        navigate("/cards", { state: { secureToken: token, contact: mobile } });
      }

      // token && mobile ? navigate('/cards' , {state : { "secureToken":token,"userName":mobile }}) : null

      // const dataed = Object.keys(respo);
      // let dated0 = dataed[0];
      // let dated1 = dataed[1];
      // let dated2 = dataed[2];

      // let token = Object.values(respo)

      // let secureToken = token[2];
      // let userName = token[1];
      // console.log(userName)

      // console.log("user name : ",userName );
      // console.log("token : ",secureToken)

      // if(dated0 == "detail"){
      //   navigate("/");
      // }else if(dated2 == "token"){
      //   navigate("/cards",{state:{secureToken,userName}});

      // }
    } catch (e) {
      window.alert("technical error");
      navigate(-1);
    }
  }

  React.useEffect(() => {
    getData();
    window.history.pushState(" ", window.location.pathname);
  }, []);

  React.useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);

  return (
    <Box
      sx={{
        marginTop: { md: 0, sm: 0, xs: 0 },
        width: "100%",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "left" },
      }}
    >
      <div className="paymentBack">
        <img
          style={{ width: "11rem", margin: "1rem", cursor: "pointer" }}
          src={eezib2}
          alt="logo"
        />
        <div className="payment">
          <Typography
            align="center"
            sx={{
              fontFamily: "montserrat",
              fontSize: { md: "5rem", xs: "3rem" },
              fontWeight: 800,
              color: "white",
              marginTop: "2rem",
            }}
          >
            The Best <span style={{ color: "#2596be" }}>Payment</span> Solution
          </Typography>

          <span>
            {/* <span style={{display:'flex', alignItems:'center', justifyContent:"center", flexDirection:'column'}} >
            <Typography sx={{fontFamily:"montserrat",fontSize:"2rem",textTransform:"capitalize",color:'white',fontWeight:600 ,marginTop:"0.5rem" }} > <span style={{color:'#2596be'}}>Your</span>  flexibility </Typography>
            <Typography sx={{fontFamily:"montserrat",fontSize:"2rem",textTransform:"capitalize",color:'white',fontWeight:600 ,marginTop:"0.5rem" }}>our <span style={{color:'#2596be'}}>excellence</span> </Typography>
          </span> */}
            <Typography
              data-aos="fade-left"
              align="center"
              sx={{
                color: "white",
                color: "#B0B0B0",
                fontSize: { md: "1.5rem", xs: "1.3rem" },
                fontFamily: "montserrat",
                marginTop: { md: "1.5rem", xs: "3rem" },
              }}
            >
              {" "}
              A further step for our happy cosumers to make payment more easy
              ,efficient and secure ..{" "}
            </Typography>
          </span>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: { md: "6rem", sm: "4rem", xs: "3.5rem" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontFamily: "montserrat",
                fontSize: { xs: "1rem", md: "2rem" },
              }}
            >
              {" "}
              Time To Switch{" "}
            </Typography>
            <ToggleOnIcon
              sx={{ color: "#2596be", fontSize: { md: "3rem", xs: "2rem" } }}
            />
            <Typography
              sx={{
                color: "white",
                fontFamily: "montserrat",
                fontSize: { xs: "1rem", md: "2rem" },
              }}
            >
              Eezib Payment Transfer
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/cards")}
            sx={{
              fontFamily: "montserrat",
              fontSize: { md: "1.3rem", xs: "0.9rem" },
              textTransform: "capitalize",
              fontWeight: 500,
              padding: { md: "0.3rem 1.5rem 0.3rem 3rem", xs: "" },
              margin: { md: "4% 1%", xs: "10% 1%" },
            }}
          >
            {" "}
            Access Eezib Payment Transfer &nbsp; <StartIcon />
          </Button>
          {/* <Button variant='contained' onClick={()=> window.location.replace("https://uat.eezib.in/login") } sx={{fontFamily:'montserrat',fontSize:{md:"1.3rem",xs:"0.9rem"}, textTransform:"capitalize", fontWeight:500 , padding:{md:"0.3rem 1.5rem 0.3rem 3rem",xs:""} ,margin:{md:"4% 1%",xs:"10% 1%"} }} > Access Eezib Payment Transfer &nbsp; <StartIcon/></Button> */}
        </div>
      </div>
    </Box>
  );
};

export default Header;

//  1951|JEJE2o4mU03NEmvry7yqAG0i0opEEbBCbxhDns7u
