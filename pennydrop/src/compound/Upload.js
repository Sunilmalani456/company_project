import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import eezibLogo from "../images/eezib2.png";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import Aos from "aos";

const Upload = () => {
  const [file, setFile] = React.useState(null);

  // ********* excel uploading and validating ***********

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        let isValid = true;
        // Validate the headers
        const expectedHeaders = [
          "name",
          "account_number",
          "account_type",
          "isfc_code",
          "amount",
          "remark",
        ];
        const headers = rows[0];
        const headersValid = expectedHeaders.every((header) =>
          headers.includes(header)
        );

        if (!headersValid) {
          alert(
            "Invalid headers in the Excel file. Expected headers: name, account_number, account_type, isfc_code, amount, remark"
          );
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
              if (cellValue === undefined || cellValue === "") {
                alert(
                  `Empty value in header "${header}" for row ${rowIndex + 2}.`
                );
                window.location.reload();
                isValid = false;
                return true;
              }
              return false;
            });
          }
        });

        const noData = rows
          .slice(1)
          .every((row) =>
            row.every((cell) => cell === "undefined" || cell === "")
          );
        if (noData) {
          alert("no user data found in excel file.");
          window.location.reload();
          isValid = false;
        }

        if (isValid) {
          const jsonData = rows.slice(1).map((row) => {
            const obj = {};
            expectedHeaders.forEach((header, headerIndex) => {
              obj[header] = row[headerIndex];
            });
            return obj;
          });

          console.log("json data is : ", jsonData);

          window.alert("excel file uploaded.");
          window.location.reload();

          console.log("Excel file is valid");
        }
      };

      reader.readAsBinaryString(selectedFile);
    }
  };

  // ********* excel sheet with headers and download **************

  const downloadExcel = () => {
    const data = [
      [
        "name",
        "account_number",
        "account_type",
        "isfc_code",
        "amount",
        "remark",
      ],
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "sample.xlsx");
  };

  React.useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#def5ff",
      }}
    >
      <Box sx={{}}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              src={eezibLogo}
              sx={{ width: 160, padding: "0.3rem" }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <TextSnippetIcon />
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "montserrat",
                  fontweight: 500,
                  fontSize: "1.3rem",
                }}
              >
                Excel Sheet Upload..
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
          borderRadius: 4,
        }}
      >
        <Typography
          sx={{
            fontFamily: "montserrat",
            fontWeight: 400,
            fontSize: "1.1rem",
            color: "black",
          }}
        >
          please select excel file with appropiate content.
        </Typography>
        <Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              fontFamily: "montserrat",
              width: 350,
              height: 50,
              fontSize: 16,
            }}
          >
            <UploadFileRoundedIcon /> &nbsp; Upload excel
            <input
              type="file"
              accept=".xlsx, .xls"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            onClick={downloadExcel}
            sx={{
              fontFamily: "montserrat",
              fontweight: 400,
              fontSize: 12,
              textAlign: "right",
              marginTop: "0.5rem",
            }}
          >
            download excel sample
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Upload;
