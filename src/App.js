import React, { Component } from 'react';
import './App.css';
import moment from 'moment-timezone';
import classNames from 'classnames';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
          now: moment(),
          weeks: [],
          dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          weekStart: "Sun",
          weekCount: 4
      };
    }

    componentDidMount() {
        this.setWeeks(4);
    }

    setWeeks(weeks) {
        var tempDays = [],
            tempWeeks = [];
        for ( let i=0; i < weeks * 7; i++ ) {
            tempDays[i] = moment().startOf('week').add( i, 'days')
        }
        for ( let i=0; i < weeks; i++ ) {
            tempWeeks[i] = tempDays.slice(i * 7, i * 7 + 7);
        }
        this.setState( { weeks: tempWeeks } );
    }

  render() {
    return (
      <div className="App">
        <div className="calendar">
          { this.state.weeks.map(week => {
                return <Week key={week[0].date()}
                             week={week}/>;
            }) }
        </div>
      </div>
    );
  }
}

class Week extends React.Component {
  render() {
    return (
      <div className="week">
          { this.props.week.map(day => {
                return <Day key={day.date()}
                             day={day}/>;
            }) }
      </div>
    );
  }
}

class Day extends React.Component {
    render() {
      var dayOfWeek = this.props.day.format("dd"),
          weekend = false;
      if ( dayOfWeek === "Sa" || dayOfWeek === "Su" ) {
        weekend = true
      }
      var classes = classNames({
          'day': true,
          'weekend': weekend
      });
        return (
            <div className={ classes }>
                <div className="date">
                    { this.props.day.format("D") }
                </div>
            </div>
        )
    }
}

export default App;
