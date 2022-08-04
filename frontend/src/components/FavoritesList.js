import React, {useState} from "react";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import './FavoritesList.css'
import RemoveFavorites from './RemoveFavorites'

export default function FavoritesList() {

    // Set states
    const [allFavs, setAllFavs] = useState([])

    //API Call to get json file
    useEffect(() => {
        fetch('/favorites')
            .then(res => res.json())
            .then(res => {
                setAllFavs(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [allFavs])

    return (
        // Map through allFavs to display on page
        <div>
            <button className={'btn btn-primary'}><Link to={'/'} className={'favBtn'}>Back to search</Link></button>
            <h2 className={'text-center'}>My Favorites</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {allFavs.length >= 1 ? allFavs.map((item) => (
                        <div className={'col'} key={item.id}>
                            <div className="card h-100">
                                <img src={item.artworkUrl} className="card-img-top" alt="cover image"/>
                                <div className="card-body">
                                    <small
                                        className={'fst-italic'}>{item.kind.charAt(0).toUpperCase() + item.kind.slice(1)} • {item.genre} • {item.releaseDate}</small>
                                    <h4 className="card-title pt-1">{item.artistName}</h4>
                                    <p className="card-text">{item.trackName}</p>
                                    {item.kind === 'song' ? <audio controls>
                                        <source src={item.previewUrl} type="audio/mpeg"/>
                                    </audio> : null}
                                    {item.kind === 'feature-movie' || item.kind === 'music-video' || item.kind === 'tv-episode' ?
                                        <video className={'video'} controls>
                                            <source src={item.previewUrl} type="video/mp4"/>
                                        </video> : null}
                                </div>
                                <small>{item.id}</small>
                                <div className="card-footer">
                                    <button className={'btn btn-secondary'} onClick={() => RemoveFavorites(item)}>Remove
                                        from Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ) : <p>You have not added any items to your favorites!</p>}
            </div>
        </div>
    )
}