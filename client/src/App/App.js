import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Loader from "react-loader-spinner";

class App extends Component {
  state = {
    isLoading: true,
    error: false,
    data: null
  };

  componentDidMount() {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) return this.props.history.push("/login");

    Axios.get(`${process.env.REACT_APP_API_HOST}/`, {
      headers: { "x-auth-token": access_token }
    })
      .then(({ data }) => {
        this.setState({
          isLoading: false,
          data: data,
          error: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: true,
          data: null
        });
      });
  }

  render() {
    const errorMsg = "Somthing Wrong happend. Try another time.";

    let rendered;

    if (this.state.isLoading) {
      rendered = (
        <Loader type="Puff" color="#00BFFF" height="100" width="100" />
      );
    }
    if (this.state.error) {
      rendered = <p>{errorMsg}</p>;
    }
    if (this.state.data) {
      rendered = <p>{this.state.data.data}</p>;
    }

    return (
      <div className="App">
        <Link to="/logout"><button className="btn btn-warning">Logout</button></Link>
        <header className="App-header">{rendered}</header>
      </div>
    );
  }
}

export default App;
