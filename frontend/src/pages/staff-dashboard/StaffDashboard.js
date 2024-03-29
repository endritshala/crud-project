import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Copyright from "../../components/Copyright/Copyright";
import { useNavigate } from "react-router-dom";
import StaffRoutes from "./routes/staff.route";

//views
import PrescriptionList from "./views/Doctor/PrescriptionList";
import CreatePrescription from "./views/Doctor/CreatePrescription";
import Nurse from "./views/Nurse/Nurse";
import ExaminationList from "./views/Nurse/ExaminationList";
import Profile from "./views/Profile/Profile";
import { useAuthContext } from "./../../hooks/useAuthContext";
import AddPatient from "./views/Admin/AddPatient/AddPatient";
import PatientList from "./views/Admin/PatientList/PatientList";
import AddStaff from "./views/Admin/AddStaff/AddStaff";
import StaffList from "./views/Admin/StaffList/StaffList";
import AddDepartment from "./views/Admin/AddDepartment/AddDepartment";
import DepartmentList from "./views/Admin/DepartmentList/DepartmentList";

const drawerWidth = 220;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [option, setOption] = React.useState(props.option);

  // Debug output
  console.log("user.jobTitle:", user.jobTitle);
  console.log("option:", option);

  const handleRouteChange = (view) => {
    setOption(view);
    navigate("/staff/dashboard" + view);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <StaffRoutes handleRouteChange={handleRouteChange} />
        </Drawer>

        <Box
          style={{ height: "calc(100vh - 6rem)" }}
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Container maxWidth="1400" sx={{ mx: 0, mt: 2, mb: 0 }}>
            <Grid container spacing={3}>
              {option === "" && <Profile />}
              {user.admin && option === "/add-patient" && <AddPatient />}
              {user.admin && option === "/add-staff" && <AddStaff />}
              {user.admin && option === "/view-patients" && <PatientList />}
              {user.admin && option === "/view-staff" && <StaffList />}
              {user.jobTitle === "Doctor" && option === "/prescriptions" && (
                <PrescriptionList />
              )}
              {user.jobTitle === "Doctor" && option === "/addprescription" && (
                <CreatePrescription />
              )}
              {user.admin && option === "/add-department" && <AddDepartment />}
              {user.admin && option === "/view-departments" && (
                <DepartmentList />
              )}
              {user.jobTitle === "Nurse" && option === "/view-examinations" && (
                <ExaminationList />
              )}
              {user.jobTitle === "Nurse" &&
                option === "/create-examinations" && <Nurse />}
            </Grid>
            <Copyright sx={{ pt: 4 }} text={"Hospital Management System"} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StaffDashboard(props) {
  return <DashboardContent option={props.option} />;
}
