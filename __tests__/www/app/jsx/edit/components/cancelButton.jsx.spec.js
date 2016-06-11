import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import CancelButton from '../../../../../../www/app/jsx/edit/components/cancelButton.jsx';
jest.unmock(          '../../../../../../www/app/jsx/edit/components/cancelButton.jsx.js');

describe('tests/www/js/edit/components/cancelButton.jsx.spec.js',()=>{
    var renderedComponent;
    var cancelButton;
    var cancel = {click:function(){console.log('cancel clicked')}};
    beforeEach(()=>{
        // set the spy before passing to CancelButton so the spy gets called
        // instead of the original function
        spyOn(cancel,'click');
        renderedComponent = TestUtils.renderIntoDocument(<CancelButton onClick={cancel.click} />);
        cancelButton = ReactDOM.findDOMNode(renderedComponent);
    });
    it('should render "CancelButton" tag',() =>{
        expect(cancelButton).not.toBeNull();
    });
    describe('the cancelButton tag',()=>{
        it('should render a BUTTON tag',()=>{
            expect(cancelButton.tagName).toEqual("BUTTON");
        });
        describe('the BUTTON tag',()=>{
            it('should have 1 child',()=>{
                expect(cancelButton.children.length).toBe(1);
            });
            it('should have "Cancel" as the text',()=>{
                expect(cancelButton.textContent.indexOf('Cancel')).toBeGreaterThan(-1);
            });
        });
        describe('when the button is clicked',()=>{
            beforeEach(()=>{
                TestUtils.Simulate.click(cancelButton);
            });
            it('should call the onClick callback',()=>{
                expect(cancel.click).toHaveBeenCalled();
            });
        })
    });
});