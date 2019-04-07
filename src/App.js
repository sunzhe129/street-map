import React, { Component } from 'react'
import ListStations from './ListStations'
import Map from './Map'
import './App.css'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {
  interestedStations = [
      {title: 'Jindiwei Future', location: {lat: 31.306923, lng: 121.587774}},
      {title: 'Fanjin Kindergarten', location: {lat: 31.308273, lng: 121.585044}},
      {title: 'The Primary School Attached to Shanghai No. 6 Normal School', location: {lat: 31.309344, lng: 121.587654}},
      {title: 'Shanghai Golf Training Center', location: {lat: 31.310835, lng: 121.591478}},
      {title: 'Shanghai Rugby Football Club', location: {lat: 31.307240, lng: 121.591531}},
      {title: 'Sunshine City', location: {lat: 31.312018, lng: 121.588307}}
  ]
  state = {
    filteredStations: this.interestedStations,
    query: ''
  }

  filterStations = (query) => {
    let trimmedQuery = query.trim()
    if (trimmedQuery && trimmedQuery.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i')
      let matchedStations = this.interestedStations.filter((station) => match.test(station.title))
      this.setState({
        filteredStations: matchedStations,
        query: query
      })
    }
    else {
      this.setState({
        filteredStations: this.interestedStations,
        query: ''
      })
    }
  }

  render() {
    return (
      <div className="container">
        <ListStations
          filteredStations={this.state.filteredStations}
          query={this.state.query}
          onFilterStations={(query) => {
            this.filterStations(query)
          }}
        />
        <div className="map-box">
          <div className="header-bar">
            <button type="button" id="menu" aria-label="Menu">
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
          <Map
            filteredStations={this.state.filteredStations}
            onFilterStations={(query) => {
              this.filterStations(query)
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;