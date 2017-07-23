import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Collapse, Media, Badge} from 'reactstrap';

class Item extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.colors = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  formatCurrency(value) {    
    return '$ '+value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

	render() {
    const { address, price, image, labels, description, features } = this.props;
    return (
      <tr>
        <td width="70%">
          <h5 onClick={this.toggle}>{address}</h5>
          <Collapse isOpen={this.state.collapse}>
            <Media className="mt-1">
              <Media left middle href="#">
                <Media style={{ width: 330 }} object src={image} alt="" />
                <div style={{ width: 330 }}>
                  { labels.map( (label, i) => <span key={i} ><Badge color={this.colors[Math.floor(Math.random() * this.colors.length)]} pill>{label}</Badge>{' '}</span> ) } 
                </div>
              </Media>
              <Media body style={{ marginLeft: 10 }}>
                <Media heading>
                  { features ? 'Features: '+features : '' }
                </Media>
                {description}
              </Media>
            </Media>
          </Collapse>
        </td>
        <td>
          { this.formatCurrency(price) }
        </td>
      </tr>
    )
	}
}

Item.propTypes = {
  address: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  features: PropTypes.string
}

Item.defaultProps = {
  description: '',
  features: ''
}

export default Item;
