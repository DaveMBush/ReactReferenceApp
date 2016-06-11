import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import Edit  from '../../../../../www/app/jsx/edit/edit.jsx.js';
import * as TextField from '../../../../../www/app/jsx/edit/components/textField.jsx.js';
import * as DropDownField from '../../../../../www/app/jsx/edit/components/dropdownField.jsx.js';
import * as CancelButton from '../../../../../www/app/jsx/edit/components/cancelButton.jsx.js';
import * as SaveButton from '../../../../../www/app/jsx/edit/components/saveButton.jsx';
jest.unmock('../../../../../www/app/jsx/edit/edit.jsx.js');

describe('tests/www/js/edit/edit.jsx.spec.js',()=> {
    var renderedComponent;
    var edit;
    beforeEach(()=>{
        var row = {name: 'someName'};
        spyOn(TextField.default.prototype,'render').and.returnValue(<div>TextField</div>);
        spyOn(DropDownField.default.prototype,'render').and.returnValue(<div>DropDownField</div>);
        spyOn(CancelButton.default.prototype,'render').and.returnValue(<div>CancelButton</div>);
        spyOn(SaveButton.default.prototype,'render').and.returnValue(<div>SaveButton</div>);
        renderedComponent = TestUtils.renderIntoDocument(<Edit row={row} />);
        edit = ReactDOM.findDOMNode(renderedComponent);
    });
    it('should render "Edit" tag',() =>{
        expect(edit).not.toBeNull();
    })
    describe('the edit tag',()=> {
        it('should contain "This is the edit"',()=>{
            expect(edit.textContent).toEqual("TextFieldDropDownFieldTextFieldSaveButtonCancelButton");
        });
    });
});
