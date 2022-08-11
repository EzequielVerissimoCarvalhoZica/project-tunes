import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  render() {
    const { album } = this.props;

    return (
        <section className="album">
          <Link
            className="link-album"
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` }
            >
          <div className="container-img">
            <img className="album-img" src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>
          <div className="album-body">
            <h5 className="album-title">{album.collectionName}</h5>
            <p className="album-text" > { album.artistName } </p>
          </div>
          </Link>
        </section>
    );
  }
}

Album.propTypes = {
  album: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default Album;
