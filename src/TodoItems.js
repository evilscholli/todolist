import React, { Component } from "react";
 
class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.completeTask = this.completeTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.createTasks = this.createTasks.bind(this);
  }
  createTasks(item) {
    if(item.completed) {
      return <li key={item.key}>
      <a className="li">{item.item}
      <br/>{item.date} {item.category}</a>
      </li>
    } else {
      return <li key={item.key}>
      <a className="li">{item.item}
      <button className="btn-sm-delete btn-task" onClick={() => this.removeTask(item)}>&#xff38;</button>
      <button className="btn-sm-complete btn-task" onClick={() => this.completeTask(item)}>&#x2713;</button>
      <br/>{item.date} {item.category}</a>
      </li>
    }
  }

  removeTask(item) {
    console.log('removeTask clicked')
    console.log(item)
    this.props.delete(item)
    return;
  }

  completeTask(item) {
    console.log('completeTask clicked')
    console.log(item)
    this.props.complete(item)
    return;
  }
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ol className="rectangle-list">
          {listItems}
      </ol>
    );
  }
};
 
export default TodoItems;