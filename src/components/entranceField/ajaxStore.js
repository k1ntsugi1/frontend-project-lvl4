

import axios from 'axios';
import routes from '../../routes.js';

const ajaxStore = {
    getStartAjaxState: () => {
        return {
            authData: null,
            authError: null,
            validateAuthCounter: 0,
        }
    },
    handlerResponse: (response, immerFunc , status) => {
        const mappingCallback = {
            'valid': (draft) => {
                draft.authData = response.data;
                draft.authError = null;
                draft.validateAuthCounter += 1;
            },
            'invalid': (draft) => {
                draft.authData = null;
                draft.authError = response.data.error;
                draft.validateAuthCounter += 1;
            }
        };
        immerFunc(mappingCallback[status])
    },
    handlerRequest: async (values, routPath, responseFunc, immerFunc) => {
        try {
          const response = await axios.post(routes[routPath](), {
            username: values.username,
            password: values.password
          });
          responseFunc(response, immerFunc, 'valid')
        } catch (e) {
            console.log(e, 'error!');
          const { response } = e;
          responseFunc(response, immerFunc, 'invalid')
        }
    }
}

export default ajaxStore;