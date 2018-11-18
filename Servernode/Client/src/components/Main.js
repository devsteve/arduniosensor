import React, { Component } from 'react';

export class Main extends Component {
  displayName = Main.name


  constructor(props) {
    super(props);
    this.state = { readings: [], loading: true };

    fetch('api/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ readings: data, loading: false });
      });
  }

  static renderReadingsTable(readings) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Temp. (C)</th>
            <th>Humidity. (%)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {readings.map(reading =>
            <tr key={reading.temp}>
              <td>{reading.temp}</td>
              <td>{reading.humidity}</td>
              <td>{reading.time}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Main.renderReadingsTable(this.state.readings);

    return (
      <div>
        <h1>Current</h1>
        {contents}
      </div>
    );
  }
}



