import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  requestData,
  requestCategories, 
  requestCriteria, 
  selectCategory,
  selectCriteria,
  unselectCategory,
  unselectCriteria,
} from '../actions';

import Select from './Select'

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestData: (obj) => dispatch(requestData(obj)),
  requestCategories: () => dispatch(requestCategories()),
  requestCriteria: (obj) => dispatch(requestCriteria(obj)),
  selectCategory: (val) => dispatch(selectCategory(val)),
  selectCriteria: (val) => dispatch(selectCriteria(val)),
  unselectCategory: () => dispatch(unselectCategory()),
  unselectCriteria: () => dispatch(unselectCriteria()),
})

class DataController extends Component {

  componentWillMount () {
    this.props.requestCategories();
  }

  handleCategoryChange (val) {
    val ? this.props.selectCategory(val) : this.props.unselectCategory();
    this.criteriaSelect.handleEmpty()
    if (val) {
      this.props.requestCriteria({category: val})
      this.props.requestData({
        type: 'categories',
        category: val,
      })
    }
  }

  handleCriteriaChange (val) {
    val ? this.props.selectCriteria(val) : this.props.unselectCriteria();
    if (val) {
      this.props.requestData({
        type: 'criteria',
        criteria: val,
      })
    }
  }

  render() {
    return (
      <div id="dataController">
        <Select 
          placeholder="Select Category"
          options={this.props.category.data} 
          onChange={this.handleCategoryChange.bind(this)}
          onRef={ref => (this.categorySelect = ref)}
        />
        <Select 
          placeholder="Select Question"
          options={this.props.criteria.data} 
          onChange={this.handleCriteriaChange.bind(this)}
          onRef={ref => (this.criteriaSelect = ref)}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataController);
