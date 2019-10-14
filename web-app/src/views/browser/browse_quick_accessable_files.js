import React from 'react';

// core components
import QuickAccessableFileBrowser from '../../components/browser/QucikAccessableFilesBrowser.js';


const TableList = function (props) {
  return (
      <div>
        <QuickAccessableFileBrowser
          tableHeaderColor='primary'
          tableHead={['', 'Folder']}
          tableData={[]}
          params={props.match.params}
          path={props.match.path}
        />
      </div>
    );
  }

export default TableList;