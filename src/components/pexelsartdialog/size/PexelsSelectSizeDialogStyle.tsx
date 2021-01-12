import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        searchField: {
            margin: "0 8px"
        },
        searchButtonWrapper: {
            display: "flex",
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "50%",
            backgroundColor: "#cfcfcf21",
            boxShadow: "4px 4px 16px #55555521, -4px -4px 16px #ffffff21"
        }
    }));

export default useStyles;