import React from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Header from '../components/Header';
import Album from '../components/Album';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
// import { Route } from 'react-router-dom';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {

      albumName: '',
      albumSearch: [],
      loading: false,
      artist: '',
      anyArtist: false,

    };

    this.changeAlbum = this.changeAlbum.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.containAlbuns = this.containAlbuns.bind(this);
  }

  changeAlbum({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async buttonClick() {
    const { albumName } = this.state;

    this.setState({
      loading: true,
      artist: albumName,
    }, async () => {
      const albumSearch = await searchAlbumsAPI(albumName);
      if (albumSearch <= 0) {
        this.setState({
          loading: false,
          albumName: '',
          albumSearch,
          anyArtist: true,
        });
      } else {
        this.setState({
          loading: false,
          albumName: '',
          albumSearch,
          anyArtist: false,
        });
      }
    });
  }

  containAlbuns() {
    const { albumName, albumSearch, artist, anyArtist } = this.state;
    return (
      <>
        <Header />
        {/* <FormSearch albumName={albumName} buttonClick={this.buttonClick} changeAlbum={this.changeAlbum}/> */}
        <form className="form-search">
          <InputGroup className="mb-3 form-group">
            <label htmlFor="Nome do album">
              <Form.Control
                className="inputs"
                placeholder="Artist"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={ this.changeAlbum }
                type="text"
                value={ albumName }
                name="albumName"
                id=""
                data-testid="search-artist-input"
              />
            </label>
            <Button
              onClick={ this.buttonClick }
              disabled={ albumName.length < 2 }
              type="button"
              data-testid="search-artist-button"
              variant="outline-danger"
            >
              Pesquisar
      
            </Button>{' '}
          </InputGroup>
        </form>

        { artist && <h3 className="artist-search">{`Resultado de álbuns de: ${artist}`}</h3>}

        {
          anyArtist && <p>Nenhum álbum foi encontrado</p>
        }

        <div className="album-container">
          <div className="albuns">
          { albumSearch.map((album, index) => (<Album
            key={ album.collectionId }
            album={ album }
          />))}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {
      loading,
    } = this.state;

    return (
      <div data-testid="page-search">
        { loading ? <Loading /> : this.containAlbuns() }
      </div>
    );
  }
}

export default Search;
