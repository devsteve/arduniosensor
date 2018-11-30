import React, { Component } from 'react';

export class Main extends Component {
  displayName = Main.name


  constructor(props) {
    super(props);
    this.state = { readings: [], loading: true };
    let $this = this;
    setInterval(() => { 
      fetch('api/all')
        .then(response => response.json())
        .then(data => {
          $this.setState({ readings: data, loading: false });
        });
      },2000);
  }

  static renderReadingsTable(readings) {
    let latest = readings.shift();

    let dateOptions = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
      timeZone: 'Australia/Melbourne'
    };

    return (
      <container>
        <h3>Current</h3>

        <table className='table'>
        <thead>
          <tr>
            <th>Temp. (C)</th>
            <th>Humidity. (%)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
            <tr key={latest.temp}>
              <td>{latest.temp}</td>
              <td>{latest.humidity}</td>
              <td>{latest.created}</td>
            </tr>
        </tbody>
      </table>
        
      <h3>Recent</h3>
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
                <td>{reading.created}</td>
              </tr>
            )}
          </tbody>
        </table>
      </container>  
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Main.renderReadingsTable(this.state.readings);

    return (
      <div>
        <h1>Adeline's Room</h1>
        {contents}
      </div>
    );
  }
}



