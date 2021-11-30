/**
* @module src/pages/PageNotFound
*/
import { NavLink } from 'react-router-dom';
import './styles.scss';

const PageNotFound = () => (
  <div className="pageNotFound">
    <div className="pageNotFound__buttons">
      <h1 className="pageNotFound__title">404 ERROR</h1>
      <p className="pageNotFound__message">
        Yes, this is an error page
      </p>
      <p className="pageNotFound__message">
        But what if this error page was also an opportunity ?
      </p>
      <p className="pageNotFound__message">
        An opportunity to go back to the beginning.<br />
        An opportunity for a fresh start.<br />
      </p>
      <p className="pageNotFound__message">
        A new Day. A new Page. A clean slate !
      </p>
      <NavLink to="/">
        <button
          type="button"
          className="pageNotFound__button button"
        >
          &lt; Main Menu
        </button>
      </NavLink>
    </div>
  </div>
);

PageNotFound.propTypes = {};

export default PageNotFound;
