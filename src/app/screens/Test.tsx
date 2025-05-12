// @ts-nocheck
import React,{ Component } from "react";

class Test extends React.Component {
    constructor(props: {} | Readonly<{}>) {
      super(props);
      this.state = {
        brand: "Ford", //state property
        model: "Mustang",
        color: "red",
        year: 1964
      };
    }
    changeDetail = () => {
      this.setState({color: "blue", brand: "tesla",});
    }

    componentDidMount() {
        console.log("componentDidMount");
        // runs after first render => Retreive data from beckend server
    }

    componentWillUnmount() {
        console.log("componenentDidUnmount");
    }

    componentDidUpdate() {}

    
    render() {
      return (
        <div>
          <h1>My {this.state.brand}</h1>
          <p>
            It is a {this.state.color}
            {this.state.model}
            from {this.state.year}.
          </p>
          <button
            type="button"
            onClick={this.changeDetail}
          >Change Detail</button>
        </div>
      );
    }
  }

  export default Test;