import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import DropdownField from '../../../../../../www/app/jsx/edit/components/dropdownField.jsx';
jest.unmock(              '../../../../../../www/app/jsx/edit/components/dropdownField.jsx.js');

describe('tests/www/js/edit/components/dropdownField.jsx.spec.js',()=>{
    var renderedComponent;
    var dropDownField;
    var someName='someName';
    var options=[{value: '1', label: 'option1'},{value: '2', label: 'option2'}];
    function onChange(){

    }
    beforeEach(()=>{
        renderedComponent = TestUtils.renderIntoDocument(
            <DropdownField name="abc"
                           label="cde" value="e"
                           onChange={onChange} options={options}
                           valueField='value' labelField='label'
            />);
        dropDownField = ReactDOM.findDOMNode(renderedComponent);
    });
    it('should render "TextField" tag',() =>{
        expect(dropDownField).not.toBeNull();
    });
    describe('the dropDown field',()=>{
        it('should display a div field',()=>{
            expect(dropDownField.tagName).toBe('DIV');
        });
        describe('the DIV tag',()=>{
            it('should have 2 children',()=>{
                expect(dropDownField.children.length).toBe(2);
            });
            it('should have a LABEL for the first child',()=>{
                expect(dropDownField.children[0].tagName).toBe('LABEL');
            });
            describe('The LABEL tag',()=>{
                it('should have a FOR attribute of "abc"',()=>{
                    expect(dropDownField.children[0].attributes.for.value).toBe('abc');
                });
                it('should contain text "cde"',()=>{
                    expect(dropDownField.children[0].textContent).toBe('cde');
                });
            });
            it('should have a DIV for the second child',()=>{
                expect(dropDownField.children[1].tagName).toBe('DIV');
            });
            describe('The DIV tag',()=>{
                it('should have a SELECT tag as a child',()=>{
                    expect(dropDownField.children[1].children[0].tagName).toBe('SELECT');
                });
                describe('The SELECT tag',()=>{
                    it('should have a ID attribute with "abc"',()=>{
                        expect(dropDownField.children[1].children[0].attributes.id.value).toBe('abc');
                    });
                    it('should have two children',()=>{
                        expect(dropDownField.children[1].children[0].children.length).toBe(2);
                    });
                    describe('the first child',()=>{
                        it('should be an OPTION tag',()=>{
                            expect(dropDownField.children[1].children[0].children[0].tagName).toBe('OPTION');
                        });
                        it('should have a value of 1',()=>{
                            expect(dropDownField.children[1].children[0].children[0].attributes.value.value).toBe('1');
                        });
                        it('should have a label of "option1"',()=>{
                            expect(dropDownField.children[1].children[0].children[0].textContent).toBe('option1');
                        });
                    });
                    describe('the second child',()=>{
                        it('should be an OPTION tag',()=>{
                            expect(dropDownField.children[1].children[0].children[1].tagName).toBe('OPTION');
                        });
                        it('should have a value of 2',()=>{
                            expect(dropDownField.children[1].children[0].children[1].attributes.value.value).toBe('2');
                        });
                        it('should have a label of "option2"',()=>{
                            expect(dropDownField.children[1].children[0].children[1].textContent).toBe('option2');
                        });
                    });
                });
            });
        });
    })

});