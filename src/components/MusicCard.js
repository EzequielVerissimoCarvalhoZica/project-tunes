import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checkbox: false,
    };

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.restoreFavorite = this.restoreFavorite.bind(this);
    this.containMusics = this.containMusics.bind(this);
  }

  componentDidMount() {
    this.restoreFavorite();
  }

  componentDidUpdate(prevProps) {
    if (Object.is(prevProps, this.props)) return;

    this.restoreFavorite();
  }

  addFavoriteSong() {
    const { checkbox } = this.state;
    const { music, removeFavorite } = this.props;
    const { trackId } = music;

    this.setState((param) => ({

      loading: true,
      checkbox: !param.checkbox,

    }), async () => {
      if (checkbox) {
        await removeSong(music);

        if (removeFavorite) {
          removeFavorite(trackId)
        }
      } else {
        await addSong(music);
      }

      this.setState({
        loading: false,
      });
    });
  }

  restoreFavorite() {
    const { favorites } = this.props;
    const { music: { trackId } } = this.props;
    const isFavorite = favorites.some((favorite) => (favorite.trackId === trackId));

    this.setState({
      checkbox: isFavorite,
    });
  }

  

  containMusics() {
    const { music: { trackName, previewUrl, trackId, artworkUrl100, trackPrice } } = this.props;
    const { index, playSong } = this.props;
    const { checkbox } = this.state;

    return (
      <>
        <div className="music-card" onClick={ (event) => { playSong(event, previewUrl, artworkUrl100, trackName) } }>        
        <p className="index-p">{index}</p>
          <div className="musics-container">
            <div className="container-music-img">
              <img className="music-img" src={ artworkUrl100 } alt="album" />
            </div>
            <div className="music-body">
              <h5>{ trackName }</h5>
              <p>{ `Price ${trackPrice}` }</p>
            </div>
          </div>
        </div>
        {/* <audio className="audio" data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio> */}
        <div>
          <label htmlFor="favorite" >
            <input
              type="checkbox"
              checked={ checkbox }
              onChange={ this.addFavoriteSong }
              name="checkbox"
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <section className="container-music-card">
        { loading ? <Loading /> : this.containMusics() }
      </section>
    );
  }
}

MusicCard.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({
    find: PropTypes.func,
    trackId: PropTypes.number.isRequired,
  })).isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
