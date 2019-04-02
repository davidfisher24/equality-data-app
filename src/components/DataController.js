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
  clearMap,
} from '../actions';
import { Anchor } from 'antd';
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
  clearMap: () => dispatch(clearMap()),
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

  requestIndexData () {
    this.criteriaSelect.handleEmpty()
    this.categorySelect.handleEmpty()
    this.props.requestData({type:'index'})
  }

  handleClearMap () {
    this.criteriaSelect.handleEmpty()
    this.categorySelect.handleEmpty()
    this.props.clearMap();
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
        <Anchor affix={false} onClick={this.requestIndexData.bind(this)}>
          <Anchor.Link href="#" title="See wbl index" />
        </Anchor>
        <Anchor affix={false} onClick={this.handleClearMap.bind(this)}>
          <Anchor.Link href="#" title="ClearMap" />
        </Anchor>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataController);
