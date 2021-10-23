import React from "react";

function Grade(name, mark, weight) {
  this.name = name;
  this.mark = mark;
  this.weight = weight;
  this.edit = false;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
    };
    this.addGrade = this.addGrade.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addGrade = () => {
    const newGrade = new Grade("unit 1 test", 0.98, 20);
    this.setState({
      grades: [...this.state.grades, newGrade],
    });
  };

  handleChange(event) {
    let newArr = this.state.grades.splice(0);
    newArr[event.target.id][event.target.name] = event.target.value;

    this.setState({
      grades: [...newArr],
    });
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            console.log(this.state.grades);
            this.addGrade();
          }}
        >
          Click me
        </button>
        <div>
          {this.state.grades.map((grade, idx) => {
            return grade.edit ? (
              // edit of card is turned on
              <div key={idx}>
                <button
                  onClick={() => {
                    //toggle edit button so you can change the mark or name of a grade
                    let newArr = this.state.grades.splice(0);
                    newArr[idx] = {
                      ...newArr[idx],
                      edit: !newArr[idx].edit,
                    };

                    this.setState((prevState) => ({
                      ...this.state,
                      grades: newArr,
                    }));
                  }}
                >Edit</button>
                <input
                  id={idx}
                  name="name"
                  type="text"
                  value={grade.name}
                  onChange={this.handleChange}
                ></input>
                <input
                  id={idx}
                  name="mark"
                  type="text"
                  value={grade.mark}
                  onChange={this.handleChange}
                ></input>
                <input
                  id={idx}
                  name="weight"
                  type="text"
                  value={grade.weight}
                  onChange={this.handleChange}
                ></input>
              </div>
            ) : (
              //If edit is turned off
              <div key={idx}>
                <h2>{grade.name}</h2>
                <p>Score: {grade.mark}</p>
                <p>Weight: {grade.weight}</p>
                <button
                  onClick={() => {
                    //toggle edit button so you can change the mark or name of a grade
                    let newArr = this.state.grades.splice(0);
                    newArr[idx] = {
                      ...newArr[idx],
                      edit: !newArr[idx].edit,
                    };

                    this.setState((prevState) => ({
                      ...this.state,
                      grades: newArr,
                    }));
                  }}
                >Edit</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
