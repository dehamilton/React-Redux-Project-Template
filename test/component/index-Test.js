/* global describe, it */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import MainContainer from '../../src/components/index.jsx';

chai.use(chaiEnzyme());

describe('index', () => {
  it('shows <template running> text', () => {
    const wrapper = shallow(<MainContainer
      initModule={() => {}}
      testTypecheck={() => {}}
    />);

    expect(wrapper.find('div')).to.have.text('template running');
  });
});
