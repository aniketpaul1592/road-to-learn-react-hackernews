import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list : list,
      searchTerm: ''
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event){ // synthetic react event
    this.setState({searchTerm : event.target.value});
  }
  onDismiss(id){
   const updatedList = this.state.list.filter(function(val){ 
      if(val.objectID !== id){
        return val;
      }
    });
   console.log(updatedList);
    this.setState({list : updatedList});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <form>
          <input type="text" onChange ={this.onSearch}/>
        </form>
        { this.state.list.filter(isSearched(this.state.searchTerm)).map(item =>
            <div key={item.objectID}>
            <span>
            <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button onClick={() => this.onDismiss(item.objectID)} type="button">
              Dismiss
              </button>
            </span>

            </div>
        )}
      </div>
    );
  }
}

export default App;
