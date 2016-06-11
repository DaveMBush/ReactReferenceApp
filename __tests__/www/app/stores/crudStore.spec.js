import * as CrudStore from '../../../../www/app/stores/crudStore.js';
import * as Superagent from 'superagent';
import * as SuperagentMock from 'superagent-mock';
import * as SuperagentConfig from './superAgentMockConfig';
import * as actionTypes from '../../../../www/app/constants/actionTypes';
import * as appDispatch from '../../../../www/app/dispatcher/appDispatcher';
jest.unmock('../../../../www/app/constants/actionTypes');
jest.unmock('./superAgentMockConfig');
jest.unmock('../../../../www/app/stores/crudStore.js');
jest.unmock('../../../../www/app/dispatcher/appDispatcher');
const crudStore = CrudStore.default;
const superAgent = Superagent.default;
const superAgentConfig = SuperagentConfig.default;
const ActionTypes = actionTypes.default;
const AppDispatcher = appDispatch.default;
describe('/tests/www/app/stores/crudStore.spec.js',()=>{
    var callBack = function(){};
    describe('when addChangeListener(callBack) gets called',()=>{
        beforeEach(()=>{
            spyOn(crudStore, 'on');
            crudStore.addChangeListener(callBack);
        });
        it('should call on("change",callback)',()=>{
            expect(crudStore.on).toHaveBeenCalledWith('change',callBack);
        });
    });
    describe('when removeChangeListener(callBack)  gets called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'removeListener');
            crudStore.removeChangeListener(callBack);
        });
        it('should call removeListener("change",callBack)',()=>{
            expect(crudStore.removeListener).toHaveBeenCalledWith('change',callBack);
        });
    });
    describe('when emitChange("x",newData) is called',()=>{
        var newData = {};
        beforeEach(()=>{
            spyOn(crudStore,'emit');
            crudStore.emitChange('x',newData);
        });
        it('should call emit("change","x",newData)',()=>{
            expect(crudStore.emit).toHaveBeenCalledWith('change','x',newData);
        });
    });
    describe('when list() is called',()=>{
        var superMock;
        beforeEach(()=>{
            superMock = SuperagentMock.default(superAgent,superAgentConfig);
        });
        afterEach(()=>{
            superMock.unset();
        });
        describe('and I mock the return value',()=>{
            var mockEnd = {end:function(){}};
            beforeEach(()=>{
                spyOn(superAgent,'get').and.returnValue(mockEnd);
                spyOn(mockEnd,'end');
                crudStore.list();
            });
            it('should call /api/contact',()=>{
                expect(superAgent.get).toHaveBeenCalledWith('/api/contact');
            });
            it('should call end()',()=>{
                expect(mockEnd.end).toHaveBeenCalled();
            });
        });
        describe('and I allow the code to pass through to end',()=>{
            beforeEach(()=>{
                spyOn(crudStore,"emitChange");
                crudStore.list();
            });
            it('should call emitChange(ActionTypes.CRUD_LIST,response',()=>{
                expect(crudStore.emitChange.calls.argsFor(0)[0]).toBe(ActionTypes.CRUD_LIST);
            });
        });
    });
    describe('When del(id) is called',()=>{
        var superMock;
        beforeEach(()=>{
            superMock = SuperagentMock.default(superAgent,superAgentConfig);
        });
        afterEach(()=>{
            superMock.unset();
        });
        describe('and I mock the return value',()=>{
            var mockEnd = {end:function(){}};
            beforeEach(()=>{
                spyOn(superAgent,'del').and.returnValue(mockEnd);
                spyOn(mockEnd,'end');
                crudStore.del(23);
            });
            it('should call /api/contact/id',()=>{
                expect(superAgent.del).toHaveBeenCalledWith('/api/contact/23');
            });
            it('should call end()',()=>{
                expect(mockEnd.end).toHaveBeenCalled();
            });
        });
        describe('and I allow the code to pass through to end',()=>{
            beforeEach(()=>{
                spyOn(crudStore,'list');
                crudStore.del(23);
            });
            it('should call list',()=>{
                expect(crudStore.list).toHaveBeenCalled();
            });
        });
    });
    describe('When get(id) is called',()=>{
        var superMock;
        beforeEach(()=>{
            superMock = SuperagentMock.default(superAgent,superAgentConfig);
        });
        afterEach(()=>{
            superMock.unset();
        });
        describe('and I mock the return value',()=>{
            var mockEnd = {end:function(){}};
            beforeEach(()=>{
                spyOn(superAgent,'get').and.returnValue(mockEnd);
                spyOn(mockEnd,'end');
                crudStore.get(23);
            });
            it('should call /api/contact/id',()=>{
                expect(superAgent.get).toHaveBeenCalledWith('/api/contact/23');
            });
            it('should call end()',()=>{
                expect(mockEnd.end).toHaveBeenCalled();
            });
        });
        describe('and I allow the code to pass through to end',()=>{
            beforeEach(()=>{
                spyOn(crudStore,'emitChange');
                crudStore.get(23);
            });
            it('should call emitChange with ActionTypes.CRUD_GET and { id: "56bbd355c1ebe7c2a70429d3",dob: "6/20/1961 4:00:00 AM", sex: "F", name: "abc"}',()=>{
                expect(crudStore.emitChange.calls.argsFor(0)[0]).toBe(ActionTypes.CRUD_GET);
                expect(crudStore.emitChange.calls.argsFor(0)[1].id).toBe("56bbd355c1ebe7c2a70429d3");
                expect(crudStore.emitChange.calls.argsFor(0)[1].dob.valueOf()).toBe((new Date("6/20/1961 4:00:00 AM").valueOf()));
                expect(crudStore.emitChange.calls.argsFor(0)[1].sex).toBe("F");
                expect(crudStore.emitChange.calls.argsFor(0)[1].name).toBe("abc");
            });
        });
    });
    describe('When save(data) is called',()=>{
        var superMock;
        beforeEach(()=>{
            superMock = SuperagentMock.default(superAgent,superAgentConfig);
        });
        afterEach(()=>{
            superMock.unset();
        });
        describe('and I mock the return value',()=>{
            var mockEnd = {end:function(){}};
            var mockSend = {send:function(){}};
            beforeEach(()=>{
                spyOn(superAgent,'post').and.returnValue(mockSend);
                spyOn(mockSend,'send').and.returnValue(mockEnd);
                spyOn(mockEnd,'end');
                crudStore.save({id:23,name:'dave',dob:new Date('6/20/1961')});
            });
            it('should call /api/contact/id',()=>{
                expect(superAgent.post).toHaveBeenCalledWith('/api/contact/23');
            });
            it('should call send with 23, "dave" and 6/20/61',()=>{
                expect(mockSend.send.calls.argsFor(0)[0].id).toBe(23);
                expect(mockSend.send.calls.argsFor(0)[0].name).toBe('dave');
                expect(mockSend.send.calls.argsFor(0)[0].dob.valueOf()).toBe((new Date('6/20/1961')).valueOf());
            });
            it('should call end()',()=>{
                expect(mockEnd.end).toHaveBeenCalled();
            });
        });
        describe('and I allow the code to pass through to end',()=>{
            beforeEach(()=>{
                spyOn(crudStore,'emitChange');
                crudStore.save({id:23,name:'abc',sex:'F', dob:new Date('6/20/1961 4:00:00 AM')});
            });
            it('should call emitChange with ActionTypes.CRUD_UPDATE and { id: "23",dob: "6/20/1961 4:00:00 AM", sex: "F", name: "abc"}',()=>{
                expect(crudStore.emitChange.calls.argsFor(0)[0]).toBe(ActionTypes.CRUD_UPDATE);
                expect(crudStore.emitChange.calls.argsFor(0)[1].id).toBe(23);
                expect(crudStore.emitChange.calls.argsFor(0)[1].dob.valueOf()).toBe((new Date("6/20/1961 4:00:00 AM").valueOf()));
                expect(crudStore.emitChange.calls.argsFor(0)[1].sex).toBe("F");
                expect(crudStore.emitChange.calls.argsFor(0)[1].name).toBe("abc");
            });
        });
    });
    describe('When add(data) is called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'save');
            crudStore.add({id: 'xyz',dob:'6/2/40',sex: 'F'})
        });
        it('should call save with id=""',()=>{
            expect(crudStore.save.calls.argsFor(0)[0].id).toBe('');
        });
    });
    describe('When AppDispatch.dispatch({actionType:ActionTypes.CRUD_UPDATE}) is called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'save');
            AppDispatcher.dispatch({actionType: ActionTypes.CRUD_UPDATE});
        });
        it('should call crudStore.save()',()=>{
            expect(crudStore.save).toHaveBeenCalled();
        });
    });
    describe('When AppDispatch.dispatch({actionType:ActionTypes.CRUD_ADD}) is called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'add');
            AppDispatcher.dispatch({actionType: ActionTypes.CRUD_ADD});
        });
        it('should call crudStore.add()',()=>{
            expect(crudStore.add).toHaveBeenCalled();
        });
    });
    describe('When AppDispatch.dispatch({actionType:ActionTypes.CRUD_LIST}) is called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'list');
            AppDispatcher.dispatch({actionType: ActionTypes.CRUD_LIST});
        });
        it('should call crudStore.list()',()=>{
            expect(crudStore.list).toHaveBeenCalled();
        });
    });
    describe('When AppDispatch.dispatch({actionType:ActionTypes.CRUD_DEL}) is called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'del');
            AppDispatcher.dispatch({actionType: ActionTypes.CRUD_DEL,data:23});
        });
        it('should call crudStore.del(id)',()=>{
            expect(crudStore.del).toHaveBeenCalledWith(23);
        });
    });
    describe('When AppDispatch.dispatch({actionType:ActionTypes.CRUD_GET}) is called',()=>{
        beforeEach(()=>{
            spyOn(crudStore,'get');
            AppDispatcher.dispatch({actionType: ActionTypes.CRUD_GET,id:23});
        });
        it('should call crudStore.get(id)',()=>{
            expect(crudStore.get).toHaveBeenCalledWith(23);
        });
    });

});
