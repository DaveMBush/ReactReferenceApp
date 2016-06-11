
// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import View  from '../../../../../www/app/jsx/view/view.jsx.js';
import * as TableHead from '../../../../../www/app/jsx/view/tableHead.jsx.js';
import * as TableBody from '../../../../../www/app/jsx/view/tableBody.jsx.js';

jest.unmock('../../../../../www/app/jsx/view/view.jsx.js');

describe('tests/www/app/jsx/view/view.jsx.spec.js',()=> {
    var renderedComponent;
    var view;
    var addObject = {addFunction: function(){}};
    beforeEach(()=>{
        spyOn(TableHead.default.prototype,"render").and.returnValue(<thead></thead>);
        spyOn(TableBody.default.prototype,"render").and.returnValue(<tbody></tbody>);
        spyOn(addObject,'addFunction');
        renderedComponent = TestUtils.renderIntoDocument(<View data={[]} onEdit={function(){}} onDelete={function(){}} onAdd={addObject.addFunction} />);
        view = ReactDOM.findDOMNode(renderedComponent);
    });
    it('should render view',() =>{
        expect(view).toBeDefined();
    });
    it('should render a DIV tag',()=> {
        expect(view.tagName).toBe('DIV');
    });
    describe('the first child',()=>{
        it('should be a TABLE tag',()=>{
            expect(view.children[0].tagName).toBe('TABLE');
        });
        describe('the first child of TABLE',()=>{
            it('should be THEAD',()=>{
                expect(view.children[0].children[0].tagName).toBe('THEAD');
            });
        });
        describe('the second child of TABLE',()=>{
            it('should be TBODY',()=>{
               expect(view.children[0].children[1].tagName).toBe('TBODY');
            });
        })
    });
    describe('the second child',()=>{
        it('should be a BUTTON tag',()=>{
            expect(view.children[1].tagName).toBe('BUTTON');
        });
        it('should display " Add"',()=>{
            expect(view.children[1].textContent.indexOf(' Add')).toBeGreaterThan(-1);
        });
    });
    describe('when the add button is clicked',()=>{
        beforeEach(()=>{
            TestUtils.Simulate.click(view.children[1]);
        });
        it('should call the add function',()=>{
            expect(addObject.addFunction).toHaveBeenCalled();
        });
    });
});
