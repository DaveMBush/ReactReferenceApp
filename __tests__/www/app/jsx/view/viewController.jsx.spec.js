
// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import {browserHistory} from 'react-router';

import ViewController  from '../../../../../www/app/jsx/view/viewController.jsx.js';
import * as View  from '../../../../../www/app/jsx/view/view.jsx.js';
import * as CrudStore from '../../../../../www/app/stores/crudStore.js';
import * as AppDispatch from '../../../../../www/app/dispatcher/appDispatcher.js';
import * as constants from '../../../../../www/app/constants/actionTypes.js'
var ActionTypes = constants.default;
jest.unmock('../../../../../www/app/jsx/view/viewController.jsx.js');

describe('tests/www/app/jsx/view/viewController.jsx.spec.js',()=>{
    beforeEach(()=>{
        ViewController.contextTypes = {
            router: function(){return browserHistory}
        };
    });
    describe('rendering the ViewController',()=>{
        var viewController;
        beforeEach(()=>{
            spyOn(View.default.prototype,"render").and.returnValue(<div>View</div>);
            // keep it from loading data
            spyOn(ViewController.prototype,'componentWillMount').and.returnValue(null);

            var renderedComponent = TestUtils.renderIntoDocument(<ViewController  />);
            viewController = ReactDOM.findDOMNode(renderedComponent);
        });
        it('should render the view controller',()=>{
            expect(viewController).toBeDefined();
        });
        it('should render DIV',()=>{
            expect(viewController.tagName).toBe('DIV');
        });
        it('should contain "View" as the content',()=>{
            expect(viewController.textContent).toBe('View');
        });
        it('should call componentWillMount',()=>{
            expect(ViewController.prototype.componentWillMount).toHaveBeenCalled();
        });
    });
    describe('calling componentWillMount',()=>{
        var viewController;
        beforeEach(()=>{
            viewController = new ViewController();
            spyOn(CrudStore.default,'addChangeListener').and.returnValue(null);
            spyOn(AppDispatch.default,'dispatch').and.returnValue(null);
            spyOn(viewController,'onChange');
            viewController.componentWillMount();
        });
        afterEach(()=>{
            viewController = null;
        })
        it('should add a change listener to onChange',()=>{
            expect(CrudStore.default.addChangeListener).toHaveBeenCalledWith(viewController.onChange);
        });
    });
    describe('calling componentWillUnmount',()=>{
        var viewController;
        beforeEach(()=>{
            viewController = new ViewController();
            spyOn(CrudStore.default,'removeChangeListener').and.returnValue(null);
            viewController.componentWillUnmount();
        });
        afterEach(()=>{
            viewController = null;
        });
        it('should remove a change listener',()=>{
            expect(CrudStore.default.removeChangeListener).toHaveBeenCalledWith(viewController.onChange);
        })
    });
    describe('calling onChange', () =>{
        var viewController;
        var listData =  {body: []};
        beforeEach(()=>{
            viewController = new ViewController();
            spyOn(viewController,'setState');
        });
        describe('with ActionTypes.CRUD_LIST and  {body:[]}',()=>{
            beforeEach(()=>{
                viewController.onChange(ActionTypes.CRUD_LIST,listData);
            });
            it('should call setState with {body: []}',()=>{
                expect(viewController.setState).toHaveBeenCalled();
                expect(viewController.setState.calls.mostRecent().args[0].data).toBe(listData.body);
            });
        });
        describe('with ActionTypes.CRUD_ADD',()=>{
            beforeEach(()=>{
                viewController.onChange(ActionTypes.CRUD_ADD,null);
            });
            it('should not call setState()',()=>{
                expect(viewController.setState).not.toHaveBeenCalled();
            });
        });
    });
    describe('calling onDelete()',()=>{
        var viewController;
        beforeEach(()=>{
            viewController = new ViewController();
            spyOn(AppDispatch.default,'dispatch').and.returnValue(null);
            viewController.onDelete(1);
        });
        it('should call AppDispatch.dispatch({ActionType:ActionTypes.CRUD_DEL,data:1}',()=>{
            expect(AppDispatch.default.dispatch).toHaveBeenCalled();
            expect(AppDispatch.default.dispatch.calls.first().args[0].actionType).toBe(ActionTypes.CRUD_DEL);
            expect(AppDispatch.default.dispatch.calls.first().args[0].data).toBe(1);
        });
    });
    describe('calling onAdd()',()=>{
        var viewController;
        beforeEach(()=>{
            viewController = new ViewController();
            viewController.context = {router: browserHistory};
            spyOn(browserHistory,'push');
            viewController.onAdd();
        });
        it('should call browserHistory.push with "/Edit"',()=>{
            expect(browserHistory.push).toHaveBeenCalledWith('/Edit');
        });
    });
    describe('calling onEdit(1)',()=>{
        var viewController;
        beforeEach(()=>{
            var viewController = TestUtils.renderIntoDocument(<ViewController  />);
            viewController.context = {router: browserHistory};
            spyOn(browserHistory,'push');
            viewController.onEdit(1);
        });
        it('should call browserHistory.push with "/Edit/1"',()=>{
            expect(browserHistory.push).toHaveBeenCalledWith('/Edit/1');
        });
    });
});