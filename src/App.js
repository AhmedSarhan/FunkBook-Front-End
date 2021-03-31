import React, { useContext, Suspense } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { AppContext } from './context/AppContext';

import Footer from './components/Navigation/Footer';
import Header from './components/Navigation/Header';
import FlashMessage from './components/Navigation/FlashMessage';
import Search from './components/Navigation/Search';
import LoadingCircle from './components/Navigation/LoadingCircle';

const Chat = React.lazy(() => import('./components/timeline/Chat'));

const SinglePost = React.lazy(() => import('./views/SinglePost'));
const Profile = React.lazy(() => import('./views/Profile'));
const Guest = React.lazy(() => import('./views/Guest'));
const Home = React.lazy(() => import('./views/Home'));
const About = React.lazy(() => import('./views/About'));
const Terms = React.lazy(() => import('./views/Terms'));
const NewPost = React.lazy(() => import('./views/NewPost'));

axios.defaults.baseURL = process.env.REACT_APP_BACK_END_URL; //|| 'http://localhost:4000';

console.log(process.env.REACT_APP_BACK_END_URL);
function App() {
  const { flashMessage, loggedInState, isSearchOpen } = useContext(AppContext);

  return (
    <Router>
      <CSSTransition timeout={500} in={flashMessage.duration > 0} unmountOnExit>
        <FlashMessage
          title={flashMessage.title}
          duration={flashMessage.duration}
          type={flashMessage.type}
        />
      </CSSTransition>
      <Header />
      <Suspense
        fallback={
          <LoadingCircle
            width={'30em'}
            margin={'10em auto'}
            backgroundColor={'0, 123, 255'}
            color={'#ffffff'}
          />
        }
      >
        <Switch>
          <Route exact path="/">
            {loggedInState ? <Home /> : <Guest />}
          </Route>

          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/about-us">
            <About />
          </Route>
          <Route path="/create-post">
            <NewPost />
          </Route>
          <Route path="/edit-post/:id">
            <NewPost />
          </Route>
          <Route path="/post/:id">
            <SinglePost />
          </Route>
        </Switch>
      </Suspense>
      <CSSTransition
        timeout={500}
        in={isSearchOpen}
        className="search-overlay"
        unmountOnExit
      >
        <Search />
      </CSSTransition>

      <Suspense fallback="">{loggedInState && <Chat />}</Suspense>
      <Footer />
    </Router>
  );
}

export default App;
