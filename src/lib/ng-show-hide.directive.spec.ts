import { async, TestBed , ComponentFixture} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NgShowHideModule } from './ng-show-hide.module';
import { Component } from '@angular/core';
import { NgShowHideDirective } from './ng-show-hide.directive';
import { By } from '@angular/platform-browser';

@Component({
    template: `
     <h1 class="_1" *showIf="true">Show</h1>
     <h2 class="_2" *showIf="false">Don't Show</h2>
     <div class="_3" *showIf="nan">Don't Show</div>
     <input class="_4" *showIf="{object: true}" value="show this"/>`
})
class TestShowIfComponent{}

describe('NgShowHideModule', () => {
    let fixture: ComponentFixture<TestShowIfComponent>;
    let _1: DebugElement, _2:DebugElement, _3: DebugElement, _4: DebugElement;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [NgShowHideModule],
            declarations: [TestShowIfComponent]
        }).createComponent(TestShowIfComponent);
        fixture.detectChanges(); // initial binding
        _1 = fixture.debugElement.query(By.css("._1"));
        _2 = fixture.debugElement.query(By.css("._2"));
        _3 = fixture.debugElement.query(By.css("._3"));
        _4 = fixture.debugElement.query(By.css("._4"));
    });
    it('should create', () => {
        expect(NgShowHideModule).toBeDefined();
    });
    it("should work without import the directive", () => {
        expect(NgShowHideDirective).toBeDefined();
    });
    it("_1 should show", () => {
        expect(_1.styles["display"]).not.toEqual("none");
    })
    it("_2 should not show", () => {
        expect(_2.styles["display"]).toEqual("none");
    })
    it("_3 should not show", () => {
        expect(_3.styles["display"]).toEqual("none");
    })
    it("_4 should show", () => {
        expect(_4.styles["display"]).not.toEqual("none");
    })

});

describe('Explixitly import', () => {
    let fixture: ComponentFixture<TestShowIfComponent>;
    let _1: DebugElement, _2:DebugElement, _3: DebugElement, _4: DebugElement;
    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestShowIfComponent, NgShowHideDirective]
        }).createComponent(TestShowIfComponent);
        fixture.detectChanges(); // initial binding
        _1 = fixture.debugElement.query(By.css("._1"));
        _2 = fixture.debugElement.query(By.css("._2"));
        _3 = fixture.debugElement.query(By.css("._3"));
        _4 = fixture.debugElement.query(By.css("._4"));
    });
    it('should be defined', () => {
        expect(NgShowHideModule).toBeDefined();
    });
    it("should work with explixitly import and declare the directive", () => {
        expect(NgShowHideDirective).toBeDefined();
    });
    it("_1 should show", () => {
        expect(_1.styles["display"]).not.toEqual("none");
    })
    it("_2 should not show", () => {
        expect(_2.styles["display"]).toEqual("none");
    })
    it("_3 should not show", () => {
        expect(_3.styles["display"]).toEqual("none");
    })
    it("_4 should show", () => {
        expect(_4.styles["display"]).not.toEqual("none");
    })

});
