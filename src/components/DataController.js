import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  requestCategories, 
  selectCategory, 
  selectYear, 
  unselectCategory, 
  unselectYear 
} from '../actions';

import Select from './Select'

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestCategories: () => dispatch(requestCategories()),
  selectCategory: (val) => dispatch(selectCategory(val)),
  selectYear: (val) => dispatch(selectYear(val)),
  unselectCategory: () => dispatch(unselectCategory()),
  unselectYear: () => dispatch(unselectYear())
})

class DataController extends Component {

  componentWillMount () {
    this.props.requestCategories();
  }

  handleCategoryChange (val) {
    val ? this.props.selectCategory(val) : this.props.unselectCategory();
  }

  handleYearChange (val) {
    val ? this.props.selectYear(val) :  this.props.unselectYear();
  }

  render() {
    return (
      <div id="dataController">
        <Select 
          options={this.props.category.data} 
          onChange={this.handleCategoryChange.bind(this)}
        />
        <Select 
          options={this.props.year.data} 
          onChange={this.handleYearChange.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataController);
