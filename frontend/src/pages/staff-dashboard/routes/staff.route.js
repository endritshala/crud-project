import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MedicationIcon from "@mui/icons-material/Medication";
import { useAuthContext } from "../../../hooks/useAuthContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonAdd from "@mui/icons-material/PersonAdd";
import PermContactCalendar from "@mui/icons-material/PermContactCalendar";

export default function MenuItems({ handleRouteChange }) {
  const { user } = useAuthContext();

  return (
    <div>
      <ListItem button onClick={() => handleRouteChange("")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      {user.admin && (
        <ListItem button onClick={() => handleRouteChange("/add-patient")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Patient" />
        </ListItem>
      )}
      {user.admin && (
        <ListItem button onClick={() => handleRouteChange("/view-patients")}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="View Patients" />
        </ListItem>
      )}
      {user.admin && (
        <ListItem button onClick={() => handleRouteChange("/add-staff")}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary="Add Staff" />
        </ListItem>
      )}
      {user.admin && (
        <ListItem button onClick={() => handleRouteChange("/view-staff")}>
          <ListItemIcon>
            <PermContactCalendar />
          </ListItemIcon>
          <ListItemText primary="View Staff" />
        </ListItem>
      )}
      {user.admin && (
        <ListItem button onClick={() => handleRouteChange("/add-department")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Department" />
        </ListItem>
      )}
      {user.admin && (
        <ListItem button onClick={() => handleRouteChange("/view-departments")}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="View Departments" />
        </ListItem>
      )}
      {user.jobTitle === "Doctor" && (
        <ListItem button onClick={() => handleRouteChange("/addprescription")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Add Prescription" />
        </ListItem>
      )}
      {user.jobTitle === "Doctor" && (
        <ListItem button onClick={() => handleRouteChange("/prescriptions")}>
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="View Prescriptions" />
        </ListItem>
      )}
      {user.jobTitle === "Nurse" && (
        <ListItem
          button
          onClick={() => handleRouteChange("/view-examinations")}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Your Examinations" />
        </ListItem>
      )}
      {user.jobTitle === "Nurse" && (
        <ListItem
          button
          onClick={() => handleRouteChange("/create-examinations")}
        >
          <ListItemIcon>
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary="Create Examination" />
        </ListItem>
      )}
    </div>
  );
}
