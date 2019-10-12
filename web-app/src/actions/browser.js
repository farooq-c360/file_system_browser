import axios from 'axios';
import config from '../config/config'

export function ListAllFiles(folder) {
    const request =  axios.get(
      config.get(process.env.NODE_ENV).API_URLS.BROWSER.LIST + encodeURIComponent(folder),
      ).then(result =>  {
          var mData = result.data.files.map(d => {
              var dItem = {
                'Icon' : d.IsDirectory ? "folder" : "description",
                'Name' : (folder == '--root--' ? '' : folder) + '/' + (d.Name + (d.Ext === undefined ? '' : d.Ext)),
                'DisplayName': d.Name + (d.Ext === undefined ? '' : d.Ext),
                'LastChanged' : d.LastChanged,
                'Size':  d.Size,
                'IsBookmarked' : d.IsBookmarked
              };
              return dItem;
            });
      
            //TODO
            let folderName = decodeURIComponent(folder);
            let folders = folderName.split('/');
            console.log(folderName);
            if(folderName !== '/') {
              folders.length = folders.length - 1;
              mData.unshift({Icon: 'folder', Name: folders.join('/').length > 0 ? folders.join('/') : '--root--', DisplayName: '..', Size: 0 });
            }

            return { files:mData, isBookmarked: result.data.isBookmarked, folder  };
      });
      
    return {
        type: 'LIST_ALL_FILES',
        payload: request
    }
}

export function AddFolder(folder, parentFolder, next) {
  console.log('in action');
  console.log(parentFolder + folder);
  
  const request = axios.post(
    config.get(process.env.NODE_ENV).API_URLS.BROWSER.ADD ,
    {
      type : 'folder',
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