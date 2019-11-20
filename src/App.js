/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './App.css';
import * as axios from 'axios';
import Button from './Component/Button';
import Map from './Component/Map';
import Table from './Component/Table';
import util from './util/util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: null,
      loading: false,
      isListView: true,
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.getMeteorites = this.getMeteorites.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  onChangeValue(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value,
    });
  }

  getMeteorites() {
    this.setState({ loading: true });
    const { input } = this.state;
    let paramObject;
    if (util.isYear(input)) {
      paramObject = {
        year: input,
      };
    } else {
      paramObject = {
        recclass: input,
      };
    }
    axios.get('http://localhost:3001/', { params: paramObject }).then((res) => {
      this.setState({
        data: res.data,
        loading: false,
      });
    }).catch((error) => { console.log('error while requesting to server ', error); });
  }

  toggleView() {
    this.setState((prevState) => ({ isListView: !prevState.isListView }));
  }

  renderMap() {
    let geoJSON = null;
    if (this.state.data != null && this.state.data.length !== 0) {
      // this will extract geoJSON Points of the meteorites data
      geoJSON = util.extractGeoJSON(this.state.data);
      return (
        <Map data={geoJSON} />
      );
    }
    return 'No data to display';
  }

  renderTable() {
    if (this.state.data != null && this.state.data.length !== 0) {
      return (
        <Table data={this.state.data} />
      );
    }
    return 'No data to display';
  }

  render() {
    return (
      <div className="App" style={{ paddingTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="text" placeholder="Enter year or recclass" onChange={(e) => this.onChangeValue(e)} />
          <Button name="Request meoteorite landings" runParentFunction={this.getMeteorites} />
          {this.state.data != null ? this.state.isListView ? <Button name="Display on Open Street Map" runParentFunction={this.toggleView} />
            : <Button name="Display as List" runParentFunction={this.toggleView} /> : null}
        </div>
        {/* render either table or map */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 30 }}>
          {this.state.loading ? <div>Loading...</div> : this.state.data == null ? 'No data to display'
            : this.state.isListView ? this.renderTable() : this.renderMap()}
        </div>
      </div>
    );
  }
}

export default App;
