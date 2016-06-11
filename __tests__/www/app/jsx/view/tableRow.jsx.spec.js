
// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import TableRow from '../../../../../www/app/jsx/view/tableRow.jsx.js';
jest.unmock('../../../../../www/app/jsx/view/tableRow.jsx.js');

describe('/tests/www/app/jsx/view/tableRow.jsx.spec.js',()=>{
    var tableRow;
    var editDelete;
    beforeEach(()=>{
        var key='xyz';
        editDelete = {
            edit:function(){},
            del: function(){}
        }
        spyOn(editDelete,'edit');
        spyOn(editDelete,'del');
        var item={id: '1', name: 'abc', sex: 'f', dob: (new Date())};
        var renderedComponent = TestUtils.renderIntoDocument(<table><tbody><TableRow key={key} item={item} onEdit={editDelete.edit} onDelete={editDelete.del} /></tbody></table>);
        tableRow = ReactDOM.findDOMNode(renderedComponent).children[0].children[0];
    });
    it('should render the row',()=>{
        expect(tableRow).toBeDefined();
    });
    it('should render as TR tag',()=>{
        expect(tableRow.tagName).toBe('TR');
    });
    it('should have 4 children',()=>{
        expect(tableRow.children.length).toBe(4);
    });
    describe('the first child',()=>{
        it('should be TD tag',()=>{
            expect(tableRow.children[0].tagName).toBe('TD');
        });
        it('should contain "abc"',()=>{
            expect(tableRow.children[0].textContent).toBe('abc');
        });
    });
    describe('the second child',()=>{
        it('should be TD tag',()=>{
            expect(tableRow.children[1].tagName).toBe('TD');
        });
        it('should contain "f"',()=>{
            expect(tableRow.children[1].textContent).toBe('f');
        });
    });
    describe('the third child',()=>{
        it('should be TD tag',()=>{
            expect(tableRow.children[2].tagName).toBe('TD');
        });
        it('should contain today\'s date as just date',()=>{
            expect(tableRow.children[2].textContent).toBe((new Date()).toLocaleDateString());
        });
    });
    describe('the forth child',()=>{
        it('should be TD tag',()=>{
            expect(tableRow.children[3].tagName).toBe('TD');
        });
        it('should contain two children',()=>{
            expect(tableRow.children[3].children.length).toBe(2);
        });
        describe('the first child',()=>{
            it('should be a button',()=>{
                expect(tableRow.children[3].children[0].tagName).toBe('BUTTON');
            });
            it('should display " Edit"',()=>{
                expect(tableRow.children[3].children[0].textContent).toBe(' Edit');
            });
            describe('clicking the button',()=>{
                beforeEach(()=>{
                    TestUtils.Simulate.click(tableRow.children[3].children[0]);
                });
                it('should call edit function with "1"',()=>{
                    // only care about first parameter.
                    expect(editDelete.edit.calls.argsFor(0)[0]).toBe('1');
                })
            });
        });
        describe('the second child',()=>{
            it('should be a button',()=>{
                expect(tableRow.children[3].children[1].tagName).toBe('BUTTON');
            });
            it('should display " Delete"',()=>{
                expect(tableRow.children[3].children[1].textContent).toBe(' Delete');
            });
            describe('clicking the button',()=>{
                beforeEach(()=>{
                    TestUtils.Simulate.click(tableRow.children[3].children[1]);
                });
                it('should call delete function with "1"',()=>{
                    // only care about first parameter.
                    expect(editDelete.del.calls.argsFor(0)[0]).toBe('1');
                })
            });
        });
    });
});