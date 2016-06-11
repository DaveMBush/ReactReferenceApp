import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import SaveButton from '../../../../../../www/app/jsx/edit/components/saveButton.jsx';
jest.unmock(          '../../../../../../www/app/jsx/edit/components/saveButton.jsx.js');

describe('tests/www/js/edit/components/saveButton.jsx.spec.js',()=>{
    var renderedComponent;
    var saveButton;
    var someName='someName';
    var save = {click:function(){console.log('save clicked')}};
    describe('editMode = "add"',()=>{
        beforeEach(()=>{
            // set the spy before passing to SaveButton so the spy gets called
            // instead of the original function
            spyOn(save,'click');
            renderedComponent = TestUtils.renderIntoDocument(<SaveButton onClick={save.click} editMode="add"/>);
            saveButton = ReactDOM.findDOMNode(renderedComponent);
        });
        it('should render "SaveButton" tag',() =>{
            expect(saveButton).not.toBeNull();
        });
        describe('the saveButton tag',()=>{
            it('should render a BUTTON tag',()=>{
                expect(saveButton.tagName).toEqual("BUTTON");
            });
            describe('the BUTTON tag',()=>{
                it('should have 1 child',()=>{
                    expect(saveButton.children.length).toBe(1);
                });
                it('should have "Add" as the text',()=>{
                    expect(saveButton.textContent.indexOf('Add')).toBeGreaterThan(-1);
                });
            });
            describe('when the button is clicked',()=>{
                beforeEach(()=>{
                    TestUtils.Simulate.click(saveButton);
                });
                it('should call the onClick callback',()=>{
                    expect(save.click).toHaveBeenCalled();
                });
            })
        });

    });
    describe('editMode = "edit"',()=>{
        beforeEach(()=>{
            // set the spy before passing to SaveButton so the spy gets called
            // instead of the original function
            spyOn(save,'click');
            renderedComponent = TestUtils.renderIntoDocument(<SaveButton onClick={save.click} editMode="edit"/>);
            saveButton = ReactDOM.findDOMNode(renderedComponent);
        });
        it('should render "SaveButton" tag',() =>{
            expect(saveButton).not.toBeNull();
        });
        describe('the saveButton tag',()=>{
            it('should render a BUTTON tag',()=>{
                expect(saveButton.tagName).toEqual("BUTTON");
            });
            describe('the BUTTON tag',()=>{
                it('should have 1 child',()=>{
                    expect(saveButton.children.length).toBe(1);
                });
                it('should have "Save" as the text',()=>{
                    expect(saveButton.textContent.indexOf('Save')).toBeGreaterThan(-1);
                });
            });
            describe('when the button is clicked',()=>{
                beforeEach(()=>{
                    TestUtils.Simulate.click(saveButton);
                });
                it('should call the onClick callback',()=>{
                    expect(save.click).toHaveBeenCalled();
                });
            })
        });

    });
});