import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var pages = {
  start: {
    content: "What's your name?",
    input: {
      type: "text",
      saveKey: "name"
    },
    label1: "Next",
    page1: "room"
  },
  room: {
    content: (
      <div class="text">
        <p>"I knew there was something wrong with me."</p>
        <p>
          Your gaze swivels around this room. All you can see is white and
          white. A pungent bleach smell wafts from the bedding, and the bed rail
          moans while you slightly move.
        </p>
        <p>
          This is a room of lifelessness. The only decoration is the mirror on
          the wall.
        </p>
        You remember your name is
      </div>
    ),
    label1: "Look at the mirror",
    label2: "Go to canteen for lunch",
    label3: "Take a nap",
    page1: "mirror",
    page2: "canteen",
    page3: "nap",
    keyvalue: "name"
  },
  mirror: {
    content: [
      <p>
        You look in the mirror; a woman with several bold spots on her head.
      </p>,
      <p>
        You look at yourself in the mirror and poke your face. The spot you
        poked turns into a bruise gradually.
      </p>,
      <p>
        You are a DNA pathologist but you are diagnosed as a carrier of the
        disease Token. Your fiance suggested you to come here, the City
        Hospital, for better treatment.
      </p>,
      <p> You feel a little bit hungry so you go to canteen for lunch</p>
    ],
    label1: "Check out the token",
    label2: "Have lunch",
    page1: "token",
    page2: "lunch"
  },

  canteen: {
    content: (
      <div>
        <p>
          You go to the canteen. All the patients in this hospital come together
          in the canteen.
        </p>
        <p>You line up infront of a window and get your meal with two pills </p>

        <p>You are going to... </p>
      </div>
    ),

    label1: "take the pills",
    page1: "pills",
    label2: "discard the pills",
    page2: "discard"
  },

  fallasleep: {
    content: "3 hours later"
  }
};

class Page extends Component {
  render() {
    var pageData = pages[this.props.pageName];
    if (!pageData) {
      throw new Error("Eek! No page here!");
    }

    var goToPage = this.props.goToPage;
    var saveUserData = this.props.saveUserData;

    function goToPage1() {
      goToPage(pageData.page1);
    }
    function goToPage2() {
      goToPage(pageData.page2);
    }
    function handleChange(event) {
      saveUserData(pageData.input.saveKey, event.target.value);
    }

    var image = "";
    if (pageData.image) {
      image = (
        <div>
          <img className="main-page-image" src={pageData.image} />
        </div>
      );
    }
    var button1 = "";
    if (pageData.page1) {
      button1 = <button onClick={goToPage1}>{pageData.label1}</button>;
    }
    var button2 = "";
    if (pageData.page2) {
      button2 = <button onClick={goToPage2}>{pageData.label2}</button>;
    }
    var keyvalue = "";
    if (pageData.keyvalue) {
      keyvalue = this.props.userData[pageData.keyvalue];
    }

    var input = "";
    if (pageData.input) {
      var inputData = pageData.input;
      if (inputData.type == "select") {
        input = (
          <p>
            <select
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            >
              {inputData.values.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </p>
        );
      } else if (inputData.type == "text") {
        input = (
          <p>
            <input
              type="text"
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            />
          </p>
        );
      }
    }

    return (
      <div>
        <p>
          {pageData.content}
          {keyvalue}
        </p>
        {input}
        {image}
        {button1}
        {button2}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start",
      userData: {}
    };

    this.goToPage = this.goToPage.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }

  saveUserData(key, value) {
    function updateState(state) {
      var newState = { userData: { ...state.userData, [key]: value } };
      return newState;
    }
    this.setState(updateState);
  }

  render() {
    return (
      <div className="App">
        <Page
          pageName={this.state.page}
          goToPage={this.goToPage}
          userData={this.state.userData}
          saveUserData={this.saveUserData}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
