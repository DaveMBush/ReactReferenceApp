// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import TableBody  from '../../../../../www/app/jsx/view/tableBody.jsx.js';
import * as TableRow from '../../../../../www/app/jsx/view/tableRow.jsx.js';

jest.unmock('../../../../../www/app/jsx/view/tableBody.jsx.js');

describe('tests/www/app/jsx/view/tableBody.jsx.spec.js',()=>{
    var tableBody;
    describe('no data',()=>{
        beforeEach(()=>{
            // TableBody takes an array, start by passing in an empty array.
            var data = [];
            spyOn(TableRow.default.prototype,"render").and.returnValue(<tr></tr>)
            // enclose TableBody inside TABLE to render correct HTML
            var renderedComponent = TestUtils.renderIntoDocument(<table><TableBody data={data} onEdit={function(){}} onDelete={function(){}} /></table>);
            tableBody = ReactDOM.findDOMNode(renderedComponent).children[0];
        });
        it('should render tableBody',() =>{
            expect(tableBody).toBeDefined();
        })
        it('should render a TBODY tag',()=> {
            expect(tableBody.tagName).toBe('TBODY');
        });
        describe('the TBODY ',()=>{
            it('should have zero children',()=>{
                expect(tableBody.children.length).toBe(0);
            });
        });
    });
    describe('one record in data',()=>{
        beforeEach(()=>{
            // TableBody takes an array, start by passing in an empty array.
            var data = [{id:'1'}];
            spyOn(TableRow.default.prototype,"render").and.returnValue(<tr></tr>)
            // enclose TableBody inside TABLE to render correct HTML
            var renderedComponent = TestUtils.renderIntoDocument(<table><TableBody data={data} onEdit={function(){}} onDelete={function(){}} /></table>);
            tableBody = ReactDOM.findDOMNode(renderedComponent).children[0];
        });
        it('should render tableBody',() =>{
            expect(tableBody).toBeDefined();
        })
        it('should render a TBODY tag',()=> {
            expect(tableBody.tagName).toBe('TBODY');
        });
        describe('the TBODY ',()=>{
            it('should have one child',()=>{
                expect(tableBody.children.length).toBe(1);
            });
        });
    });
    describe('three records in data',()=>{
        beforeEach(()=>{
            // TableBody takes an array, start by passing in an empty array.
            var data = [{id:'1'},{id:'2'},{id:'3'}];
            spyOn(TableRow.default.prototype,"render").and.returnValue(<tr></tr>)
            // enclose TableBody inside TABLE to render correct HTML
            var renderedComponent = TestUtils.renderIntoDocument(<table><TableBody data={data} onEdit={function(){}} onDelete={function(){}}/></table>);
            tableBody = ReactDOM.findDOMNode(renderedComponent).children[0];
        });
        it('should render tableBody',() =>{
            expect(tableBody).toBeDefined();
        })
        it('should render a TBODY tag',()=> {
            expect(tableBody.tagName).toBe('TBODY');
        });
        describe('the TBODY ',()=>{
            it('should have three children',()=>{
                expect(tableBody.children.length).toBe(3);
            });
        });
    });

});