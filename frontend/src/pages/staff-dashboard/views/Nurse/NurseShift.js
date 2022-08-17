import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
// import { Autocomplete } from "@mui/material";
import { useAuthContext } from "../../../../hooks/useAuthContext";

export default function NurseShift() {
  const [shiftName, setShiftName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [records, setRecords] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    await api.get(`/staff/nurse`).then((userData) => {
      setRecords(userData.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      shiftName,
      startTime,
      endTime,
      creator: user.id,
      nurse: user.id,
    };
    try {
      await api.post("/staff/nurse/nurseshift", data).then((userData) => {
        setShiftName("");
        setStartTime("");
        setEndTime("");
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        className="title"
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">New Nurse Shift</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Shift Name"
              fullWidth
              multiline
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Start Time"
              fullWidth
              multiline
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="End Time"
              fullWidth
              multiline
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Nurse shift
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
