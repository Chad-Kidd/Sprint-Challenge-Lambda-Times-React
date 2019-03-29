import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from './Tabs';
import Cards from './Cards';

// Importing our tab and card data. No need to change anything here.
import { tabData, cardData } from '../../data';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'all',
      tabs: [],
      //holds array of tabs from tabData in data.js
      cards: []
      //holds array of cards from cardData in data.js
      // changed data to setState in componentDidMount()
    };
  }

  componentDidMount() {
    // Once the component has mounted, get the data and reflect that data on the state.
    this.setState({
      tabs: tabData,
      cards: cardData
    });
  }

  changeSelected = tab => {
    // this function should take in the tab and update the state with the new tab.
    return () => (
      this.setState ({
        selected: tab
        // just selected maybe?
      }
    ))
  };

  filterCards = () => {
    /* Right now this function only returns the cards on state.
      We're going to make this function more dynamic
      by using it to filter out our cards for when a tab is selcted
      
      Notice that we're passing this function to our <Cards /> component below.
      This function returns an array of cards, so we can just pass it down as such.

      Your algorithim for the logic here is as follows: 
        - if the selected tab is 'all' it should return all 
          of the items from cardData. 
        - else, it should only return those cards whose 'tab' matched this.state.selected.
    */
    if (this.state.selected === 'all') {
      // had this.state.cards instead of this.state.selected should've used 20 minute rule
      return this.state.cards;
      // if the selected tab is 'all' it should return all 
      // of the items from cardData
    } else {
      return this.state.cards.filter(card => card.tab === this.state.selected)
      
    }
     // else, it should only return those cards whose 'tab' matched this.state.selected
    // return filterCards();
    // invoke function
    // filterCards() invoked below in <Cards cards={this.filterCards()} />
    
    // terenary?
    // (this.state.selected === 'all') ? this.state.cards: this.state.cards.filter(cards => cards.tab === this.state.selected)
   
  };

  render() {
    return (
      <div className="content-container">
        {/* 
          Add 2 props to the Tabs component, 
          `selectedTab` that includes the currently selected tab
          and `selectTabHandler` that includes the function to change the selected tab
        */}
        <Tabs 
        tabs={this.state.tabs} 
        selectedTab={this.state.selectedTab}
        selectTabHandler={this.changeSelected}
        // selectTabHandler uses changeSelected function in this content.js file
        //come back to input function name that handles changes to selectedTab
        />
        <Cards cards={this.filterCards()} />
      </div>
    );
  }
}
