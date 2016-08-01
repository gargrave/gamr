import React, {PropTypes} from 'react';


class GameDatesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      toggleText: "Show",
      showTable: false
    };

    this.toggleEditor = this.toggleEditor.bind(this);
  }

  toggleEditor() {
    this.setState({
      toggleText: this.state.showTable ? "Show" : "Hide",
      showTable: !this.state.showTable
    });
  }

  render() {
    const {dates} = this.props;
    const {toggleText, showTable} = this.state;

    return (
      <div>
        <strong>Dates <small>({dates.length} existing, 0 new) </small></strong>
        <span
          className="button success"
          onClick={this.toggleEditor}>{toggleText}</span>

        {showTable &&
          <section>
            <table>
              <tbody>
                {dates.map((d, i) =>
                  <tr key={i}>
                    <td>{d}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        }
      </div>
    );
  }
}

GameDatesList.propTypes = {
  dates: PropTypes.array.isRequired
};

export default GameDatesList;
