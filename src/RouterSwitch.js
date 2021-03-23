import { Route, Switch, useLocation } from "react-router";
import Layout from "./components/auth/Layout";
import PhotoModalContainer from "./components/profile/PhotoModalContainer";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Post from "./screens/Post";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import SignUp from "./screens/SignUp";

function RouterSwitch({ isLoggedIn }) {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div>
      <Switch location={background || location}>
        <Route exact path={routes.home}>
          {isLoggedIn ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Login />
          )}
        </Route>
        {!isLoggedIn ? (
          <Route path={routes.signUp}>
            <SignUp />
          </Route>
        ) : null}
        <Route path={`/users/:username`}>
          <Layout>
            <Profile />
          </Layout>
        </Route>
        <Route path={"/search"}>
          <Layout>
            <Search />
          </Layout>
        </Route>
        <Route path={"/posts/:id"}>
          <Layout>
            <Post />
          </Layout>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

      {background && (
        <Route path={"/posts/:id"} children={<PhotoModalContainer />} />
      )}
    </div>
  );
}

export default RouterSwitch;
