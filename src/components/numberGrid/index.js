import React from 'react';

const GRID_LENGTH = 144;

class NumberGrid extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { current: '' };
    this.onClick = this.onClick.bind(this);
    this.isMultiple = this.isMultiple.bind(this);
  }
  onClick(value) {
    this.setState({ current: value })
  }

  isMultiple(value) {
    return value % this.state.current === 0 ? true : false;
  }

  render() {
    return (
      <div className='container'>
        <h1> Select a number</h1>
        <div className='grid'>
          {
            [...Array(GRID_LENGTH)].map((a, index) => (
              <div className={`col ${this.isMultiple(index + 1) ? "active" : ""}`} key={index}>
                <button onClick={() => this.onClick(index + 1)}>
                  {index + 1}
                </button>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

export default NumberGrid;