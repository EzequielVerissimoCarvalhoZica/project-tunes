import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import PlayerSong from '../components/PlayerSong';
// import { Route } from 'react-router-dom';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      artist: '',
      album: '',
      albumPhoto: '',
      loading: false,
      favorites: [],
      play: false,
      track: '',
      img: '',
      title: '',
    };

    this.setMusics = this.setMusics.bind(this);
    this.restoreFavoriteSongs = this.restoreFavoriteSongs.bind(this);
  }

  componentDidMount() {
    this.setMusics();
    this.restoreFavoriteSongs();
  }

  async setMusics() {
    const { match: { params: { id } } } = this.props;

    this.setState({
      musics: await getMusics(id),
    }, () => {
      const { musics } = this.state;
      const artist = musics[0].artistName;
      const album = musics[0].collectionName;
      const albumPhoto = musics[0].artworkUrl100;

      this.setState({
        artist,
        album,
        albumPhoto,
      });
    });
  }

  restoreFavoriteSongs() {
    this.setState({
      loading: true,

    }, async () => {
      const favorites = await getFavoriteSongs();

      this.setState({
        loading: false,
        favorites,
      });
    });
  }

  playSong = (event, track, img, title) => {

    this.setState({
      play: true,
      track,
      img,
      title,
    })
  }



  render() {
    const { musics, artist, album, albumPhoto, loading, favorites, play, track, img, title } = this.state;

    return (
      <div>
              <div data-testid="page-album" className="full-page">
        { loading && <Loading />}
        <Header className="nav-album-searched"/>
        <div className="main-container-album-searched">
          <div className="container-album-searched">
            <section className="album-searched">
                <div className="img-album-container">
                  <img className="album-searched-img" src={ albumPhoto } alt="album" />
                </div>
                <div className="album-searched-body">
                  <h4 className="album-searched-artist" data-testid="artist-name">{ artist }</h4>
                  <p className="album-name-searched" data-testid="album-name">{ album }</p>
                </div>
              </section>
              <div className="main-musics-container">
                <div className="musics-container">
                {
                  musics.map((music, index) => (index > 0 ? <MusicCard
                    key={ index }
                    playSong={ this.playSong }
                    index={ index }
                    music={ music }
                    favorites={ favorites }
                  /> : false))
                }
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className="main-main-container">
      {
          play && <PlayerSong track={ track } img={ img } title={ title}/>
        }
      </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
