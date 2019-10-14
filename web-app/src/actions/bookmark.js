import axios from 'axios';
import config from '../config/config'

export function ListAllBookmarks(user) {
    const request =  axios.get(
        config.get(process.env.NODE_ENV).API_URLS.BOOKMARK.LIST + user,
      ).then(result =>  {
          var mData = result.data.map(d => {
              var dItem = {
                'Icon' : 'folder',
                'PATH' : d.path
              };
              return dItem;
            });

            return mData;
      });
      
    return {
        type: 'LIST_BOOKMARK',
        payload: request
    }
}

export function AddBookmark(user, folder) {
    const request =  axios.post(
        config.get(process.env.NODE_ENV).API_URLS.BOOKMARK.ADD, { user, folder }
      ).then(result =>  {
          return {
            type: 'ADD_BOOKMARK',
            payload: result
        };
      });
    
    return {
        type: 'ADD_BOOKMARK',
        payload: request
    }
}

export function ClearState() {
    return {
        type: 'CLEAR_STATE',
        payload: null
    }
}