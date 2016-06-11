import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import TextField from '../../../../../../www/app/jsx/edit/components/textField.jsx';
jest.unmock(          '../../../../../../www/app/jsx/edit/components/textField.jsx.js');

describe('tests/www/js/edit/components/textField.jsx.spec.js',()=> {
    var renderedComponent;
    var textField;
    var someName='someName';
    beforeEach(()=>{
        renderedComponent = TestUtils.renderIntoDocument(<TextField name="abc" label="cde" xvalue="efg" placeholder="zzz"/>);
        textField = ReactDOM.findDOMNode(renderedComponent);
    });
    it('should render "TextField" tag',() =>{
        expect(textField).not.toBeNull();
    });
    describe('the TextField tag',()=> {
        it('should render a DIV tag',()=>{
            expect(textField.tagName).toEqual("DIV");
        });
        describe('The DIV tag',()=>{
            it('should have 2 children',()=>{
                expect(textField.children.length).toBe(2);
            });
            it('should have a LABEL for the first child',()=>{
                expect(textField.children[0].tagName).toBe('LABEL');
            });
            describe('The LABEL tag',()=>{
                it('should have a FOR attribute of "abc"',()=>{
                    expect(textField.children[0].attributes.for.value).toBe('abc');
                });
                it('should contain text "cde"',()=>{
                    expect(textField.children[0].textContent).toBe('cde');
                });
            });
            it('should have a DIV for the second child',()=>{
                expect(textField.children[1].tagName).toBe('DIV');
            });
            describe('The DIV tag',()=>{
                it('should have an INPUT tag as a child',()=>{
                    expect(textField.children[1].children[0].tagName).toBe('INPUT');
                });
                describe('The INPUT tag',()=>{
                    it('should have a ID attribute with "abc"',()=>{
                        expect(textField.children[1].children[0].attributes.id.value).toBe('abc');
                    });
                });
            });
        });
    });
});
