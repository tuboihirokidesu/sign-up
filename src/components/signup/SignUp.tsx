import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./signUp.style";
import CopyRight from "../CopyRight";
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import PasswordStrengthMeter from "../PasswordStrengthMeter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  showPassword?: boolean;
};

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "数字は使えません")
    .required("必須項目です"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "数字は使えません")
    .required("必須項目です"),
  email: yup
    .string()
    .lowercase()
    .email("正しいメールアドレスを指定してください。")
    .required("メールアドレスは必須項目です"),
  password: yup
    .string()
    .matches(lowercaseRegex, "小文字を含めてください")
    .matches(uppercaseRegex, "大文字を含めてください")
    .matches(numericRegex, "数字を含めてください")
    .min(8, "最低８文字含めてください")
    .required("パスワードは必須項目です!"),
});

const SignUp = () => {
  const classes = useStyles();

  const [formKey, setFormKey] = useState(0);
  const [values, setValue] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });
  console.log(values);

  const { register, handleSubmit, errors } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
    setFormKey((prev) => prev + 1);
    setValue({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      showPassword: false,
    });
  });

  const handleClickShowPassword = () => {
    setValue({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValue({
      ...values,
      [name]: value,
    });
  };

  return (
    <Container component='main' maxWidth='xs' key={formKey}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <main>
          <form onSubmit={onSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='firstname'
                  autoFocus
                  error={!!errors.firstName}
                  fullWidth
                  helperText={errors.firstName?.message}
                  id='firstname'
                  inputRef={register}
                  label='氏名'
                  name='firstName'
                  onChange={handleInputChange}
                  value={values.firstName}
                  required
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='lastname'
                  error={!!errors.lastName}
                  fullWidth
                  helperText={errors.lastName?.message}
                  id='lastname'
                  inputRef={register}
                  label='名前'
                  name='lastName'
                  onChange={handleInputChange}
                  required
                  value={values.lastName}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete='email'
                  error={!!errors.email}
                  fullWidth
                  helperText={errors.email?.message}
                  id='email'
                  inputRef={register({ required: true })}
                  label='メールアドレス'
                  name='email'
                  onChange={handleInputChange}
                  required
                  value={values.email}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.inputField} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    パスワード
                  </InputLabel>
                  <OutlinedInput
                    id='password'
                    error={!!errors.password}
                    name='password'
                    type={values.showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                    inputRef={register}
                    value={values.password}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='end'
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={80}
                  />
                  {errors.password && (
                    <p className={classes.error}>{errors.password.message}</p>
                  )}
                </FormControl>
                {values.password ? (
                  <PasswordStrengthMeter password={values.password} />
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </main>
      </div>
      <Box mt={5}>
        <CopyRight />
      </Box>
    </Container>
  );
};

export default SignUp;
