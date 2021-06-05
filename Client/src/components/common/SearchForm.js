/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from "react";

export default class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: {
        string: "Bạn muốn tìm gì?",
        index: 0,
        direction: 1,
      },
      interval: null,
    };
  }

  componentDidMount() {
    const placeholder = this.props.placeholder.map((item) => `${item}`);
    if (placeholder.length) {
      this.state.interval = setInterval(() => {
        let { string, index, direction } = this.state.placeholder;

        if (!string.length || string.length === placeholder[index].length) {
          direction = -direction;
          if (!string.length) {
            index = (index + 1) % placeholder.length;
          }
        }
        string = placeholder[index].slice(0, string.length + direction);
        this.setState({
          placeholder: {
            string,
            index,
            direction,
          },
        });
      }, 50);
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { placeholder } = this.state;
    return (
      <React.Fragment>
        <form className="input-group search-bar" action="/search" role="search">
          <div className="input-group">
            <input
              type="search"
              name="byname"
              className="input-group-field auto-search"
              maxLength={70}
              id="search"
              placeholder={placeholder.string}
            />
            <span className="input-group-btn">
              <button
                className="btn icon-fallback-text"
                type="submit"
                aria-label="Tìm kiếm"
              >
                <svg
                  viewBox="0 0 451 451"
                  style={{ width: "20px", paddingTop: "5px" }}
                >
                  <g fill="#000">
                    <path
                      d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3
													 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
													 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3
													 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"
                    />
                  </g>
                </svg>
              </button>
            </span>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
