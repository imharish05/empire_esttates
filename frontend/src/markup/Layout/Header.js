import React, { Component, Fragment } from 'react';
import HeaderContent from './HeaderContent';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFixed: false
    };
  }

  componentDidMount() {
    // sidebar open/close
    var Navicon = document.querySelector('.navicon');
    var sidebarmenu = document.querySelector('.myNavbar ');

    function toggleFunc() {
      if (sidebarmenu) sidebarmenu.classList.toggle('show');
      if (Navicon) Navicon.classList.toggle('open');
    }
    if (Navicon) Navicon.addEventListener('click', toggleFunc);

    // Sidenav li open close
    var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li'));
    for (var y = 0; y < navUl.length; y++) {
      navUl[y].addEventListener('click', function () { checkLi(this) });
    }

    function checkLi(current) {
      navUl.forEach(el => (current !== el) ? el.classList.remove('open') : '');
      setTimeout(() => {
        current.classList.toggle('open');
      }, 100);
    }

    // Sticky header scroll listener
    this.handleScroll = () => {
      if (window.scrollY > 10) {
        this.setState({ isFixed: true });
      } else {
        this.setState({ isFixed: false });
      }
    };
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  render() {
    // defaults to false (solid header) unless explicitly set to true
    const isTransparent = this.props.isTransparent === true;
    return (
      <Fragment>
        <header className={`site-header ${isTransparent ? 'header-transparent' : ''} ${this.state.isFixed ? 'is-fixed-sticky' : ''}`}>
          <HeaderContent isFixed={this.state.isFixed} />					
        </header>
      </Fragment>
    );
  }
}

export default Header;