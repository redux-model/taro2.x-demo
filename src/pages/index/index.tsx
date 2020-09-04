import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.css'
import { counterModel } from '../../models/CounterModel'
import { ComponentClass } from 'react'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type IProps = ReturnType<typeof mapStateToProps>;

class Index extends Component<IProps> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { loading, react, count } = this.props;

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
  }
}

const mapStateToProps = () => {
  return {
    count: counterModel.data.count,
    loading: counterModel.getNpm.loading,
    react: counterModel.data.npm['react'],
  };
};

export default connect(mapStateToProps)(Index) as ComponentClass;
