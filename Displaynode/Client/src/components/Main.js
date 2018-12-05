import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Moment from 'react-moment';

export class Main extends Component {
  displayName = Main.name


  constructor(props) {
    super(props);
    this.state = { readings: [], loading: true };
    let $this = this;
    
    //Todo dry this bit of repetition
    let fetchit = () => { 
      fetch('api/all')
        .then(response => response.json())
        .then(data => {
          $this.setState({ readings: data, loading: false });
        });
      };
    fetchit();
    setInterval(() => fetchit,60000); //1 min
  }

  static renderReadingsTable(readings) {
    let latest = readings.shift();

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
              <Moment toNow unix>{(latest.timestamp/1000)}</Moment>
            </tr>
        </tbody>
      </table>

      <LineChart width={600} height={300} data={readings}>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis />
        <YAxis />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{r: 8}}/>
      </LineChart>
        
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
                <Moment parse="YYYY-MM-DD HH:mm" unix>{(reading.timestamp/1000)}</Moment>
              </tr>
            )}
          </tbody>
        </table>
      </container>  
    );
  }

  static renderReadingsGraph(readings) {

    
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



