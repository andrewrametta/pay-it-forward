import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-container">
          <h1 className="error-message">Hmm...there seems to be an error</h1>
          <img
            className="error-img"
            src="https://miro.medium.com/max/3840/1*TDxetqk2qx0AfAqbBTVvFg.jpeg"
            alt="error"
          ></img>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
