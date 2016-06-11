// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import EditController  from '../../../../../www/app/jsx/edit/editController.jsx.js';
import * as Edit  from '../../../../../www/app/jsx/edit/edit.jsx.js';
import * as CrudStore from '../../../../../www/app/stores/crudStore.js';
import * as AppDispatch from '../../../../../www/app/dispatcher/appDispatcher.js';
import * as constants from '../../../../../www/app/constants/actionTypes.js'
import {browserHistory} from 'react-router';
var ActionTypes = constants.default;
jest.unmock('../../../../../www/app/jsx/edit/editController.jsx.js');

describe('tests/www/js/edit/editController.jsx.spec.js',()=>{
    beforeEach(()=>{
        EditController.contextTypes = {
            router: function(){return browserHistory}
        };
    });
    // mock context types
    describe('Rendering the EditController with id undefined',()=>{
        var editController;
        var renderedComponent;
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);

            var props={params:{}};
            renderedComponent = TestUtils.renderIntoDocument(<EditController {...props}  />);
            editController = ReactDOM.findDOMNode(renderedComponent);
        });
        it('editMode should be "add"',()=>{
            expect(renderedComponent.editMode).toBe('add');
        })
    });

    describe('Rendering the EditController with ID=23',()=>{
        var editController;
        var renderedComponent;
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);

            var props={params:{id:23}};
            renderedComponent = TestUtils.renderIntoDocument(<EditController {...props}  />);
            editController = ReactDOM.findDOMNode(renderedComponent);
        });
        it('should render the edit controller',()=>{
            expect(editController).toBeDefined();
        });
        it('should render DIV',()=>{
            expect(editController.tagName).toBe('DIV');
        });
        it('should contain "View" as the content',()=>{
            expect(editController.textContent).toBe('Edit');
        });
        it('should call componentWillMount',()=>{
            expect(EditController.prototype.componentWillMount).toHaveBeenCalled();
        });
        it('editMode should be "edit"',()=>{
            expect(renderedComponent.editMode).toBe('edit');
        });
    });
    describe('calling componentWillMount in editMode',()=>{
        var editController;
        beforeEach(()=>{
            editController = new EditController({params:{id:23}});
            spyOn(CrudStore.default,'addChangeListener').and.returnValue(null);
            spyOn(AppDispatch.default,'dispatch').and.returnValue(null);
            spyOn(editController,'onChange');
            editController.componentWillMount();
        });
        afterEach(()=>{
            editController = null;
        });
        it('should add a change listener to onChange',()=>{
            expect(CrudStore.default.addChangeListener).toHaveBeenCalledWith(editController.onChange);
        });
        it('should call AppDispatch.dispatch',()=>{
            expect(AppDispatch.default.dispatch).toHaveBeenCalled();
        });
    });
    describe('calling componentWillMount in add mode',()=>{
        var editController;
        beforeEach(()=>{
            editController = new EditController({params:{}});
            spyOn(CrudStore.default,'addChangeListener').and.returnValue(null);
            spyOn(AppDispatch.default,'dispatch').and.returnValue(null);
            spyOn(editController,'onChange');
            editController.componentWillMount();
        });
        afterEach(()=>{
            editController = null;
        });
        it('should add a change listener to onChange',()=>{
            expect(CrudStore.default.addChangeListener).toHaveBeenCalledWith(editController.onChange);
        });
        it('should not call AppDispatch.dispatch',()=>{
            expect(AppDispatch.default.dispatch).not.toHaveBeenCalled();
        });
    });

    describe('calling componentWillUnmount',()=>{
        var editController;
        beforeEach(()=>{
            editController = new EditController({params:{id:23}});
            spyOn(CrudStore.default,'removeChangeListener').and.returnValue(null);
            editController.componentWillUnmount();
        });
        afterEach(()=>{
            editController = null;
        });
        it('should remove a change listener',()=>{
            expect(CrudStore.default.removeChangeListener).toHaveBeenCalledWith(editController.onChange);
        })
    });
    describe('calling onChange',()=>{
        var editController;
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
            var props={params:{id:23,name:'abc'}};
            editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
            editController.context = {router: browserHistory};
            spyOn(browserHistory,'push');
            spyOn(editController,'setState').and.callThrough();
        });
        describe('with type=CRUD_GET and item.name="foobar"',()=>{
            beforeEach(()=>{
                editController.onChange(ActionTypes.CRUD_GET,{name:'foobar'});
            });
            it('should call setState with {name: "foobar"}',()=>{
                expect(editController.setState.calls.argsFor(0)[0].name).toBe('foobar');
            });
            it('should change state.name to "foobar"',()=>{
                expect(editController.state.name).toBe('foobar');
            });
        });
        describe('with type=CRUD_UPDATE',()=>{
            beforeEach(()=>{
                editController.onChange(ActionTypes.CRUD_UPDATE,{});
            });
            it('should move to the main screen',()=>{
                expect(browserHistory.push).toHaveBeenCalledWith('');
            });
        });
        describe('with type=CRUD_LIST and item.name="foobar"',()=>{
            beforeEach(()=>{
                editController.onChange(ActionTypes.CRUD_LIST,{name: 'foobar'});
            });
            it('should not call setState',()=>{
                expect(editController.setState).not.toHaveBeenCalled();
            });
            it('should leave state.name as ""',()=>{
                expect(editController.state.name).toBe('');
            });
        });
    });
    describe('calling onNameChange with event.target.value="xyz"',()=>{
        var editController;
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
            var props={params:{id:23,name:'abc'}};
            editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
            spyOn(editController,'setState').and.callThrough();
            editController.onNameChange({target: {value: 'xyz'}});
        });
        it('should call editController.setState with {name: "xyz"}',()=>{
            expect(editController.setState.calls.argsFor(0)[0].name).toBe('xyz');
        });
        it('should change state.name to "xyz"',()=>{
            expect(editController.state.name).toBe('xyz');
        });
    });
    describe('calling onSexChange with event.target.value="xyz"',()=>{
        var editController;
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
            var props={params:{id:23,sex:'abc'}};
            editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
            spyOn(editController,'setState').and.callThrough();
            editController.onSexChange({target: {value: 'xyz'}});
        });
        it('should call editController.setState with {name: "xyz"}',()=>{
            expect(editController.setState.calls.argsFor(0)[0].sex).toBe('xyz');
        });
        it('should change state.name to "xyz"',()=>{
            expect(editController.state.sex).toBe('xyz');
        });
    });
    describe('calling onDobChange with event.target.value="xyz"',()=>{
        var editController;
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
            var props={params:{id:23,dob:'abc'}};
            editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
            spyOn(editController,'setState').and.callThrough();
            editController.onDobChange({target: {value: 'xyz'}});
        });
        it('should call editController.setState with {dob: "xyz"}',()=>{
            expect(editController.setState.calls.argsFor(0)[0].dob).toBe('xyz');
        });
        it('should change state.dob to "xyz"',()=>{
            expect(editController.state.dob).toBe('xyz');
        });
    });
    describe('calling onCancelClick',()=>{
        beforeEach(()=>{
            //noinspection JSPotentiallyInvalidConstructorUsage
            spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
            // keep it from loading data
            spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
            var props={params:{id:23,dob:'abc'}};
            var editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
            editController.context = {router: browserHistory};
            spyOn(editController,'setState').and.callThrough();
            spyOn(browserHistory,'push');
            editController.onCancelClick();
        });
        it('should send us back to the main page',()=>{
            expect(browserHistory.push).toHaveBeenCalledWith('');
        });
    });
    describe('calling onSaveClick()',()=>{
        describe('when in edit mode',()=>{
            beforeEach(()=>{
                //noinspection JSPotentiallyInvalidConstructorUsage
                spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
                // keep it from loading data
                spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
                spyOn(AppDispatch.default,'dispatch');
                var props={params:{id: 23}};
                var editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
                editController.context = {router: browserHistory};
                editController.onSaveClick();
            });
            it('should send a message to update the database',()=>{
                expect(AppDispatch.default.dispatch.calls.argsFor(0)[0].actionType).toBe(ActionTypes.CRUD_UPDATE);
            });
        });
        describe('when in add mode',()=>{
            beforeEach(()=>{
                //noinspection JSPotentiallyInvalidConstructorUsage
                spyOn(Edit.default.prototype,"render").and.returnValue(<div>Edit</div>);
                // keep it from loading data
                spyOn(EditController.prototype,'componentWillMount').and.returnValue(null);
                spyOn(AppDispatch.default,'dispatch');
                var props={params:{id: -1}};
                var editController = TestUtils.renderIntoDocument(<EditController {...props}  />);
                editController.context = {router: browserHistory};
                editController.onSaveClick();
            });
            it('should send a message to update the database',()=>{
                expect(AppDispatch.default.dispatch.calls.argsFor(0)[0].actionType).toBe(ActionTypes.CRUD_ADD);
            });
        });
    });
});