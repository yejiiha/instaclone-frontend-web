import { Route, Switch, useLocation } from "react-router";
import Layout from "./components/auth/Layout";
import DefaultRoom from "./components/dm/DefaultRoom";
import DmLayout from "./components/dm/DmLayout";
import Room from "./components/dm/Room";
import HomeLayout from "./components/HomeLayout";
import PhotoModalContainer from "./components/profile/PhotoModalContainer";
import routes from "./routes";
import AccountEdit from "./screens/AccountEdit";
import Create from "./screens/Create";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import PhotoEdit from "./screens/PhotoEdit";
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
            <HomeLayout>
              <Home />
            </HomeLayout>
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
        <Route exact path={"/posts/:id"}>
          <Layout>
            <Post />
          </Layout>
        </Route>
        <Route path={"/create"}>
          <Layout>
            <Create />
          </Layout>
        </Route>
        <Route path={"/accounts/edit"}>
          <Layout>
            <AccountEdit />
          </Layout>
        </Route>
        <Route path={"/posts/:id/edit"}>
          <Layout>
            <PhotoEdit />
          </Layout>
        </Route>
        <Route path={"/direct/inbox"}>
          <DmLayout>
            <DefaultRoom />
          </DmLayout>
        </Route>
        <Route path={"/direct/t/:id"}>
          <DmLayout>
            <Room />
          </DmLayout>
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
