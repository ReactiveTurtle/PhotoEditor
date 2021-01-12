import { CircularProgress, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactiveDialog from "../reactivedialog/ReactiveDialog";
import SearchIcon from '@material-ui/icons/Search';
import useStyles from "./PexelsSearchDialogStyle";
import ReactiveTextField from "../reactivetextfield/ReactiveTextField";
import { query } from "./PexelsManager";
import { Photo } from "pexels";
import Alert from '@material-ui/lab/Alert';
import { useTimeout } from "../timeout/Timeout";

interface PexelsArtDialogProps {
    isOpen: boolean,
    focused: boolean,
    onClose: Function,
    onApply: (photo: Photo) => void
}

export default function PexelsSearchDialog(props: PexelsArtDialogProps) {
    const classes = useStyles();

    const [isRateLimitExceeded, setRateLimitExceeded] = useState<boolean>(false);
    const [isErrorShown, setErrorShown] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [queryText, setQueryText] = useState<string>("");
    const [loadedPhotos, setLoadedPhotos] = useState<Photo[]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);

    const timeout = useTimeout();

    const handleSearch = (page: number, loadedPhotos: Photo[]) => {
        setLoading(true);
        query(queryText, page, (photos) => {
            setLoading(false);
            if (isRateLimitExceeded) {
                setRateLimitExceeded(false);
            }
            setLoadedPhotos(loadedPhotos.concat(photos));
        }, () => {
            setLoading(false);
            console.log("Превышен лимит запросов");
            if (!isRateLimitExceeded) {
                setRateLimitExceeded(true);
            }
            setErrorShown(true);
            timeout(3000, () => {
                setErrorShown(false)
            });
        });
        setPage(page + 1);
    }

    const handleNewSearch = () => {
        setPage(1);
        setLoadedPhotos([]);
        handleSearch(1, []);
    }

    const handleImageClick = (photo: Photo) => {
        props.onApply(photo);
    }

    const handleClose = () => {
        props.onClose();
    }

    useEffect(() => {
        if (!props.focused || !props.isOpen) {
            return;
        }
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                handleNewSearch();
            }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        }
    });

    const [alreadyScrolled, setArleadyScrolled] = useState<boolean>(false);
    return (
        <ReactiveDialog
            title="Поиск картинок в Pexels"
            paperStyle={{
                width: "72%",
                maxWidth: "72%"
            }}
            contentStyle={{
                textAlign: "center"
            }}
            isOpen={props.isOpen}
            onScroll={(e) => {
                const div = e.currentTarget;
                if (!alreadyScrolled && div.offsetHeight + div.scrollTop >= div.scrollHeight) {
                    setArleadyScrolled(true)
                    handleSearch(page, loadedPhotos);
                } else if (alreadyScrolled) {
                    setArleadyScrolled(false)
                }
            }}
            onClose={() => handleClose()}>
            <div className={classes.searchContainer}>
                <ReactiveTextField
                    className={classes.searchField}
                    text={queryText}
                    type="text"
                    label="Поиск"
                    autocomplete="off"
                    onChange={(e) => {
                        setQueryText(e.target.value)
                    }} />
                <div className={classes.searchButtonWrapper}>
                    <IconButton
                        type="submit"
                        aria-label="search"
                        onClick={() => handleNewSearch()}>
                        <SearchIcon
                            htmlColor="#FFFFFF8a" />
                    </IconButton>
                </div>
            </div>

            {(loadedPhotos.length > 0 && !isRateLimitExceeded) &&
                <div className={classes.searchResultsWrapper}>
                    <h5>Результаты запроса</h5>
                </div>}
            {isErrorShown &&
                <Alert
                    className={classes.error}
                    variant="filled" severity="error">
                    Достигнут лимит запросов. Подождите некоторое время
                </Alert>}
            <div>
                <div className={classes.photoLineContainer}>
                    {loadedPhotos.map((photo, index) => {
                        return getHorizontalPosition(loadedPhotos, index) === 0 &&
                            <img
                                className={classes.photo}
                                onClick={() => handleImageClick(photo)}
                                key={photo + "" + index}
                                src={photo.src.medium}
                                alt={"Автор: " + photo.photographer}
                                width="98%" />
                    })}
                </div>

                <div className={classes.photoLineContainer}>
                    {loadedPhotos.map((photo, index) => {
                        return (getHorizontalPosition(loadedPhotos, index) === 1 &&
                            <img
                                className={classes.photo}
                                onClick={() => handleImageClick(photo)}
                                key={photo.id + "" + index}
                                src={photo.src.medium}
                                alt={"Автор: " + photo.photographer}
                                width="98%" />)
                    })}
                </div>

                <div className={classes.photoLineContainer}>
                    {loadedPhotos.map((photo, index) => {
                        return (getHorizontalPosition(loadedPhotos, index) === 2 &&
                            <img
                                className={classes.photo}
                                onClick={() => handleImageClick(photo)}
                                key={photo.id + "" + index}
                                src={photo.src.medium}
                                alt={"Автор: " + photo.photographer}
                                width="98%" />)
                    })}
                </div>
            </div>
            <CircularProgress
                className={classes.progressBar}
                style={{
                    visibility: isLoading ? "visible" : "hidden"
                }} />
        </ReactiveDialog>
    );
}

function getHorizontalPosition(photos: Photo[], index: number): number {
    const startBlockIndex = index - index % 3;
    const photo1 = photos[startBlockIndex].height / photos[startBlockIndex].width;
    const photo2 = (startBlockIndex + 1) < photos.length ? photos[startBlockIndex + 1].height / photos[startBlockIndex + 1].width : 0;
    const photo3 = (startBlockIndex + 2) < photos.length ? photos[startBlockIndex + 2].height / photos[startBlockIndex + 2].width : 0;
    const sortedIndices = [3];
    if (photo1 <= photo2) {
        if (photo2 <= photo3) {
            sortedIndices[0] = 0;
            sortedIndices[1] = 1;
            sortedIndices[2] = 2;
        } else {
            if (photo3 < photo1) {
                sortedIndices[0] = 2;
                sortedIndices[1] = 0;
            } else {
                sortedIndices[0] = 0;
                sortedIndices[1] = 2;
            }
            sortedIndices[2] = 1;
        }
    } else {
        if (photo1 <= photo3) {
            sortedIndices[0] = 1;
            sortedIndices[1] = 0;
            sortedIndices[2] = 2;
        } else {
            if (photo3 < photo2) {
                sortedIndices[0] = 2;
                sortedIndices[1] = 1;
            } else {
                sortedIndices[0] = 1;
                sortedIndices[1] = 2;
            }
            sortedIndices[2] = 0;
        }
    }
    const newIndex = (index - (-Math.floor(index / 3 + 1) % 3) + 3) % 3;
    switch (sortedIndices[newIndex]) {
        case 1:
            if (photo2 === 0) {
                return -1;
            }
            break;
        case 2:
            if (photo2 === 0) {
                return -1;
            }
            break;
    }
    return sortedIndices[newIndex];
}