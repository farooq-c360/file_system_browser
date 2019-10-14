import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import {ListAllRecent, ClearState} from '../../actions/recent.js';
import {ListAllBookmarks} from '../../actions/bookmark.js';
import { bindActionCreators } from 'redux';

// core components
import styles from '../../assets/jss/material-dashboard-react/components/tableStyle.js';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(styles);

function QuickAccessableFileBrowser(props) {
  useEffect(() => {
    //TODO user from session
    if(props.path === '/admin/bookmarks')
    {
      props.ListAllBookmarks('5d9ec846bbf735c6917f737b');
    } else {
      props.ListAllRecent('5d9ec846bbf735c6917f737b', props.path === '/admin/recent' ? 'recent' : 'favourite' );
    }

    return () => {
       props.ClearState();
    }
  }, [])

  const classes = useStyles();
  const { tableHead, tableHeaderColor, bookmark, recent } = props;
  const results = recent.recent ? recent.recent : bookmark.recent;
 
  return (
    <div style={{marginTop:'50px'}} className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
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
            results && results.length > 0 ? (results.map((prop, key) => {
              return (
                <TableRow key={key} className={classes.tableBodyRow}>
                  <TableCell className={classes.tableCell} key={key}>
                      {
                        (<Link href={'/admin/browser/home/' + encodeURIComponent(prop.PATH)}>
                        <Icon className='material-icons-outlined'>{prop.Icon}</Icon></Link>)
                      }
                  </TableCell>
                  <TableCell>
                    { prop.PATH }
                  </TableCell>
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
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {ListAllRecent, ListAllBookmarks, ClearState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickAccessableFileBrowser);

QuickAccessableFileBrowser.defaultProps = {
  tableHeaderColor: 'gray'
};

QuickAccessableFileBrowser.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    'warning',
    'primary',
    'danger',
    'success',
    'info',
    'rose',
    'gray'
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
