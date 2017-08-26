const path = require('path');

module.exports = {
 context: path.join(__dirname, 'client'),
 entry: [
   './main.js',
 ],
 output: {
   path: path.join(__dirname, 'www'),
   filename: 'bundle.js',
 },
 module: {
   rules: [
     {
       test: /\.js/,
       exclude: /node_modules/,
       use: [
         'babel-loader',
       ],
     },
     {
       test: /\.css$/,
       exclude: /node_modules/,
       use: [
         'style-loader', 'css-loader',
       ]
     }
   ],
 },
 resolve: {
   modules: [
     path.join(__dirname, 'node_modules'),
   ],
 },

};
