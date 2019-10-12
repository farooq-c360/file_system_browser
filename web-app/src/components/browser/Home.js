import React, { useEffect, useState } from "react";
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
import Stars from "@material-ui/icons/Stars";
import Add from "@material-ui/icons/Add";
import GridItem from "../shared/Grid/GridItem.js";
import GridContainer from "../shared/Grid/GridContainer.js";
import Card from "../shared/Card/Card.js";
import CardBody from "../shared/Card/CardBody.js";
import Button from "../shared/CustomButtons/Button.js";
import CustomInput from 'components/shared/CustomInput/CustomInput.js';
import { connect } from 'react-redux';
import { ListAllFiles, AddFolder, ClearState } from '../../actions/browser.js';
import { AddBookmark } from '../../actions/bookmark.js';
import { bindActionCreators } from 'redux';

// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(styles);

function ListFiels(props) {
  const [newFolder, setNewFolder] = useState('');

  useEffect(() => {
    props.ListAllFiles(decodeURIComponent(props.params.folder));
    return () => {
       props.ClearState();
    }
  }, [])


  function rowClickHandler(folder)
  {
    props.ListAllFiles(folder);
    props.params.folder = folder;
  }

  function folderChangeHandler(event) {
    setNewFolder(event.target.value);
  }

  function addFolderCallback() {
    props.ListAllFiles(decodeURIComponent(props.params.folder));
    setNewFolder('');
  }

  function addFolderHandler() {
    props.AddFolder(newFolder, decodeURIComponent(props.params.folder), addFolderCallback);
  }

  function addBookmarkHandler() {
    props.AddBookmark('5d9ec846bbf735c6917f737b', decodeURIComponent(props.params.folder));
  }

  const classes = useStyles();
  const { tableHead, tableHeaderColor, files } = props;
  const disabledAddBookmark = (props.files.files && props.files.files.isBookmarked ? {disabled: 'disabled'} : {});
  const disabledAddFolder = !newFolder ? { disabled: 'disabled'} : {};

  return (
    <div className={classes.tableResponsive}>
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card plain style={{textAlign:'right', marginTop: '0px'}}>
              <div style={{textAlign:'right', marginTop: '0px'}}>
                <CustomInput
                  formControlProps={{
                    className: classes.margin + " " + classes.search
                  }}
                  inputProps={{
                    onChange: folderChangeHandler,
                    placeholder: "Folder Name",
                    inputProps: {
                      "aria-label": "Folder Name",
                      value : newFolder
                    }
                  }}/>
                <Button {...disabledAddFolder} style={{backgroundColor:'#ff9800'}} color="black" aria-label="edit" justIcon round
                  onClick={() => {
                    addFolderHandler();
                  }}
                >
                  <Add />
                </Button>
                <Button {...disabledAddBookmark} style={{backgroundColor:'#ff9800'}} color="black" aria-label="edit" justIcon round
                  onClick={() => {
                      addBookmarkHandler();
                  }}
                >
                  <Stars  />
                </Button>
              </div>
              <CardBody>
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
                    files.files && files.files.files.length > 0 ? (files.files.files.map((prop, key) => {
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
                                      (<Link folderName={rowProp} onClick={() => rowClickHandler(rowProp)}><Icon className="material-icons-outlined">{prop[1]}</Icon></Link>) :
                                      (<Icon className="material-icons-outlined">{prop[1]}</Icon>) :
                                    (prop[0] == "LastChanged") ? 
                                      (<Moment fromNow>{prop[1]}</Moment>) :
                                    ((prop[1] === 0) ? '' : prop[1])
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    </div>
  );
}


function mapStateToProps(state) {
  console.log('in mapStateToProps');
  console.log(state);
  return {
    files: state.files
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {ListAllFiles, AddFolder, ClearState, AddBookmark}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFiels);

ListFiels.defaultProps = {
  tableHeaderColor: "gray"
};

ListFiels.propTypes = {
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
