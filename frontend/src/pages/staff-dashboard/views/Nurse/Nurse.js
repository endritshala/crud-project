import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { Autocomplete } from "@mui/material";
import { useAuthContext } from "../../../../hooks/useAuthContext";

export default function Nurse() {
  const [patient, setPatient] = useState("");
  const [date, setDate] = useState(new Date(Date.now()));
  const [description, setDescription] = useState("");

  const [records, setRecords] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    await api.get(`/patient/all`).then((userData) => {
      setRecords(userData.data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { patient, date, description, nurse: user.id };
    try {
      await api.post("/staff/nurse/examination", data).then((userData) => {
        setPatient("");
        setDate(new Date(Date.now()));
        setDescription("");
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
        <h2 className="dashboard-title">New Examination</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <div>
            <Autocomplete
              disablePortal
              options={records}
              value={patient}
              getOptionLabel={(records) => records.name || ""}
              onChange={(event, newValue) => {
                setPatient(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Patient" required />
              )}
            />
            <TextField
              sx={{ mb: 4 }}
              id="datetime-local"
              fullWidth
              type="datetime-local"
              label="Date and Time"
              onChange={(e) => setDate(e.target.value)}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Examination
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
