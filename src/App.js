import "./App.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleCompletion } from "./store/taskSlice";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  const tasks = useSelector((state) => state.tasks.taskList);

  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      assignee: "",
      priority: "Low",
      dueDate: null,
      completed: false,
    },
  });

  const onSubmit = (data) => {
    dispatch(addTask(data));
    reset();
  };

  // console.log("errors", errors);
  console.log("tasks", tasks);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Team Task Manager
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Task Title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="assignee"
              control={control}
              rules={{ required: "Assignee is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Assignee"
                  fullWidth
                  error={!!errors.assignee}
                  helperText={errors.assignee?.message}
                />
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select {...field}>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="dueDate"
              control={control}
              rules={{ required: "Due Date is required" }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    {...field}
                    label="Due Date"
                    onChange={(value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.dueDate}
                        helperText={errors.dueDate?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <Controller
              name="completed"
              control={control}
              render={({ field }) => (
                <div>
                  <Checkbox {...field} checked={field.value} />
                  Completed
                </div>
              )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Task
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            {tasks.map((task, index) => (
              <ListItem key={index} divider>
                <Checkbox
                  checked={task.completed}
                  onChange={() => dispatch(toggleCompletion(index))}
                />
                <ListItemText
                  primary={`${task.title} - ${task.assignee}`}
                  secondary={`Priority: ${task.priority} | Due: ${task.dueDate}`}
                />
              </ListItem>
            ))}
            {tasks.length === 0 && <Typography variant="body2">No tasks added yet.</Typography>}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
