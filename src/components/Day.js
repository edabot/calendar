import React from 'react';
import classNames from 'classnames';

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
                <div className="textarea">
                    <textarea />
                </div>
            </div>
        )
    }
}

export default Day;
