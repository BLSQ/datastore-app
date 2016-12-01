import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import HistoryToolbar from '../../webapp/js/components/window/history/HistoryToolbar';
import Paper from 'material-ui/Paper';

describe('Component: HistoryToolbar', () => {
    let component;

    const testNamespace = 'test';
    const testKey = 'test';

    beforeEach(() => {
        component = shallow(<HistoryToolbar namespace={testNamespace} selectedKey={testKey} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('', () => {
        expect().to.equal()
    });

});
