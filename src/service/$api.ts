import { HttpService } from '@redux-model/taro';
import Taro from '@tarojs/taro';

export const $api = new HttpService({
  baseUrl: 'https://registry.npm.taobao.org',
  headers: () => {
    return {
      Accept: 'application/json',
    };
  },
  onRespondError: (response, transform) => {
    if (response.data && response.data.reason) {
      transform.message = response.data.reason;
    }
  },
  onShowSuccess: (successText) => {
    console.info(successText);
    Taro.showModal({
      title: successText,
    });
  },
  onShowError: (errorText) => {
    console.error(errorText);
    Taro.showModal({
      title: errorText,
    });
  },
});
