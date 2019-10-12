import React, { Component } from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import BrowseHome from "../../components/browser/Home.js";

const util = require('util')

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Home extends Component  {
  render() {
    return (
      <BrowseHome
        tableHeaderColor="primary"
        tableHead={["", "Name", "Last Changed", "Size (Kbs)"]}
        tableData={[]}
        files={[]}
        params={this.props.match.params}
      />
    );
  }
}

export default Home;