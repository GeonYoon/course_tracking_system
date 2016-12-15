import React from 'react';
import {hideElement} from '../server';

export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errors: ""
    };

    window.FaucetError = (errorText) => {
      this.setState({
        active: true,
        error: errorText
      })
    };
  }

  render() {
    return (
      <div className={"alert alert-warning " + hideElement(!this.state.active)} role="alert">
        Faucet was unable to complete a recent request: {this.state.error}<br />
        Please <a onClick={() => window.location.reload()}>refresh the web page</a> and try again.
      </div>
    );
  }
}
