import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import TodoItems from "./TodoItems";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {submit: true};
    this.state.shownData = []
    this.state.data = [];
    this.state.completeData = [];
    this.state.removedData = [];
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  deleteItem(item) {
    var filteredData= this.state.data.filter(function (tempItem) {
      return (tempItem.key !== item.key);
    });
    var removedData = this.state.removedData;
    removedData = removedData.concat([item]);
    this.setState({removedData: removedData, data: filteredData, shownData: filteredData});
  }

  completeItem(item) {
    item.completed = true;
    var filteredData = this.state.data.filter(function (tempItem) {
      return (tempItem.key !== item.key);
    });
    var completeData = this.state.completeData;
    completeData = completeData.concat([item]);
    this.setState({completeData: completeData, data: filteredData, shownData: filteredData});
  }

  onShowAll() {
    this.setState({shownData: this.state.data});
  }

  onShowCompleted() {
    this.setState({shownData: this.state.completeData});
  }

  onDeleteCompleted() {
    this.setState({completeData: [], shownData: []});
  }

  doSubmit (e) {
		e.preventDefault();
    var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
    var taskdate = ReactDOM.findDOMNode(this.refs.taskdate).value.trim();
    var taskcategory = ReactDOM.findDOMNode(this.refs.taskcategory).value.trim();

    if(taskdate === '') {
      var today = new Date();
      var month = ('0' + today.getMonth()).slice(-2);
      var day = ('0' + today.getDay()).slice(-2);
      taskdate = today.getFullYear() + '-' + month + '-' + day;
    }

		if (!task) {
			return;
		}
    ReactDOM.findDOMNode(this.refs.task).value = '';
    ReactDOM.findDOMNode(this.refs.taskdate).value = '';
    ReactDOM.findDOMNode(this.refs.taskcategory).value = '';

    var data = this.state.data;
		data = data.concat([{key: this.guid(), item: task, date: taskdate, category: taskcategory, completed: false}]);
    this.setState({shownData: data, data: data});

    return;
	}

  render() {
    return (
      <div className="App">
        <div className="center">
          <header className="App-header">
            <h1 className="App-title">TODO LIST</h1>
          </header>
          <TodoItems 
          entries={this.state.shownData}
          delete={this.deleteItem.bind(this)}
          complete={this.completeItem.bind(this)}/>
          <div>
            <form onSubmit={this.doSubmit.bind(this)}>
              <span>
                <label>Task</label>
                <input id='todotask' className="effect-2" placeholder="your todo" ref="task" type="text" name="todo"/>
              </span>
              <br />
              <span>
                <label>Date</label>
                <input id='tododate' ref="taskdate" type="date" name="date" />
              </span>
              <br />
              <span>
                <label>Category:</label>            
                <select id='todocategory' ref="taskcategory">
                  <option value=""></option>
                  <option value="Anpassung">Anpassung</option>
                  <option value="Privat">Privat</option>
                </select>
              </span>
              <br />
              <span>        
                <input className="btn" type="submit" value="Submit" />
              </span>
            </form>
          </div>
          <div>
            <button className="btn btn-footer" onClick={this.onShowCompleted.bind(this)}>completed</button>
            <button className="btn btn-footer" onClick={this.onShowAll.bind(this)}>tasks</button>
            <button className="btn btn-footer" onClick={this.onDeleteCompleted.bind(this)}>delete tasks</button>
          </div>
        </div>
      </div>
    );    
  }
}

export default App;