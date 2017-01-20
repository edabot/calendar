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
        this.setWeeks(this.state.weekCount);
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

    dayNames() {
        return (
          <div className="day-names">
            {this.state.dayNames.map(day => {
                return (
                  <div key={day} className="day-name">
                    { day }
                  </div>
                )
                ;
            })}
          </div>
        )
    }

    moveWeek(e) {
      this.state.weeks.forEach(week => {
        week.forEach(day => {
          day.add(e.target.value, 'week');
        })
      })

      this.setState({ weeks: this.state.weeks })
    }

    numWeeks(e) {
      debugger
      var newWeekCount = this.state.weekCount + Number(e.target.value)
      if ( newWeekCount < 2 ) { newWeekCount = 2 ;}
      if ( newWeekCount > 8 ) { newWeekCount = 8 ;}
      this.setWeeks(newWeekCount);
      this.setState({weekCount: newWeekCount});
    }

    showWeeks(){
      if (this.state.weeks[0]) {
        return(
          <div className="calendar">
            <Week key={this.state.weeks[0][0].dayOfYear()}
                  week={this.state.weeks[0]}
                  firstWeek={1}/>
            { this.state.weeks.slice(1).map(week => {
                  return <Week key={week[0].dayOfYear()}
                               week={week}/>;
              }) }
          </div>
        )
      }
    }

    monthRange() {
      var firstText, lastText, text;
      if ( this.state.weeks[0] ) {
        firstText = this.state.weeks[0][0].format("MMM YYYY");
        lastText = this.state.weeks[this.state.weekCount - 1][6].format("MMM YYYY");
      }

      if ( firstText === lastText ) {
        text = firstText
      } else {
        text = firstText + " - " + lastText
      }

      return (
        <div className="month-range">
          { text }
        </div>

      )
    }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button onClick={ this.moveWeek.bind(this) } value="-1">back 1 week</button>
          <button onClick={ this.moveWeek.bind(this) } value="1">forward 1 week</button>
          <button onClick={ this.numWeeks.bind(this) } value="-1">1 less week</button>
          <button onClick={ this.numWeeks.bind(this) } value="1">1 more week</button>
        </div>
        <div className="rotator">
          <div className="container">
              { this.monthRange() }
                { this.dayNames() }
                { this.showWeeks() }
            </div>
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
                             day={day}
                             firstWeek={ this.props.firstWeek }/>;
            }) }
      </div>
    );
  }
}

class Day extends React.Component {
    render() {
      var dayOfWeek = this.props.day.format("dd"),
          weekend = false,
          firstWeek = false,
          firstDay = false;
      if ( dayOfWeek === "Sa" || dayOfWeek === "Su" ) {
        weekend = true
      }
      if ( this.props.day.date() < 8 && !this.props.firstWeek) { firstWeek = true; }
      if ( this.props.day.date() === 1 && this.props.day.format("d") !== "0" ) { firstDay = true; }
      var classes = classNames({
          'day': true,
          'weekend': weekend,
          'first-week': firstWeek,
          'first-day': firstDay
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
