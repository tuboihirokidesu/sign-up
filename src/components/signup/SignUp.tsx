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
    .email("正しいメールアドレスを指定してください。")
    .required("メールアドレスは必須項目です"),
});

const SignUp = () => {
  const classes = useStyles();

  const [values, setValue] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const { register, handleSubmit, errors } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  const handleClickShowPassword = () => {
    setValue({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
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
                  label='First Name'
                  name='firstName'
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
                  label='Last Name'
                  name='lastName'
                  required
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
                  label='Email Address'
                  name='email'
                  required
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                /> */}
                <FormControl className={classes.inputField} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='password'
                    name='password'
                    type={values.showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setValue({ ...values, password: e.target.value })
                    }
                    inputRef={register({ required: true })}
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
                    labelWidth={70}
                  />
                  {errors.password && (
                    <div className='error'>Enter your password</div>
                  )}
                </FormControl>
                {values.password ? (
                  <PasswordStrengthMeter password={values.password} />
                ) : (
                  <div></div>
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
            {/* <Grid container justify='flex-end'>
            <Grid item>
              <Link href='#' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
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
