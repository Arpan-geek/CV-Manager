import { Box, Button,ButtonGroup,Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useApplicantStore } from "../../store/applicantstore";
import { useEffect } from "react";

const Team = () => {
  const applicantsData= useApplicantStore((state) => state.applicantData);
  const CallGetApi = useApplicantStore((state) => state.getApi);
  
  useEffect(()   => {
    if (applicantsData.length === 0) {
     
      CallGetApi();
     
    }
  })


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {field: "id", headerName: "ID", width: 70},
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact",
      headerName: "Contact",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
   
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "technology",
      headerName: "Technology",
      flex: 1,
    },
    {
      field: "Manage",
      headerName: "Manage",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="50px"
            display="flex"
            justifyContent="center"
            color={colors.grey[100]}
      
          >z
            <ButtonGroup size="small" variant="text">
            <Button><DeleteOutlineOutlinedIcon  /></Button>
            <Button><DeleteOutlineOutlinedIcon /></Button>  
            <Button><DeleteOutlineOutlinedIcon /></Button>  
            </ButtonGroup>
           
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Applicants" subtitle="Manage the applicants" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={applicantsData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
