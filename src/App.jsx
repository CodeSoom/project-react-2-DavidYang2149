import React, { useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sessionLoginCheck } from './redux/user';

import Loading from './components/common/Loading';
import Main from './layouts/Main';

const HeaderContainer = lazy(() => import('./containers/common/HeaderContainer'));
const RecipesPage = lazy(() => import('./pages/recipe/RecipesPage'));
const RecipePage = lazy(() => import('./pages/recipe/RecipePage'));
const RecipeWritePage = lazy(() => import('./pages/recipe/RecipeWritePage'));
const Recipe404Page = lazy(() => import('./pages/Recipe404Page'));

const ChatPage = lazy(() => import('./pages/chat/ChatPage'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionLoginCheck());
  }, []);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <HeaderContainer />
        <Main>
          <Switch>
            <Route exact path="/" component={RecipesPage} />
            <Route path="/recipe/:id" component={RecipePage} />
            <Route path="/recipewrite/:id" component={RecipeWritePage} />
            <Route path="/chat" component={ChatPage} />
            <Route component={Recipe404Page} />
          </Switch>
        </Main>
      </Suspense>
    </>
  );
};

export default App;
