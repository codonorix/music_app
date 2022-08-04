import axios from 'axios';
import moment from "moment";

// Add
export default function AddToFavorites(props) {
    axios.post('/favorites', {
        "trackName": props.trackName,
        "kind": props.kind ? props.kind : props.wrapperType,
        "artistName": props.artistName,
        "previewUrl": props.previewUrl,
        "id": props.trackId ? props.trackId : props.collectionId,
        "genre": props.primaryGenreName ? props.primaryGenreName : null,
        "releaseDate": moment(props.releaseDate).utc().format('YYYY'),
        "artworkUrl": props.artworkUrl100,

    })
        .then(function (response) {
            alert("Item added to favorites!");
        })
        .catch(function (error) {
            console.log(error);
        });
}