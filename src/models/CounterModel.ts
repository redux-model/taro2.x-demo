import { Model } from '@redux-model/taro';
import { $api } from '../service/$api';

interface Response {
  _id: string;
  name: string;
  description: string;
}

interface Data {
  count: number;
  npm: Partial<{
    [key: string]: Response;
  }>;
}

class CounterModel extends Model<Data> {
  add = this.action((state) => {
    state.count += 1;
  });

  dec = this.action((state) => {
    state.count -= 1;
  });

  getNpm = $api.action((name: string) => {
    return this
      .get<Response>('/' + name)
      .onSuccess((state, action) => {
        state.npm[name] = action.response;
      })
      .successText('请求成功');
  })

  protected initReducer(): Data {
    return {
      count: 0,
      npm: {},
    };
  }
}

export const counterModel = new CounterModel();
