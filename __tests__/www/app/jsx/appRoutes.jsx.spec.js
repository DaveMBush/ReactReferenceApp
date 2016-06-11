// we use * as Name to get past reference issue.
// See http://stackoverflow.com/questions/34176878/babel-es6-modules-why-is-babel-renaming-imports

import {createMemoryHistory} from 'react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import AppRoutes  from '../../../../www/app/jsx/appRoutes.jsx.js';
import * as EditController  from '../../../../www/app/jsx/edit/editController.jsx.js';
import * as ViewController from '../../../../www/app/jsx/view/viewController.jsx.js';

jest.unmock('../../../../www/app/jsx/appRoutes.jsx.js');

describe('tests/www/js/appRoutes.jsx.spec.js',()=> {
    var shallow;
    var domNode;
    beforeEach(()=>{
        spyOn(ViewController.default.prototype,'render').and.returnValue(<div>ViewController</div>);
        // don't fire the load data stuff or register listener
        spyOn(ViewController.default.prototype,'componentWillMount').and.returnValue(null);
        spyOn(ViewController.default.prototype,'componentWillUnmount').and.returnValue(null);
        spyOn(EditController.default.prototype,'render').and.returnValue(<div>EditController</div>);
    });
    describe('going to "/"',()=>{
        beforeEach(()=>{
            shallow = TestUtils.renderIntoDocument(<AppRoutes history={createMemoryHistory("/")} />);
            domNode = ReactDOM.findDOMNode(shallow);
        });
        it('should render the viewController',()=> {
            expect(domNode.textContent).toBe('ViewController');
        });
        it('should not render the edit',()=>{
            expect(domNode.textContent).not.toBe('EditController');
        });
    });
    describe('going to "/edit"',()=>{
        beforeEach(()=>{
            shallow = TestUtils.renderIntoDocument(<AppRoutes history={createMemoryHistory("/edit")}></AppRoutes>);
            domNode = ReactDOM.findDOMNode(shallow);
        });
        it('should not render the view',()=> {
            expect(domNode.textContent).not.toBe('ViewController');
        });
        it('should render the edit',()=>{
            expect(domNode.textContent).toBe('EditController');
        });
    });
});
