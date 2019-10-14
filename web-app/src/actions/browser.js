import axios from 'axios';
import config from '../config/config'

export function ListAllFiles(folder) {
    const request =  axios.get(
      config.get(process.env.NODE_ENV).API_URLS.BROWSER.LIST + encodeURIComponent(folder),
      ).then(result =>  {
          var mData = result.data.files.map(d => {
              var dItem = {
                'Icon' : d.IsDirectory ? 'folder' : 'description',
                'Name' : (folder === '/' ? '/' : folder + '/')  + (d.Name + (d.Ext === undefined ? '' : d.Ext)),
                'DisplayName': d.Name + (d.Ext === undefined ? '' : d.Ext),
                'LastChanged' : d.LastChanged,
                'Size':  d.Size,
                'IsBookmarked' : d.IsBookmarked
              };
              return dItem;
            });

            let folderName = decodeURIComponent(folder);
            let folders = folderName.split('/');
            if(folderName !== '/') {
              folders.length = folders.length - 1;
              mData.unshift({Icon: 'folder', Name: folders.join('/').length > 0 ? folders.join('/') : '/', 
              DisplayName: '..', LastChanged: '', Size: 0 });
            }

            return { type: 'LIST_ALL_FILES', files:mData, isBookmarked: result.data.isBookmarked, folder  };
      }).catch(err => {
        return { type: 'LIST_ALL_FILES', files:[], isBookmarked: false, folder, err }
      });
      
    return {
        type: 'LIST_ALL_FILES',
        payload: request
    }
}

export function AddFolder(folder, parentFolder, next) {
  axios.post(
    config.get(process.env.NODE_ENV).API_URLS.BROWSER.ADD ,
    {
      type : 'ADD_FOLDER',
      folder: folder,
      parentFolder: parentFolder
    }
  ).then(result => {
    next();
  }).catch(err => {
    console.log(err);
  });

  return {
    type: 'ADD_FOLDER',
    payload: null
  }
}

export function ClearState() {
    return {
        type: 'CLEAR_STATE',
        payload: null
    }
}