import React from 'react';
import {Link} from "react-router-dom";

export const FavButton = () => {
    return (
        <button className={'btn btn-primary mb-2'}><Link className={'favBtn'} to={'/favorites'}>My Favorites</Link>
        </button>
    )
}
