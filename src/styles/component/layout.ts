import { styled, alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import styles from '.'

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SidebarCustom = styled("div")(({ theme }) => ({
  height: "100vh",
  position: "fixed",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  flexDirection: "column",
  width: "20%",
  backgroundColor: "white",
}));

const Content = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "80%",
  marginLeft: "20%",
}));

const LayoutStyles = makeStyles((theme: any) => ({
  profileContainer: {
    backgroundColor: styles.colorBlue,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
   '& .box':{
    alignItems: "center",
    display: "flex",
    padding: "2em",
   }
  },
}));

export { Search, SearchIconWrapper, StyledInputBase, SidebarCustom, Content };

export default LayoutStyles;
