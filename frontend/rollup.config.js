import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/app/index.js',
  plugins: [ json(), babel() ],
  dest: 'dist/app.js'
};