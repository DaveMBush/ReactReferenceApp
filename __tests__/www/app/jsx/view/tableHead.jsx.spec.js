// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import TableHead  from '../../../../../www/app/jsx/view/tableHead.jsx.js';
jest.unmock('../../../../../www/app/jsx/view/tableHead.jsx.js');

describe('tests/www/app/jsx/view/tableHead.jsx.spec.js',()=> {
    var tableHead;
    beforeEach(()=>{
        // enclose TableHead inside TABLE to render correct HTML
        var renderedComponent = TestUtils.renderIntoDocument(<table><TableHead /></table>);
        tableHead = ReactDOM.findDOMNode(renderedComponent).children[0];
    });
    it('should render tableHead',() =>{
        expect(tableHead).toBeDefined();
    })
    it('should render a THEAD tag',()=> {
        expect(tableHead.tagName).toBe('THEAD');
    });
    describe('the THEAD element',()=>{
        it('should have one child',()=>{
            expect(tableHead.children.length).toBe(1);
        });
        describe('the THEAD child',()=>{
            it('should be TR',()=>{
                expect(tableHead.children[0].tagName).toBe('TR');
            });
            describe('the TR tag',()=>{
                it('should have three children',()=>{
                    expect(tableHead.children[0].children.length).toBe(3);
                });
                describe('the first child',()=>{
                    it('should be a TH tag',()=>{
                        expect(tableHead.children[0].children[0].tagName).toBe('TH');
                    });
                    it('should contain the word "Name"',()=>{
                        expect(tableHead.children[0].children[0].textContent).toBe('Name');
                    });
                });
                describe('the second child',()=>{
                    it('should be a TH tag',()=>{
                        expect(tableHead.children[0].children[1].tagName).toBe('TH');
                    });
                    it('should contain the word "Sex"',()=>{
                        expect(tableHead.children[0].children[1].textContent).toBe('Sex');
                    });
                });
                describe('the third child',()=>{
                    it('should be a TH tag',()=>{
                        expect(tableHead.children[0].children[2].tagName).toBe('TH');
                    });
                    it('should contain the word "DOB"',()=>{
                        expect(tableHead.children[0].children[2].textContent).toBe("DOB");
                    });
                });
            });
        });
    })
});