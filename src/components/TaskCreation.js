import React, { useState, memo } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useMutation } from "@apollo/client";
import { addTask } from "../api/task";
import { CircularProgress } from "@mui/material";

const InitialValue = {
  title: "",
  time: new Date(),
};
const TaskCreation = ({ setTask, isEdit }) => {
  const [task, setCreateTask] = useState(InitialValue);
  const [createTask, {loading}] = useMutation(addTask);
  const handleChange = (name, value) => {
    setCreateTask({ ...task, [name]: value });
  };
  const submitTask = () => {
    createTask({ variables: task }).then((res) => {
      setTask((prev) => [...prev, res?.data?.addTask]);
    });
    setCreateTask(InitialValue);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems={"center"} spacing={3}>
        <Grid item xs={12} md={12} lg={8}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Task name"
            variant="standard"
            value={task.title}
            onChange={(e) => {
              handleChange("title", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => <TextField  variant="standard" {...props} />}
              label="DateTimePicker"
              value={task.time}
              onChange={(newValue) => {
                console.log(newValue);
                handleChange("time", newValue);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={3} lg={1}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              onClick={() => {
                submitTask();
              }}
              variant="outlined"
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default memo(TaskCreation);
