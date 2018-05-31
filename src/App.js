import React from 'react';
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core';
import Wapper from './components/Wapper';

// 配置jss中css的插入顺序，保证css-modules可以正常使用
const styleNode = document.createComment('insertion-point-jss');
document.head.insertBefore(styleNode, document.head.firstChild);

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = 'insertion-point-jss';

const App = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Wapper />
  </JssProvider>
);

export default App;
