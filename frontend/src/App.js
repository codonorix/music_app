import './App.css';
import {useState, useRef} from 'react'
import axios from 'axios'
import SongInfo from "./components/SongInfo";
import MovieInfo from "./components/MovieInfo";
import PodcastInfo from "./components/PodcastInfo";
import MusicVideoInfo from "./components/MusicVideoInfo";
import AudiobookInfo from "./components/AudiobookInfo";
import TvShowInfo from "./components/TvShowInfo";
import SoftwareInfo from "./components/SoftwareInfo";
import EbookInfo from "./components/EbookInfo";
import {FavButton} from "./components/FavButton";
import {Heading} from "./components/Heading";

function App() {

    // Set State
    const [searchResult, setSearchResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isChecked, setIsChecked] = useState([]);

    // Create array for checkbox items
    const checkBoxItems = ['music', 'movie', 'podcast', 'musicVideo', 'audiobook', 'shortFilm', 'tvShow',
        'software', 'ebook', 'all'];

    // Use ref for input search box
    const input = useRef();

    // Fetch Data
    async function searchMedia() {
        try {
            let allData = [];
            for (let i = 0; i < isChecked.length; i++) {
                let item = JSON.stringify(isChecked[i]);
                let newItem = item.replaceAll("\"", "");
                let res = await axios(`http://localhost:8080?term=${searchTerm}&media=${newItem}`);
                allData.push(res.data.results)
            }
            await setSearchResult(allData)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={'App'}>

            {/* Header */}
            <Heading/>
            <FavButton/>

            {/* Input text box*/}
            <input type={'text'} ref={input} className="form-control" placeholder={'Search'}
                   onChange={() => setSearchTerm(input.current.value)}/>

            {/* Check boxes */}
            {checkBoxItems.map(item => (
                <div className="form-check form-check-inline mt-2" key={item}>
                    <input className="form-check-input" type="checkbox" id={item} value={item} onChange={(e) => {
                        // Add to checked list
                        if (e.target.checked && !isChecked.includes(item)) {
                            setIsChecked(prev => [...prev, item])
                        } else {
                            // Remove from checked list
                            setIsChecked(
                                isChecked.filter((item) => item !== e.target.value),
                            );
                        }
                    }}/>
                    <label className="form-check-label"
                           htmlFor={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</label>
                </div>
            ))}
            <button className={'btn btn-primary'} onClick={searchMedia}>Search</button>

            {/* Search results display */}
            {/* Music */}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((song) => {
                        if (song.kind === 'song')
                                return <SongInfo key={song.trackId ? song.trackId : song.collectionId}
                                                 trackName={song.trackName}
                                                 artistName={song.artistName}
                                                 artworkUrl100={song.artworkUrl100}
                                                 primaryGenreName={song.primaryGenreName}
                                                 releaseDate={song.releaseDate}
                                                 previewUrl={song.previewUrl}
                                                 kind={song.kind}
                                                 trackId={song.trackId}
                                                 />
                        }
                    ))
                )}
            </div>

            {/* Movies */}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((movie) => {
                            if (movie.kind === 'feature-movie') {
                                return <MovieInfo key={movie.trackId}
                                                  collectionName={movie.collectionName}
                                                  trackName={movie.trackName}
                                                  artworkUrl100={movie.artworkUrl100}
                                                  primaryGenreName={movie.primaryGenreName}
                                                  releaseDate={movie.releaseDate}
                                                  previewUrl={movie.previewUrl}
                                                  kind={movie.kind}
                                                  trackId={movie.trackId}
                                />
                            }
                        }
                    ))
                )}
            </div>

            {/*/!* Podcasts *!/*/}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((podcast) => {
                            if (podcast.kind === 'podcast') {
                                return <PodcastInfo key={podcast.trackId}
                                                    trackName={podcast.trackName}
                                                    artistName={podcast.artistName}
                                                    artworkUrl100={podcast.artworkUrl100}
                                                    releaseDate={podcast.releaseDate}
                                                    kind={podcast.kind}
                                                    trackId={podcast.trackId}
                                />
                            }
                        }
                    ))
                )}
            </div>

            {/*/!* Music Videos *!/*/}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((musicVideo) => {
                            if (musicVideo.kind === 'music-video') {
                                return <MusicVideoInfo key={musicVideo.trackId}
                                                       trackName={musicVideo.trackName}
                                                       artistName={musicVideo.artistName}
                                                       releaseDate={musicVideo.releaseDate}
                                                       previewUrl={musicVideo.previewUrl}
                                                       artworkUrl100={musicVideo.artworkUrl100}
                                                       kind={musicVideo.kind}
                                                       trackId={musicVideo.trackId}
                                />
                            }
                        }
                    ))
                )}
            </div>

            {/*/!* Audiobooks *!/*/}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((audiobook) => {
                            if (audiobook.wrapperType === 'audiobook') {
                                return <AudiobookInfo key={audiobook.collectionId}
                                                      trackName={audiobook.trackName}
                                                      artistName={audiobook.artistName}
                                                      artworkUrl100={audiobook.artworkUrl100}
                                                      wrapperType={audiobook.wrapperType}
                                                      collectionId={audiobook.collectionId}
                                />
                            }
                        }
                    ))
                )}
            </div>

            {/*/!* TV Shows *!/*/}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((tvShow) => {
                            if (tvShow.kind === 'tv-episode') {
                                return <TvShowInfo key={tvShow.trackId}
                                                   artistName={tvShow.artistName}
                                                   collectionName={tvShow.collectionName}
                                                   artworkUrl100={tvShow.artworkUrl100}
                                                   primaryGenreName={tvShow.primaryGenreName}
                                                   releaseDate={tvShow.releaseDate}
                                                   previewUrl={tvShow.previewUrl}
                                                   kind={tvShow.kind}
                                                   trackId={tvShow.trackId}
                                />
                            }
                        }
                    ))
                )}
            </div>

            {/*/!* Software *!/*/}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((software) => {
                            if (software.kind === 'software') {
                                return <SoftwareInfo key={software.trackId}
                                                     artistName={software.artistName}
                                                     trackName={software.trackName}
                                                     artworkUrl100={software.artworkUrl100}
                                                     primaryGenreName={software.primaryGenreName}
                                                     releaseDate={software.releaseDate}
                                                     previewUrl={software.previewUrl}
                                                     kind={software.kind}
                                                     trackId={software.trackId}
                                />
                            }
                        }
                    ))
                )}
            </div>

            {/*/!* Ebook *!/*/}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {searchResult.map((result) => (
                    result.map((ebook) => {
                            if (ebook.kind === 'ebook') {
                                return <EbookInfo key={ebook.trackId}
                                                  artistName={ebook.artistName}
                                                  trackName={ebook.trackName}
                                                  artworkUrl100={ebook.artworkUrl100}
                                                  primaryGenreName={ebook.primaryGenreName}
                                                  releaseDate={ebook.releaseDate}
                                                  previewUrl={ebook.previewUrl}
                                                  kind={ebook.kind}
                                                  trackId={ebook.trackId}
                                />
                            }
                        }
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
