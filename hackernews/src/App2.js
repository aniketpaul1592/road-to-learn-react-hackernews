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
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
       <Search/>
      </div>
    );
  }
}

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm: '',
    }
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(event){ // synthetic react event
    this.setState({searchTerm : event.target.value});
  }
  render(){
    return(
    <div>  <form>
          <input type="text" value={this.state.searchTerm} onChange ={this.onSearch}/>
        </form>
        <Table searchTerm = {this.state.searchTerm}/>
    </div>
    );
  }
}

class Table extends Component{
  constructor(props){
    super(props);
    this.state = {
      list : list,
      searchTerm: this.props.searchTerm
    }
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id){
   const updatedList = this.state.list.filter(function(val){
      if(val.objectID !== id){
        return val;
      }
    });
    this.setState({list : updatedList});
  }

  render(){
    return(
      <div>
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
