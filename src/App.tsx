import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoryList from 'pages/StoryList';
import StoryDetail from 'pages/StoryDetail';

const App: React.FC = () => {
  return (
    <div className="container">
      <h3 className="text-center">React HackerNews with Typescript</h3>
      <Router>
        <Switch>
          <Route exact path="/" component={StoryList} />
          <Route exact path="/story/:id" component={StoryDetail} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
