import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    borderRadius: 5,
  },
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        onClick={this.props.action}
      >
        <Tab label="Feed" value="a" />
        <Tab label="Calendar" value="b" />
        <Tab label="Directory" value="c" />
      </Tabs>
    );
  }
}
