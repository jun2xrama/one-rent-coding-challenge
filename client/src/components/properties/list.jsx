import React, { Component } from 'react';
import {Table} from 'reactstrap';
import Search from './search';
import Item from './item';
import Properties from '../../stores/properties';
import {Container, Row, Col} from 'reactstrap';
import Loader from 'react-loader';

class List extends Component {
  constructor() {
    super();
    this.state = {
      properties: [],
      displayed_properties: [],
      loaded: false
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  componentWillMount() {
    Properties.load(response => {
      this.setState({
        properties: response,
        displayed_properties: response,
        loaded: true
      });
    });
  }

  handleFilter(search) {

    let search_count = 0;
    let search_parts = [];
    search = search.trim();

    if (search) {
      search_parts = search.split(' ');
      search_count = search_parts.length;      
    }

    let displayed_properties = this.state.properties;

    if (this.state.properties.length && search_count) {
      displayed_properties = this.state.properties.filter( property => {        
        for(let i=0; i < search_count; ++i) {
          if (!property.defaultImage) {
            break;
          }
          if (property.defaultImage.labels.hasOwnProperty(search_parts[i])) {
            return true;            
          }
        }
        return false;
      });    
    }

    this.setState({      
      displayed_properties: displayed_properties
    });  
  }

	render() {
		return (
      <Container style={{ minHeight: 600 }}>
        <Loader loaded={this.state.loaded}>
          <br />
          <Row>
            <Col>
              <Search searchFunc={this.handleFilter} />
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.displayed_properties.length} properties found.
            </Col>
          </Row>
          <Row>
            <Col>
        			<Table hover>
        				<thead>
        					<tr>
        						<th>Property Address</th>
        						<th>Rent Price</th>
        					</tr>
        				</thead>
        				<tbody>
                { this.state.displayed_properties.map(
                    (property, i) => 
                      <Item 
                        key={ property.id } 
                        index={ property.id } 
                        address={ property.address } 
                        price={ property.targetRent } 
                        image={ property.defaultImage ? 
                          property.defaultImage.medium : 
                          'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox%3D"0 0 200 150"%2F%3E'
                        }
                        labels={ property.defaultImage ? 
                          Object.keys(property.defaultImage.labels) : []
                        }
                        description={ property.description }
                        features={ property.interiorFeatures }
                      />
                ) }
        				</tbody>
        			</Table>
            </Col>
          </Row>
        </Loader>
      </Container>
		);
	}
}

export default List;