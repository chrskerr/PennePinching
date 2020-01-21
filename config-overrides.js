
const { override, addWebpackPlugin, useBabelRc } = require( 'customize-cra' );
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = override( addWebpackPlugin( new AntdDayjsWebpackPlugin() ) );
module.exports = override( useBabelRc() );
