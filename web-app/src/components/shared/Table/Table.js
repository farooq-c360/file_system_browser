import React, { useEffect } from "react";
import Moment from 'react-moment';
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Icon from "@material-ui/core/Icon";
import { connect } from 'react-redux';
import {ListAllFiles, ClearState} from '../../../actions/browser.js';
import { bindActionCreators } from 'redux';

// core components
import styles from "../../../assets/jss/material-dashboard-react/components/tableStyle.js";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(styles);

function CustomTable(props) {
  useEffect(() => {
    props.ListAllFiles('/Users');
    return () => {
       props.ClearState();
    }
  }, [])

  function rowClickHandler(folder)
  {
    props.ListAllFiles(folder);
  }

  const classes = useStyles();
  const { tableHead, tableHeaderColor, files } = props;
  let iconType = null;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {
            files.files && files.files.length > 0 ? (files.files.map((prop, key) => {
              let rowProp = prop.Name;
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  {
                    Object.entries(prop).map((prop, key) => {
                      return (
                        prop[0] !== 'Name' ?  
                        (<TableCell className={classes.tableCell} key={key}>
                        {
                          (prop[0] === "Icon" ? 
                            (prop[1] === "folder") ? 
                              (<Link onClick={() => rowClickHandler(rowProp)}><Icon className="material-icons-outlined">{prop[1]}</Icon></Link>) :
                              (<Icon className="material-icons-outlined">{prop[1]}</Icon>) :
                            (prop[0] == "LastChanged") ? 
                              (<Moment fromNow>{prop[1]}</Moment>) :
                            (prop[1])
                          )
                        }
                        </TableCell>) : ('')
                      );
                    })
                  }
                </TableRow>
              );
            })) : null 
          }
        </TableBody>
      </Table>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    files: state.files
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {ListAllFiles, ClearState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable);

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
