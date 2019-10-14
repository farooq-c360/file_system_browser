import React, { Component } from 'react';
// core components
import BrowseHome from '../../components/browser/Home.js';


class Home extends Component  {
  render() {
    return (
      <BrowseHome
          tableHeaderColor='primary'
          tableHead={['', 'Name', 'Last Changed', 'Size (Kbs)']}
          tableData={[]}
          files={[]}
          params={this.props.match.params}
      />
    );
  }
}

export default Home;