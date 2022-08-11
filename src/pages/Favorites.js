import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import PlayerSong from '../components/PlayerSong';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: false,
      play: false,
      track: '',
      img: '',
      title: '',
    };

    this.restoreFavoriteSongs = this.restoreFavoriteSongs.bind(this);
    this.showFavoriteSongs = this.showFavoriteSongs.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.restoreFavoriteSongs();
  }

  componentDidUpdate() {
    this.showFavoriteSongs()
  }

  restoreFavoriteSongs() {
    this.setState({
      loading: true,

    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        loading: false,
      });
      this.showFavoriteSongs();
    });
  }

  removeFavorite(id) {
    const { favoriteSongs } = this.state;

    this.setState({
      favoriteSongs: favoriteSongs.filter((music) => id !== music.trackId)
    })
  }

  playSong = (event, track, img, title) => {

    this.setState({
      play: true,
      track,
      img,
      title,
    })
  }

  showFavoriteSongs() {
    const { favoriteSongs } = this.state;

    return favoriteSongs.map((music, index) => (
      <div className="musics-container">
        <MusicCard
          key={ index }
          playSong={ this.playSong }
          removeFavorite={ this.removeFavorite }
          music={ music }
          favorites={ favoriteSongs }
        />
      </div>
    ));
  }

  render() {
    const { loading, play, track, img, title } = this.state;

    return (
      <div data-testid="page-favorites" className="full-page">
        {
          loading ? <Loading /> : <Header />
        }
        <div className="main-container-album-searched">
        <div className="container-album-searched">
        {
          loading ? <Loading /> : this.showFavoriteSongs()
        }
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

export default Favorites;
