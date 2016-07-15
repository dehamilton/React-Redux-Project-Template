import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import chai from 'chai';
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