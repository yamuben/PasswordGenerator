import React from "react";

import "./App.css";

import { Box, Stack, Button ,Alert,Modal} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import { generateDefaultPassword } from "./utils/generatePassword";
function App() {
  const [state, setState] = React.useState({
    numbers: true,
    symbols: false,
    lowercase: false,
    uppercase: false,
  });

  const handleChangeCheckBox = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { numbers, symbols, lowercase, uppercase } = state;
  const [passwordLength, setPasswordLength] = React.useState(8);
  const [password, setPassword] = React.useState();

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const showPasswordProperties = () => {
    if (passwordLength < 8 || passwordLength > 32) {
      console.log("Password length is invalid");
      handleOpen()
    } else {
      setValues({
        ...values,
        password: generateDefaultPassword({ length: passwordLength, ...state }),
      });
    }
  };
  return (
    <div className="App">
      <h1>Generate Password</h1>
      <div>
        <Box>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Select Password Properties</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={numbers}
                    onChange={handleChangeCheckBox}
                    name="numbers"
                  />
                }
                label="Include numbers?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={symbols}
                    onChange={handleChangeCheckBox}
                    name="symbols"
                  />
                }
                label="Include symbols ? "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={lowercase}
                    onChange={handleChangeCheckBox}
                    name="lowercase"
                  />
                }
                label="Include lowercase letters?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={uppercase}
                    onChange={handleChangeCheckBox}
                    name="uppercase"
                  />
                }
                label="Include uppercase letters?"
              />
            </FormGroup>
            <TextField
              id="standard-number"
              label="Number"
              type="number"
              defaultValue={passwordLength}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setPasswordLength(+e.target.value);
              }}
              variant="standard"
            />
            <FormHelperText>
              Be careful, make your password stronger as you wish!
            </FormHelperText>
          </FormControl>
        </Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Alert severity="error">Password length should belongs between 8 and 32!</Alert>
        
      </Modal>
       <Stack spacing={1} direction="row">
          <FormControl sx={{ m: 1, width: "45ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              showPasswordProperties();
            }}
          >
            Generate Password
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default App;
