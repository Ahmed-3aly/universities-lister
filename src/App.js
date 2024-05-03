import './App.css';
import React from 'react';
import Details from './Details';
import Error from './Error';
import Grid from './Grid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const FETCH = 'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates';
const KEY = 'data';

class App extends React.Component
{
  state = {
    fetchResult: 0,
    details: '',
    data: {},
  };
  async componentDidMount() {
    try {
      const api = await fetch(FETCH);
      const resolve = await api.text();
      localStorage.setItem(KEY, resolve);
      this.setState({fetchResult: 1, data: JSON.parse(resolve)});
    } catch {
      const restore = localStorage.getItem(KEY);
      if (restore) {
        this.setState({fetchResult: 1, data: JSON.parse(restore)});
        return;
      }
      this.setState({fetchResult: 0});
      return;
    }
	}
  render() {
    const S = this.state;
    if (S.fetchResult < 1) {
      return <Error />;
    }
    return (
      <Router>
        <Routes>
            <Route
                exact path='/'
                element={<Grid />}
            />
            <Route
                exact path='/details'
                element={<Details />}
            />
        </Routes>
        </Router>
      );
  }
}

export default App;
