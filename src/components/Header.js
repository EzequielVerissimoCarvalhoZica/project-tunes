import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
    this.containHeader = this.containHeader.bind(this);
  }

  componentDidMount() {
    this.saveUser();
  }

  saveUser() {
    this.setState({
      loading: true,

    }, async () => {
      const user = await getUser();
      this.setState({
        user,
        loading: false,
      });
    });
  }

  containHeader() {
    const { user } = this.state;
    return (
      <div className="header-container">
        <header data-testid="header-component">
            <Link to="/">
            <img className="logo-header" src="/assets/header.svg" alt="uai" />
            </Link>
            <Link to="/profile" className="link-user">
              <div className="containerUser">
                <img className="logoProfile" src="/assets/profile.svg" alt="ue" />
                <p className="userName" data-testid="header-user-name">{ user.name }</p>
              </div>
            </Link>
        </header>
        <Nav variant="pills" className = "pagesNav" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/search" data-testid="link-to-search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/favorites" data-testid="link-to-favorites">Favorites</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" data-testid="link-to-profile">Profile</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <>
          {
            loading ? <Loading /> : this.containHeader()
          }
          </>
    );
  }
}

export default Header;
