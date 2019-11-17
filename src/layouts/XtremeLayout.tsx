/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  DefaultFooter,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Layout, Menu, Icon, Result, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { isAntDesignPro, getAuthorityFromRouter } from '@/utils/utils';
import TweenOne from 'rc-tween-one';
import logo from '../assets/logo.svg';

import styles from './XtremeLayout.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

export interface BasicLayoutProps extends ProLayoutProps {
  collapsed: boolean;
  dispatch: Dispatch;
}

const XtremeLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, collapsed, children } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */
  const handleMenuCollapse = (): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload: !collapsed,
      });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', position: 'relative' }}>
        <Sider collapsible={false} width={64} style={{backgroundColor: '#2F47B1', overflow: 'visible'}}>
          <div style={{height: 64, backgroundColor: '#21BECB'}}></div>
        </Sider>
        <Sider trigger={null} collapsed={collapsed} width={250} collapsedWidth={15} className={styles.siderMain}>
          {/* <TweenOne animation={{x: -100}}> */}
            {/* <div className={styles.siderMainContent}>
              Hello there how are you doing?
            </div> */}
          {/* </TweenOne> */}
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            {/* <TweenOne animation={{x: -100}}> */}
              <Icon
                type={collapsed ? 'right-circle' : 'left-circle'}
                theme='twoTone'
                onClick={handleMenuCollapse}
                // twoToneColor='#273EAC'
                className={styles.siderMainToggle}
              />
            {/* </TweenOne> */}
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(XtremeLayout);
