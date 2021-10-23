class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
    };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }
    console.log("this is working")

    return (
      <div>
        <h1>H</h1>
        <h1>H</h1>
        <h1>H</h1>
        <h1>H</h1>
      </div>
    );
  }
}

const domContainer = document.querySelector("#app_container");
ReactDOM.render(LikeButton, domContainer);
