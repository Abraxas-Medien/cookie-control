/**
 * Created by Adrian Tello on 10.08.15.
 */
describe("axs-cookie-control plugin should", function() {
	var widgetElement;

	beforeEach(function() {
		widgetElement = $("<div></div>");
		widgetElement.cookieControl();
	});

	it("become the expected structure and classes when initialized", function() {
		expect(widgetElement.hasClass('axs-cookie-control')).toBe(true);

		var wrapper = widgetElement.children();
		expect(wrapper.hasClass('axs-cookie-control-wrapper')).toBe(true);

		//Validate that has 2 children (text-wrapper and buttons-div...)
		var children = wrapper.children();
		expect(children.length).toBe(2);

		var textWrapper = $(children[0]);
		expect(textWrapper.hasClass('axs-cookie-control-text-wrapper')).toBe(true);
		expect(textWrapper.text().length).not.toBe(0);

		var buttonsDiv = $(children[1]);
		expect(buttonsDiv.hasClass('axs-cookie-control-buttons')).toBe(true);

		var buttons = buttonsDiv.children();
		expect(buttons.length).toBe(2);

		var declineButton = $(buttons[0]);
		expect(declineButton.hasClass('axs-cookie-control-decline-button')).toBe(true);
		expect(declineButton.text().length).not.toBe(0);

		var acceptButton = $(buttons[1]);
		expect(acceptButton.hasClass('axs-cookie-control-accept-button')).toBe(true);
		expect(acceptButton.text().length).not.toBe(0);
	});

	it('should leave the dom as before creating the widget, when calling destroy', function(){
		widgetElement.cookieControl('destroy');

		var children = widgetElement.children();

		expect(children.length).toBe(0);
		expect(widgetElement.hasClass('axs-cookie-control')).toBe(false);
		expect(widgetElement.hasClass('top')).toBe(false);
		expect(widgetElement.hasClass('bottom')).toBe(false);
		expect(widgetElement.hasClass('hidden')).toBe(false);
	});

	it('should fire a status changed event when the status changes', function(){
		var called = false;
		var values = {};

		var listener = function(event, listValues){
			called = true;
			values = listValues;
		};

		widgetElement.on('cookiecontrolchangedstatus', listener);

		//Change the status to declined
		widgetElement.cookieControl('setStatus', false);

		expect(called).toBe(true);
		expect(values).toEqual({
			before: undefined,
			after: false
		});

		//Reset
		called = false;
		values = {};

		//Change the status to declined (no real change)
		widgetElement.cookieControl('setStatus', false);
		expect(called).toBe(false);

		//Change the status to accepted
		widgetElement.cookieControl('setStatus', true);
		expect(called).toBe(true);
		expect(values).toEqual({
			before: false,
			after: true
		});

		//Reset
		called = false;
		values = {};

		//Set the default status
		widgetElement.cookieControl('setStatus', undefined);
		expect(called).toBe(true);
		expect(values).toEqual({
			before: true,
			after: undefined
		});

		//Remove cookies after the test has run
		$.removeCookie('axs-cookie-control', {path: '/'});
	});
});