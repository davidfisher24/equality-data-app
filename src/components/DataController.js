import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  requestCategories, 
  selectCategory,
} from '../actions';

import Select from './Select'

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestCategories: () => dispatch(requestCategories()),
  selectCategory: (val) => dispatch(selectCategory(val)),
})

class DataController extends Component {

  componentWillMount () {
    this.props.requestCategories();
  }

  handleCategoryChange (val) {
    val ? this.props.selectCategory(val) : this.props.unselectCategory();
  }

  render() {
    return (
      <div id="dataController">
        <Select 
          options={this.props.category.data} 
          onChange={this.handleCategoryChange.bind(this)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataController);
