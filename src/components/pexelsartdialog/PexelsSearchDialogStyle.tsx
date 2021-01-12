import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        searchContainer: {
            width: "100%",
            display: "inline-flex",
            textAlign: "center"
        },
        searchField: {
            width: "40%",
            marginLeft: "auto",
            borderRadius: "24px"
        },
        searchButtonWrapper: {
            display: "flex",
            width: "fit-content",
            height: "fit-content",
            margin: "auto auto auto 8px",
            borderRadius: "50%",
            backgroundColor: "#cfcfcf21",
            boxShadow: "4px 4px 16px #55555521, -4px -4px 16px #ffffff21"
        },
        photoLineContainer: {
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            width: "24%",
        },
        searchResultsWrapper: {
            textAlign: "start",
            margin: "auto",
            width: "69%",
            color: "#FFFFFFd0",
            font: "24px cursive"
        },
        error: {
            margin: "16px auto 0 auto",
            width: "fit-content"
        },
        photo: {
            cursor: "pointer",
            margin: "1px 0"
        },
        progressBar: {
            margin: "16px 0 4px 0",
            color: "#62ebff"
        }
    }));

export default useStyles;