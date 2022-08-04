import React from 'react';
import moment from "moment";
import './cardStyles.css'
import AddToFavorites from "./AddToFavorites";

export default function SongInfo(props) {
    return (
        <div className={'col'}>
            <div className="card h-100">
                <img src={props.artworkUrl100} className="card-img-top" alt="cover image"/>
                <div className="card-body">
                    <small
                        className={'fst-italic'}>{props.kind.charAt(0).toUpperCase() + props.kind.slice(1)} • {props.primaryGenreName} • {moment(props.releaseDate).utc().format('YYYY')}</small>
                    <h4 className="card-title pt-1">{props.artistName}</h4>
                    <p className="card-text">{props.trackName}</p>
                    <audio controls>
                        <source src={props.previewUrl} type="audio/mpeg"/>
                    </audio>
                </div>
                <small>{props.trackId}</small>
                <div className="card-footer">
                    <button className={'btn btn-secondary'} onClick={() => AddToFavorites(props)}>Add to favorites
                    </button>
                </div>
            </div>
        </div>
    )
}