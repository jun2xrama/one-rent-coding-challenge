import React, { Component } from 'react';
import {InputGroup, InputGroupAddon, Input, InputGroupButton, Button} from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const search = e.target.value;
    this.props.searchFunc(search);
    this.setState({
      search: search
    });
  }

	render() {
    return (
      <div>
        <InputGroup>
          <InputGroupAddon>Search</InputGroupAddon>
          <Input placeholder="Keywords" value={this.state.search} onChange={this.handleChange} />
          <InputGroupButton><Button color="secondary"><MdSearch /></Button></InputGroupButton>
        </InputGroup>
      </div>
    )
	}
}

Search.propTypes = {
  searchFunc: PropTypes.func.isRequired
}

export default Search;
