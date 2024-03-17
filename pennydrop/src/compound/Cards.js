import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import upiLogo from "../images/4137379.jpg";
import neftLogo from "../images/2879845.jpg";
import impsLogo from "../images/2903544.jpg";
import eeezibLogo from "../images/eezib2.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Aos from "aos";

import moment from "moment";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Cards = () => {
  // React.useEffect(() => { AOS.init({duration:1000});return()=> { AOS.refresh(); } },[])

  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [appear, setAppear] = React.useState(false);
  const [medium, setMedium] = React.useState("");
  const [type, setType] = React.useState("");
  const [report, setReport] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [startingDate, setStartingDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [endingDate, setEndingDate] = React.useState(new Date());

  const handleChange = (event) => {
    setMedium(event.target.value);
  };

  const handleChange1 = (event) => {
    setType(event.target.value);
  };

  const handleChange2 = (event) => {
    setReport(event.target.value);
  };

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  console.log("env", window.location.origin);

  const handleClose = () => {
    setAppear(false);
  };

  async function getData() {
    try {
      // ************Getting token from landing page ************

      const headersData = await location.state;
      console.log(headersData);

      const token1 = headersData.secureToken;
      console.log("cards token : ", token1);

      const contact = headersData.contact;
      console.log("number = ", contact);

      setToken(token1);
      setNumber(contact);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  // *********** code for sending date ,excluding time and zone ************

  const dates = date[0].startDate;
  const startedDate = moment
    .utc(dates)
    .format("YYYY MM DD")
    .replace(/GMT.*/g, "");

  const dates2 = date[0].endDate;
  const endedDate = moment
    .utc(dates2)
    .format("YYYY MM DD")
    .replace(/GMT.*/g, "");

  const datess = [{ startedDate, endedDate }];

  async function openDialog() {
    setAppear(true);
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div
      className="kalakaar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <AppBar color="transparent" position="static">
        <Toolbar sx={{ padding: "1rem" }}>
          <Box
            onClick={() => navigate("/")}
            component="img"
            src={eeezibLogo}
            sx={{ width: "10rem", marginRight: "auto" }}
          />

          {/* <Paper elevation={8} sx={{marginLeft:"auto"  ,marginTop:""  , borderRadius:"3rem 3rem 3rem 3rem" , padding:" 0.2rem 1rem", fontWeight:500 , textAlign:'center',fontSize:"1.2rem" }} >Welcome <br/>  <span style={{color:'red', fontWeight:600}} >{name}</span></Paper>   */}

          <Button
            variant="contained"
            color="primary"
            sx={{ fontFamily: "montserrat" }}
            onClick={openDialog}
          >
            Show Transactions
          </Button>

          <Dialog
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "50rem", // Set your width here
                },
              },
            }}
            open={appear}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography sx={{ fontFamily: "montserrat", fontWeight: 500 }}>
                Enter Paramaters{" "}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{ fontFamily: "montserrat", fontWeight: 600 }}
                    >
                      {" "}
                      enter transaction medium
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                      >
                        Medium
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={medium}
                        label="medium"
                        onChange={handleChange}
                      >
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="ALL"
                        >
                          ALL
                        </MenuItem>
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="UPI"
                        >
                          UPI
                        </MenuItem>
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="IMPS"
                        >
                          IMPS
                        </MenuItem>
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="NEFT"
                        >
                          NEFT
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        marginTop: "1rem",
                      }}
                    >
                      enter transaction type
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                      >
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={type}
                        label="type"
                        onChange={handleChange1}
                      >
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="ALL"
                        >
                          ALL
                        </MenuItem>
                        <MenuItem
                          onClose={handleClose}
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="SUCCESS"
                        >
                          SUCCESS
                        </MenuItem>
                        <MenuItem
                          onClose={handleClose}
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="PENDING"
                        >
                          PENDING
                        </MenuItem>
                        <MenuItem
                          onClose={handleClose}
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="FAILED"
                        >
                          FAILED
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        fontFamily: "montserrat",
                        fontWeight: 600,
                        marginTop: "1rem",
                      }}
                    >
                      enter report type
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel
                        id="demo-select-small-label"
                        sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                      >
                        Report
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={report}
                        label="report"
                        onChange={handleChange2}
                      >
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="SUMMARY"
                        >
                          SUMMARY
                        </MenuItem>
                        <MenuItem
                          sx={{ fontFamily: "montserrat", fontWeight: 500 }}
                          value="DETAIL"
                        >
                          DETAIL
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    marginTop: "3rem",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Accordion
                    sx={{
                      "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                          width: "100%",
                          maxWidth: "55rem", // Set your width here
                        },
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography
                        component={"span"}
                        sx={{
                          fontFamily: "montserrat",
                          fontWeight: 600,
                          marginTop: ".5rem",
                        }}
                      >
                        enter date range
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DateRangePicker
                        onChange={(item) => setDate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={date}
                        direction="horizontal"
                      />
                    </AccordionDetails>
                  </Accordion>

                  <Box></Box>
                </Box>

                <span></span>
                {/* location data to Google, even when no apps are running. */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {medium && type && report !== "" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate("/transitions", {
                      state: { id: { medium, datess, type, report, token } },
                    })
                  }
                >
                  Submit
                </Button>
              ) : (
                <Button disabled>Submit</Button>
              )}
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>

      <Box
        className="simple"
        sx={{
          fontSize: { md: "3.5rem", xs: "1.7rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { md: "row", sm: "row", xs: "column" },
        }}
      >
        Select&nbsp;
        <Box
          className="stokeText"
          sx={{ fontSize: { md: "3.2rem", xs: "1.7rem" } }}
        >
          eezib payment transfer
        </Box>
        &nbsp;mode.
      </Box>

      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          display: "flex",
          minHeight: "75vh",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: { xl: "column" },
          cursor: "pointer",
          marginTop: { md: "0", xs: "2.5rem" },
        }}
      >
        <Card
          sx={{
            maxWidth: 270,
            margin: "1rem",
            boxShadow: "0px 0px 5px 0px white",
          }}
        >
          <CardMedia sx={{ height: 180 }} image={upiLogo} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              UPI
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "montserrat", fontWeight: 500 }}
            >
              Its a Single mobile application for accessing different bank
              accounts over a single Network
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              sx={{ fontFamily: "montserrat" }}
              onClick={() => navigate("/cards", { state: token })}
              variant="contained"
              fullWidth
              size="small"
            >
              Comming soon
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 270, boxShadow: "0px 0px 5px 0px white" }}>
          <CardMedia sx={{ height: 180 }} image={impsLogo} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
              sx={{ fontFamily: "montserrat", fontWeight: 500 }}
            >
              IMPS
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "montserrat", fontWeight: 500 }}
            >
              IMPS provides robust & real time fund transfer which offers an
              instant, 24X7
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              size="small"
              sx={{ fontFamily: "montserrat" }}
              onClick={() =>
                navigate("/imps", { state: { token: token, number: number } })
              }
            >
              Access Impm{" "}
            </Button>
            {/* <Button  variant='contained' fullWidth  size="small" sx={{fontFamily:"montserrat" , fontSize:'0.8rem'}}  onClick={()=>navigate("/transitions" , {state : {data:token}})} >transactions</Button> */}
          </CardActions>
        </Card>

        <Card
          sx={{
            maxWidth: 270,
            margin: "1rem",
            boxShadow: "0px 0px 5px 0px white",
          }}
        >
          <CardMedia sx={{ height: 180 }} image={neftLogo} />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              NEFT
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "montserrat", fontWeight: 500 }}
            >
              NEFT is an electronic funds transfer system set up and managed by
              RBI.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              sx={{ fontFamily: "montserrat" }}
              onClick={(e) => navigate("/cards ", { state: { id: 2 } })}
              variant="contained"
              fullWidth
              size="small"
            >
              comming soon.
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
};

export default Cards;
