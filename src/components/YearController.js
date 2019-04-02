import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  requestData,
  selectYear, 
  requestYears, 
} from '../actions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

const mapStateToProps = state => ({
 ...state
})
const mapDispatchToProps = dispatch => ({
  requestData: (obj) => dispatch(requestData(obj)),
  requestYears: (val) => dispatch(requestYears()),
  selectYear: (val) => dispatch(selectYear(val)),
})

class YearController extends Component {

  componentWillMount () {
    this.props.requestYears();
  }

  handleYearChange (val) {
    this.props.selectYear(this.props.year.data[val].year)
    if (this.props.map.displayed === 'coropleth') this.props.requestData({
      type: 'categories',
      category: this.props.category.selected,
    })

    if (this.props.map.displayed === 'boolean') this.props.requestData({
      type: 'criteria',
      criteria: this.props.criteria.selected,
    })
  }

  render() {
    return (
      <Tabs 
        id="yearController"
        fixed={true.toString()}
        defaultIndex={
          this.props.year.data.map(x => x.year).indexOf(this.props.year.selected)
        }
        onSelect={this.handleYearChange.bind(this)} 
      >
        <TabList>
          {this.props.year.data.map((year,i) => {
            return (
              <Tab 
                key={i} 
                label='{year.year}'>
                <small>
                  {year.year}
                </small>
              </Tab>
            )
          })}
        </TabList>
        {this.props.year.data.map((year,i) => {
          return (
            <TabPanel key={i}/>
          )
        })}
      </Tabs>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YearController);
