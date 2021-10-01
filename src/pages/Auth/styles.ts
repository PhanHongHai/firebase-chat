import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#171616",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "100vw",
    height: "100vh",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontWeight:'bold',
    fontSize:'2em'
  },
  form: {
    borderRadius: "2%",
    backgroundColor: "white",
    padding: 15,
    boxShadow: " 1px 2px 24px 7px rgba(176, 176, 176, 0.25)",
  },
  btn: {
    // width:'15vw'
    // backgroundColor: "#3f51b5",
    margin: "0 2px",
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
}));

export default useStyles;
