import axios from 'axios';
import config from '../config/config'

export function ListAllRecent(user, type) {
    const request =  axios.get(
        config.get(process.env.NODE_ENV).API_URLS.RECENT.LIST + user + '/' + type ,
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
        type: 'LIST_RECENT',
        payload: request
    }
}

export function ClearState() {
    return {
        type: 'CLEAR_STATE',
        payload: null
    }
}