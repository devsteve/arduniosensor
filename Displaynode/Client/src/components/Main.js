import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Moment from 'react-moment';
import * as moment from 'moment';

export class Main extends Component {
  displayName = Main.name


  constructor(props) {
    super(props);
    this.state = { latest: [], all : [], loading: true };
  }
  
  componentDidMount() { 
    let $this = this;
    
    //Todo dry this bit of repetition
    /*
    let fetchit = () => { 
      
      fetch('api/latest')
        .then(response => response.json())
        .then(data => {
          $this.setState({ latest: data, loading: false });
        });
    };
    fetchit();

    fetch('api/count/260')
      .then(response => response.json())
      .then(data => {
        $this.setState({ all: data });
    });
    */
    
    let fetchit = () => { 
    var data = [
      {_id:"5c402dccfcdb2702a3c33dde",
        temp:"24",humidity:"43",created:"Thu Jan 17 2019 07:25:00 GMT+0000 (Coordinated Universal Time)",
        timestamp:"1547709900174",
        __v:0},
        {_id:"5c402c9ffcdb2702a3c33ddd",
        temp:"24",humidity:"43",
        created:"Thu Jan 17 2019 07:19:59 GMT+0000 (Coordinated Universal Time)",
        timestamp:"1547709599500",__v:0},{_id:"5c402b72fcdb2702a3c33ddc",temp:"24",humidity:"42",created:"Thu Jan 17 2019 07:14:58 GMT+0000 (Coordinated Universal Time)",timestamp:"1547709298818",__v:0},{_id:"5c402a46fcdb2702a3c33ddb",temp:"24",humidity:"42",created:"Thu Jan 17 2019 07:09:58 GMT+0000 (Coordinated Universal Time)",timestamp:"1547708998158",__v:0},{_id:"5c402919fcdb2702a3c33dda",temp:"24",humidity:"42",created:"Thu Jan 17 2019 07:04:57 GMT+0000 (Coordinated Universal Time)",timestamp:"1547708697237",__v:0},{_id:"5c4027ecfcdb2702a3c33dd9",temp:"24",humidity:"42",created:"Thu Jan 17 2019 06:59:56 GMT+0000 (Coordinated Universal Time)",timestamp:"1547708396579",__v:0},{_id:"5c4026bffcdb2702a3c33dd8",temp:"24",humidity:"42",created:"Thu Jan 17 2019 06:54:55 GMT+0000 (Coordinated Universal Time)",timestamp:"1547708095924",__v:0},{_id:"5c402593fcdb2702a3c33dd7",temp:"24",humidity:"42",created:"Thu Jan 17 2019 06:49:55 GMT+0000 (Coordinated Universal Time)",timestamp:"1547707795276",__v:0},{_id:"5c402466fcdb2702a3c33dd6",temp:"24",humidity:"42",created:"Thu Jan 17 2019 06:44:54 GMT+0000 (Coordinated Universal Time)",timestamp:"1547707494651",__v:0},{_id:"5c40233afcdb2702a3c33dd5",temp:"24",humidity:"43",created:"Thu Jan 17 2019 06:39:54 GMT+0000 (Coordinated Universal Time)",timestamp:"1547707194052",__v:0}];


      $this.setState({ latest: data, all: data, loading: false });
    };
    fetchit();
    setInterval(() => fetchit,60000); //1 min
  }

  static renderReadingsLatest(readings) {
    let latest = readings.shift();

    return (
      <container>
        <h3>Current</h3>
        <h4>{latest.temp}&deg;c  &nbsp;&nbsp;{latest.humidity}% humidity</h4>
        <strong><Moment fromNow unix>{(latest.timestamp/1000)}</Moment></strong>
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

//    readings.reverse();
console.log(readings);
    return(
      <LineChart width={400} height={300} background-color="#ffffff" data={readings}>
        <CartesianGrid stroke="#ccc" verticalPoints="[]" />
        <XAxis scale={10} />
        <YAxis />
        <Legend />
        <Line type="monotone" stroke="#8884d8" activeDot={false} dot={false}/>
      </LineChart>    
    );
  } 


  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Main.renderReadingsLatest(this.state.latest);

    console.log(this.state);

    let table = Main.renderReadingsTable(this.state.latest); 

    let graph = Main.renderReadingsGraph(this.state.all); 

    return (
      <div>
        <h1>Adeline's Room</h1>
        {contents}

        {graph}

        {table}
      </div>
    );
  }
}



