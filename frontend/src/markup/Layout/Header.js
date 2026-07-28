import React, { Component, Fragment } from 'react';
import HeaderContent from './HeaderContent';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFixed: false,
      isHeaderVisible: true,
      headerHeight: 0
    };
    this.lastScrollY = 0;
    this.scrollTolerance = 6;
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

    this.lastScrollY = window.scrollY;
    this.measureHeader();

    // Sticky header scroll listener
    this.handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const isDesktop = window.innerWidth >= 992;

      // Keep the original header visible while the page is at the beginning.
      if (currentScrollY <= 10) {
        this.lastScrollY = currentScrollY;
        this.setState({ isFixed: false, isHeaderVisible: true });
        return;
      }

      // Preserve the existing always-visible sticky behaviour on mobile/tablet.
      if (!isDesktop) {
        this.lastScrollY = currentScrollY;
        this.setState({ isFixed: true, isHeaderVisible: true });
        return;
      }

      const scrollDifference = currentScrollY - this.lastScrollY;
      if (Math.abs(scrollDifference) < this.scrollTolerance) {
        return;
      }

      this.lastScrollY = currentScrollY;
      this.setState({
        isFixed: true,
        isHeaderVisible: scrollDifference < 0
      });
    };

    this.handleResize = () => {
      if (!this.state.isFixed) {
        this.measureHeader();
      }

      if (window.innerWidth < 992) {
        this.setState({ isHeaderVisible: true });
      }
    };

    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize);
    this.handleScroll();
  }

  measureHeader = () => {
    if (this.headerElement) {
      const headerHeight = this.headerElement.offsetHeight;
      if (headerHeight && headerHeight !== this.state.headerHeight) {
        this.setState({ headerHeight });
      }
    }
  };

  componentWillUnmount() {
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  render() {
    // defaults to false (solid header) unless explicitly set to true
    const isTransparent = this.props.isTransparent === true;
    const { isFixed, isHeaderVisible, headerHeight } = this.state;
    const fixedHeaderSpace = isFixed && headerHeight
      ? { minHeight: `${headerHeight}px` }
      : undefined;

    return (
      <Fragment>
        <header
          ref={element => { this.headerElement = element; }}
          className={`site-header ${isTransparent ? 'header-transparent' : ''} ${isFixed ? 'is-fixed-sticky' : ''}`}
          style={fixedHeaderSpace}
        >
          <HeaderContent
            isFixed={isFixed}
            isHeaderVisible={isHeaderVisible}
          />					
        </header>
      </Fragment>
    );
  }
}

export default Header;
