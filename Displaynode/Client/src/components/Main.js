import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Moment from 'react-moment';
import * as moment from 'moment';

export class Main extends Component {
  displayName = Main.name


  constructor(props) {
    super(props);
    this.state = { latest: [], recent: [], all : [], loading: true };
  }
  
  componentDidMount() { 
    let $this = this;
    let fetchit = () => { 

      fetch('api/latest')
        .then(response => response.json())
        .then(data => {
          $this.setState({ latest: data});
        });

        fetch('api/count/96')
          .then(response => response.json())
          .then(data => {
          $this.setState({ recent: data });
        });

        fetch('api/count/1040')
          .then(response => response.json())
          .then(data => {
            $this.setState({ all: data, loading: false });
        });
    };
    fetchit();
    setInterval(fetchit,12000); 
  }

  static renderReadingsLatest(readings) {
    let latest = readings.shift();

    return (
      <container>
        <h3>Current {latest.temp}&deg;c</h3>
        <h4><small>{latest.humidity}% humidity</small></h4>
        <strong>Updated <Moment fromNow unix>{(latest.timestamp/1000)}</Moment></strong>
      </container>  
    );
  }

  static renderReadingsTable(readings) {
    return (
      <container>
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
                <Moment format="Do MMM - h:mma" unix>{(reading.timestamp/1000)}</Moment>
              </tr>
            )}
          </tbody>
        </table>
      </container>    
    );
  }

  static renderReadingsGraph(readings) {
    
    readings.forEach(element => {
       element.timestamp = moment(element.timestamp,'x').format('h:mma'); // December 6th 2018, 6:35:32 pm
    });

    readings.reverse();
    return(
      <LineChart width={400} height={300} background-color="#ffffff" data={readings}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis  dataKey="timestamp"/>
        <YAxis  dataKey="temp" />
        <Legend />
        <Line type="monotone" stroke="#8884d8" dataKey="temp" activeDot={false} dot={false}/>
      </LineChart>    
    );
  } 


  render() {
    let contents = <p><em>Loading...</em></p>;
    let table,recentgraph,allgraph = null;


    let displayResults = () => { 
      contents = Main.renderReadingsLatest(this.state.latest);
      table = Main.renderReadingsTable(this.state.latest); 
      recentgraph = Main.renderReadingsGraph(this.state.recent); 
      allgraph = Main.renderReadingsGraph(this.state.all); 
    };
    
    if(!this.state.loading) { 
      displayResults();
    }  
      

    

    return (
      <div>
        <h1>Adeline's Room</h1>
        {contents}

        <h4>Recent</h4>
        {recentgraph}

        <h4>3 Day</h4>
        {allgraph}

        {table}
      </div>
    );
  }
}



