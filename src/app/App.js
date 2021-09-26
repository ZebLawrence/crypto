import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Nav from '../components/nav/nav';
import asyncComponent from '../components/asyncComponent/asyncComponent';
import { pages } from '../pages/pagesConfig';
import './App.scss';
import PageContainer from '../components/pageContainer/pageContainer';

class App extends Component {
  render() {

    return (
      <Router>
        <PageContainer>
          <Container>
            <Nav/>
            <Switch>
              {
                Object.keys(pages).map(pageKey => {
                  const page = pages[pageKey];
                  const component = asyncComponent(() => import(`../pages/${page.componentPath}`));
                  return(
                    <Route exact path={page.path} component={component}/>
                  );
                })
              }
            </Switch>
          </Container>
        </PageContainer> 
      </Router>
    );
  }
}

export default App;
