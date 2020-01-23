
// const kebabCase = require( 'lodash/kebabCase' )

const plugins = [
//   [
//     'babel-plugin-transform-imports',
//     {
//       'antd': {
//         'transform': importName => `antd/lib/${ kebabCase( importName )}`,
//         'preventFullImport': true
//       },
//     }
//   ],
  [ "import", { "libraryName": "antd", "style": "css" }],
];

module.exports = {
    plugins
};