import React from "react";

class PlayerSong extends React.Component {
  render() {
    const { track, img, title } = this.props;
    
    return (
      <div className="main-container-audio">
        <div className="container-img-title">
          <img className="img-player" src={ img } alt={ title } />
          <h5 className="title-player">{title}</h5>
        </div>
        <div className="container-audio">
          <audio className="audio" data-testid="audio-component" src={ track } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>

        </div>
      </div>
    )
  }
}

export default PlayerSong;
