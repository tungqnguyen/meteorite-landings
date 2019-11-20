/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import './css/Table.css'

class Table extends Component {
  constructor(props) {
    super(props);
    this.renderTableData = this.renderTableData.bind(this);
    this.sortByMass = this.sortByMass.bind(this);
    this.state = {
      meteorList : this.props.data
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ meteorList: nextProps.data });  
  }
  renderTableData() {
    return this.state.meteorList.map(el => {
      const {id, name, mass= null, recclass=null} = el;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{mass}</td>
          <td>{recclass}</td>
        </tr>
      )
    })
  }
  sortByMass() {
    const sorted = this.state.meteorList.sort((a,b) => {
      const {mass: massA = null} = a;
      const {mass: massB = null} = b;
      if(massA== null) {
        return -1;
      } 
      else if (massB == null) {
        return 1;
      }
      return massA - massB;
    })
    this.setState({ meteorList: sorted })
  }
  render () {
  return (
    <div className="container">
      <table>
      <thead>
        <tr>
          <th scope="col"><a href="#">Name</a></th>
          <th scope="col"><a href="#" className="sort-by" onClick={() => this.sortByMass()}>Mass</a></th>
          <th scope="col"><a href="#">Recclass</a></th>
        </tr>
      </thead>
        <tbody>
          {this.renderTableData()}
        </tbody>
      </table>
    </div>
  )
  }
}
export default Table;
