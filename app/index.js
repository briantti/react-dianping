import React from 'react';
import {render} from 'react-dom';
import './static/css/common.less'

import Hello from './containers/Hello/index.js';

render(
    <Hello></Hello>,
    document.getElementById('root')
);