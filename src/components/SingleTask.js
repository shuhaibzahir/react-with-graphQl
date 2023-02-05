import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';

import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { deleteTask, editTask } from "../api/task";
import { CircularProgress, Snackbar } from "@mui/material";
import Close from '@mui/icons-material/Close';
import {Alert} from "./Alert";
const options = ["Todo", "Inprogress", "Done"];

const SingleTask = ({ data, index, setTask, refetch }) => {
  const [editData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editTaskApiCall, { loading }] = useMutation(editTask);
  const [deleteTaskApiCall] = useMutation(deleteTask);

  const [alertMsg, setAlertMsg] =useState(false);

  const handleChange = (name, value) => {
    setEditData({ ...data, [name]: value });
  };

  useEffect(()=>{
    setEditData(data)
  },[data])

  const submitTask = () => {
    if(isEdit){
      editTaskApiCall({
        variables: {
          editTaskId: data._id,
          data: {
            title: editData.title,
            status: editData.status,
            time: editData.time,
          },
        },
      });
      refetch();
      setAlertMsg("Task updated successfully")
    }
    setIsEdit(!isEdit);
  };
  
  const deleteTaskHandle = () => {
    deleteTaskApiCall({variables:{deleteTaskId:data._id}}).then(res=>{
      refetch();
      setAlertMsg("Task deleted successfully")
    })
  }
  return (
    <>
    <Grid
      container
      justifyContent="center"
      alignItems={"center"}
      spacing={1}
      marginTop={0.1}
    >
      <Grid item xs={1} md={1} lg={1}>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="standard"
          readOnly={true}
          value={index + 1}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <TextField
          fullWidth
          id="outlined-basic"
          variant="standard"
          label={isEdit ? "Enter your Task" : ""}
          readOnly={!isEdit}
          onChange={(e) => {
            handleChange("title", e.target.value);
          }}
          value={editData.title || ""}
        />
      </Grid>

      <Grid item xs={12} md={6} lg={2}>
        {isEdit ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField variant="standard" {...props} />
              )}
              label="DateTimePicker"
              value={editData.time}
              onChange={(newValue) => {
                handleChange("time", newValue);
              }}
            />
          </LocalizationProvider>
        ) : (
          <TextField
            fullWidth
            id="outlined-basic"
            variant="standard"
            readOnly={true}
            value={dayjs(editData.time).format("MMM DD YYYY, h:mm a")}
          />
        )}
      </Grid>
      <Grid item xs={12} md={3} lg={1}>
        {isEdit ? (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              variant="standard"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={editData.status || ""}
              label="Age"
              onChange={(e) => {
                handleChange("status", e.target.value);
              }}
            >
              {options.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            id="outlined-basic"
            variant="standard"
            readOnly={true}
            value={editData.status || ""}
          />
        )}
      </Grid>
      <Grid item xs={12} md={3} lg={1}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              submitTask();
            }}
          >
            {isEdit ? "submit" : "Edit"}
          </Button>
        )}
      </Grid>
      <Grid item xs={12} md={3} lg={1}>
      <IconButton
            variant="contained"
            onClick={() => {
              deleteTaskHandle();
            }}
          >
            <Close/>
           
          </IconButton>
      </Grid>
    </Grid>
    <Snackbar open={ alertMsg ? true : false} autoHideDuration={6000} onClose={() =>{setAlertMsg("")}}>
        <Alert onClose={()=>{setAlertMsg("")}} severity="success" sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SingleTask;
