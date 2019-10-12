import axios from 'axios';
import config from '../config/config'

export function ListAllRecent(user, type) {
    console.log('in ListAllRecent');
    console.log(config.get(process.env.NODE_ENV).API_URL);
    const request =  axios.get(
        config.get(process.env.NODE_ENV).API_URLS.RECENT.LIST + user + '/' + type ,
      ).then(result =>  {
          console.log(result.data);
          var mData = result.data.map(d => {
              var dItem = {
                'Icon' : "folder",
                'PATH' : d.path
              };
              return dItem;
            });

            console.log(mData);

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