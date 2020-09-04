import Taro, { FC } from "@tarojs/taro";
import { counterModel } from '../../models/CounterModel';
import { View, Button, Text } from "@tarojs/components";

const Index: FC = () => {
  const loading = counterModel.getNpm.useLoading();
  const count = counterModel.useData((data) => data.count);
  const react = counterModel.useData((data) => data.npm['react']);

  return (
    <View className='index'>
      <Button className='add_btn' onClick={counterModel.add}>+</Button>
      <Button className='dec_btn' onClick={counterModel.dec}>-</Button>
      <Button className='dec_btn' onClick={() => counterModel.getNpm('react')}>
         {loading ? '请求中...' : '请求React'}
      </Button>
      <View><Text>{count}</Text></View>
      <View><Text>Hello, World</Text></View>
      {react && (
        <View><Text>{react.description}</Text></View>
      )}
    </View>
  )
};

export default Index;
