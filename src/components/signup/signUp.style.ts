import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputField: {
    width: "100%",
    marginBottom: "1rem",
  },
  error: {
    color: "#f44336",
    marginLeft: "14px",
    marginLight: "14px",
    fontSize: "0.75rem",
    marginTop: "3px",
    textAlign: "left",
    lineHeight: "1.66",
  },
}));

export default useStyles;
