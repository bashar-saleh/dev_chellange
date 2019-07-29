import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import "./Login.css";
import Axios from "axios";

class Login extends Component {
  state = {
    isLoading: false,
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(38)
      .required()
      .label("Password")
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: true
    });
    if (!result.error) return false;

    let errors = {};

    console.log(result.error.details);

    result.error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });

    console.log(result);

    return Object.keys(errors).length > 0 ? errors : null;
  };

  login = () => {
    this.setState({
      ...this.state,
      isLoading: true
    });

    Axios.post(`${process.env.REACT_APP_API_HOST}/login`, {
      username: this.state.account.username,
      password: this.state.account.password
    })
      .then(data => {
        if (data.status === 200) {
          this.storeJwt(data.data["access_token"]);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        if (err.response.status === 400)
          return this.showErrorMsgs(err.response.data.errors);
      });
  };

  storeJwt = access_token => {
    localStorage.setItem("access_token", access_token);
  };

  showErrorMsgs = errors => {
    const errorsKeys = Object.keys(errors);
    if (errorsKeys.find(key => key === "msg")) {
      this.setState({
        ...this.state,
        isLoading: false,
        errors: {
          msg: errors["msg"]
        }
      });
    } else {
      const errorsMsgs = {};
      errors.forEach(errObj => {
        const key = Object.keys(errObj)[0];
        errorsMsgs[key] = errObj[key];
      });

      this.setState({
        ...this.state,
        isLoading: false,
        errors: errorsMsgs
      });
    }
  };

  submitHandler = event => {
    event.preventDefault();

    const errors = this.validate();

    if (errors) return this.setState({ ...this.state, errors });

    console.log("Submitted");
    this.login();
  };

  usernameHandler = event => {
    this.setState({
      ...this.state,
      account: {
        ...this.state.account,
        username: event.target.value
      }
    });
  };

  passwordHandler = event => {
    this.setState({
      ...this.state,
      account: {
        ...this.state.account,
        password: event.target.value
      }
    });
  };

  render() {
    return (
      <div className="login">
        <form onSubmit={this.submitHandler}>
          <h2>Login</h2>

          {this.state.errors && this.state.errors["msg"] ? (
            <div className="alert alert-danger">{this.state.errors["msg"]}</div>
          ) : null}

          <input
            placeholder="Username..."
            className="form-control"
            type="text"
            value={this.state.username}
            onChange={this.usernameHandler}
          />

          {this.state.errors && this.state.errors["username"] ? (
            <div className="alert alert-danger">
              {this.state.errors["username"]}
            </div>
          ) : null}

          <input
            placeholder="Password..."
            className="form-control"
            type="password"
            value={this.state.password}
            onChange={this.passwordHandler}
          />

          {this.state.errors && this.state.errors["password"] ? (
            <div className="alert alert-danger">
              {this.state.errors["password"]}
            </div>
          ) : null}

          <button
            className="btn btn-danger"
            type="submit"
            disabled={this.state.isLoading ? true : false}
          >
            Login
          </button>
        </form>
        <span className="sign-up-note">
          Not a member ?{" "}
          <b>
            <Link to="/sign-up">SignUp</Link>
          </b>
        </span>
      </div>
    );
  }
}

export default Login;
