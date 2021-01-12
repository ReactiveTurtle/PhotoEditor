import { createClient, Photo, Photos } from "pexels";
import { PhotosWithTotalResults, ErrorResponse } from "pexels";

const client = createClient('563492ad6f917000010000011d7c21ba52c34f0abbefd675f9034e42');
const PHOTOS_AT_TIME = 9;

function handleQuery(
    response: Photos | PhotosWithTotalResults | ErrorResponse,
    onQueryResult: (photos: Photo[]) => void, onError: () => void) {

    if ((response as ErrorResponse).error === "Rate limit exceeded") {
        onError();
        return;
    }
    const res = response as PhotosWithTotalResults;
    onQueryResult(res.photos);
}

export function query(queryText: string, page: number,
    onQueryResult: (photos: Photo[]) => void,
    onError: () => void) {
    if (queryText === "") {
        client.photos.curated({
            query: queryText,
            per_page: PHOTOS_AT_TIME,
            page: page,
            locale: "ru-RU"
        }).then(response => {
            handleQuery(response, onQueryResult, onError);
        })
    } else {
        client.photos.search({
            query: queryText,
            per_page: PHOTOS_AT_TIME,
            page: page,
            locale: "ru-RU"
        }).then(response => {
            handleQuery(response, onQueryResult, onError);
        });
    }
}
