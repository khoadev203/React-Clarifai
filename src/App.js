import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Rank from "./Components/Rank/Rank";
import "./App.css";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  // apiKey: "5860a94cb6304564a5add95d829d041f",
  apiKey: "2cee6da8d2da4162aa5b81335be95db0"
});

const particlesOption = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 300,
      },
    },
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      loading: false,
      name: "",
    };
  }

  //This function calculates the FaceDetect location of the image
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  //To show the face-detect box on the state values:
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input, loading: true, box: {} })

    app.models
      // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .predict("e466caa0619f444ab97497640cefc4dc", this.state.input)
      // https://akns-images.eonline.com/eol_images/Entire_Site/202169/rs_1200x1200-210709093048-1200-Hugh-Laurie-LT-7921-GettyImages-620173150.jpg
      .then((response) => {
        let data = response.outputs[0].data.regions[0].data.concepts[0];
        this.displayFaceBox(this.calculateFaceLocation(response));
        this.setState({ loading: false, name: data.name}, ()=> {
          alert("its " + data.name + " with probablity " + data.value.toFixed(2));
        })     
      })
      .catch((err) => {
        this.setState({ loading: false }, () => {
          alert("error: " + err);
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          loading={this.state.loading}
        />

        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} name={this.state.name} />
      </div>
    );
  }
}

export default App;
