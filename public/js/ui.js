// This script contains jComponent UI components
// CSS: /themes/***/public/css/ui.css

// Component: Checkbox
// <div data-component="checkbox" ...>
COMPONENT('checkbox', function() {

	var self = this;
	var isRequired = self.element.attr('data-required') === 'true';

	self.validate = function(value) {
		var is = false;
		var t = typeof(value);
		if (t === 'undefined' || t === 'object')
			value = '';
		else
			value = value.toString();
		is = isRequired ? value === 'true' || value === 'on' : true;
		return is;
	};

	self.make = function() {
		var element = self.element;
		var html = '<label><input type="checkbox" data-component-bind="" /> <span' + (isRequired ? ' class="ui-checkbox-label-required"' : '') + '>' + element.html() + '</span></label>';
		element.addClass('ui-checkbox');
		element.html(html);
	};
});

// Component: Textbox
// <div data-component="textbox" ...>
COMPONENT('textbox', function() {

	var self = this;
	var isRequired = self.attr('data-required') === 'true';

	self.validate = function(value) {

		var is = false;
		var t = typeof(value);

		if (self.find('input').prop('disabled'))
			return true;

		if (t === 'undefined' || t === 'object')
			value = '';
		else
			value = value.toString();

		is = isRequired ? self.type === 'email' ? value.isEmail() : self.type === 'currency' ? value > 0 : value.length > 0 : true;
		return is;
	};

	self.make = function() {

		var attrs = [];

		function attr(name) {
			var a = self.element.attr(name);
			if (!a)
				return;
			attrs.push(name.substring(name.indexOf('-') + 1) + '="' + a + '"');
		}

		attr('data-placeholder');
		attr('data-maxlength');

		var content = self.html();
		var icon = self.attr('data-icon');
		var align = self.attr('data-align');
		var delay = self.attr('data-component-keypress-delay');
		var keypress = self.attr('data-component-keypress');

		var html = '<input type="' + (self.type === 'password' ? 'password' : 'text') + '" data-component-bind=""' + (attrs.length ? ' ' + attrs.join('') : '') + (align ? ' class="' + align + '"' : '') + (self.attr('data-autofocus') === 'true' ? ' autofocus="autofocus"' : '') + ' />';

		if (!content.length) {
			self.element.addClass('ui-textbox ui-textbox-container');
			self.element.append(html);
			return;
		}

		self.element.empty();
		self.element.addClass('ui-textbox-container');
		self.element.append('<div class="ui-textbox-label' + (isRequired ? ' ui-textbox-label-required' : '') + '">' + (icon ? '<span class="fa ' + icon + '"></span> ' : '') + content + ':</div><div class="ui-textbox">' + html + '</div>');
	};

	self.state = function(type) {
		self.find('.ui-textbox').toggleClass('ui-textbox-invalid', self.isInvalid());
	};
});

// Component: Textarea
// <div data-component="textarea" ...>
COMPONENT('textarea', function() {

	var self = this;
	var isRequired = self.attr('data-required') === 'true';

	this.validate = function(value) {
		var is = false;
		var t = typeof(value);

		if (t === 'undefined' || t === 'object')
			value = '';
		else
			value = value.toString();

		is = isRequired ? self.type === 'number' ? value > 0 : value.length > 0 : true;
		return is;
	};

	self.make = function() {

		var attrs = [];

		function attr(name) {
			var a = self.attr(name);
			if (!a)
				return;
			attrs.push(name.substring(name.indexOf('-') + 1) + '="' + a + '"');
		}

		attr('data-placeholder');
		attr('data-maxlength');

		var element = self.element;
		var height = element.attr('data-height');
		var icon = element.attr('data-icon');
		var content = element.html();
		var html = '<textarea data-component-bind=""' + (attrs.length > 0 ? ' ' + attrs.join('') : '') + (height ? ' style="height:' + height + '"' : '') + (element.attr('data-autofocus') === 'true' ? ' autofocus="autofocus"' : '') + '></textarea>';

		if (content.length === 0) {
			element.addClass('ui-textarea');
			element.append(html);
			return;
		}

		element.empty();
		element.append('<div class="ui-textarea-label' + (isRequired ? ' ui-textarea-label-required' : '') + '">' + (icon ? '<span class="fa ' + icon + '"></span> ' : '') + content + ':</div>');
		element.append('<div class="ui-textarea">' + html + '</div>');
	};

	self.state = function(type) {
		self.element.find('.ui-textarea').toggleClass('ui-textarea-invalid', self.isInvalid());
	};
});

// Component: Dropdown
// <div data-component="dropdown" ...>
COMPONENT('dropdown', function() {

	var self = this;
	var isRequired = self.attr('data-required') === 'true';

	self.validate = function(value) {

		if (value === null || value === undefined || typeof(value) === 'object')
			value = '';
		else
			value = value.toString();

		return isRequired ? self.type === 'number' ? value > 0 : value.length > 0 : true;
	};

	self.render = function(arr) {

		var builder = [];
		var value = self.get();
		var el = self.find('select').empty();
		var kt = self.attr('data-source-text') || 'name';
		var kv = self.attr('data-source-value') || 'id';

		if (self.attr('data-empty') === 'true')
			builder.push('<option value="">' + (self.attr('data-empty-text') || '') + '</option>');

		for (var i = 0, length = arr.length; i < length; i++) {
			var item = arr[i];
			if (typeof(item) === 'string')
				builder.push('<option value="' + item + '"' + (value == item ? ' selected="selected"' : '') + '>' + item + '</option>');
			else
				builder.push('<option value="' + item[kv] + '"' + (value == item[kv] ? ' selected="selected"' : '') + '>' + item[kt] + '</option>');
		}

		var disabled = arr.length === 0;
		el.parent().toggleClass('ui-disabled', disabled);
		el.prop('disabled', disabled);
		el.html(builder.join(''));
	};

	self.make = function() {

		var options = [];
		var element = self.element;
		var arr = (element.attr('data-options') || '').split(';');

		for (var i = 0, length = arr.length; i < length; i++) {
			var item = arr[i].split('|');
			options.push('<option value="' + (item[1] === undefined ? item[0] : item[1]) + '">' + item[0] + '</option>');
		}

		self.element.addClass('ui-dropdown-container');

		var content = element.html();
		var icon = element.attr('data-icon');
		var html = '<div class="ui-dropdown"><span class="fa fa-sort"></span><select data-component-bind="">' + options.join('') + '</select></div>';

		if (content.length > 0) {
			element.empty();
			element.append('<div class="ui-dropdown-label' + (isRequired ? ' ui-dropdown-label-required' : '') + '">' + (icon ? '<span class="fa ' + icon + '"></span> ' : '') + content + ':</div>');
			element.append('<div class="ui-dropdown-values">' + html + '</div>');
		} else {
			element.addClass('ui-dropdown-values');
			element.append(html);
		}

		var datasource = element.attr('data-source');
		if (!datasource)
			return;

		var prerender = function(path) {
			var value = self.get(datasource);
			if (NOTMODIFIED(self.id, value))
				return;
			if (!value)
				value = [];
			self.render(value);
		};

		self.watch(datasource, prerender, true);
	};

	self.state = function(type) {
		self.find('.ui-dropdown').toggleClass('ui-dropdown-invalid', self.isInvalid());
	};
});

// Component: Error
// <div data-component="error" ...>
COMPONENT('error', function() {
	var self = this;
	var element;

	self.readonly();

	self.make = function() {
		self.element.append('<ul class="ui-error hidden"></ul>');
		element = self.element.find('ul');
	};

	self.setter = function(value) {

		if (!(value instanceof Array) || value.length === 0) {
			element.addClass('hidden');
			return;
		}

		var builder = [];
		for (var i = 0, length = value.length; i < length; i++)
			builder.push('<li><span class="fa fa-times-circle"></span> ' + value[i].error + '</li>');

		element.html(builder.join(''));
		element.removeClass('hidden');
	};
});

// Component: EU Cookie
// <div data-component="cookie" ...>
COMPONENT('cookie', function() {
	var self = this;
	self.readonly();
	self.make = function() {
		var cookie = localStorage.getItem('cookie');
		if (cookie) {
			self.element.addClass('hidden');
			return;
		}

		self.element.removeClass('hidden').addClass('ui-cookie');
		self.element.append('<button>' + (self.attr('data-button') || 'OK') + '</button>');
		self.element.on('click', 'button', function() {
			localStorage.setItem('cookie', '1');
			self.element.addClass('hidden');
		});
	};
});

// Component: Visible
// <div data-component="visible" ...>
COMPONENT('visible', function() {
	var self = this;
	var condition = self.attr('data-if');
	self.readonly();
	self.setter = function(value) {

		var is = true;

		if (condition)
			is = EVALUATE(self.path, condition);
		else
			is = value ? true : false;

		self.element.toggleClass('hidden', !is);
	};
});

// Component: Validation
// <div data-component="validation" ...>
COMPONENT('validation', function() {

	var self = this;
	var path;
	var buttons;

	self.readonly();

	self.make = function() {
		buttons = self.element.find('button');
		buttons.prop({ disabled: true });
		path = self.path;
		if (path.lastIndexOf('*') === -1)
			path += '.*';
		self.evaluate = self.attr('data-if');
		self.watch(self.path, function() {
			var disabled = $.components.disable(path);
			if (!disabled && self.evaluate)
				disabled = !EVALUATE(self.path, self.evaluate);
			buttons.prop({ disabled: disabled });
		}, true);
	};

	self.state = function() {
		var disabled = $.components.disable(path);
		if (!disabled && self.evaluate)
			disabled = !EVALUATE(self.path, self.evaluate);
		buttons.prop({ disabled: disabled });
	};
});

// Component: Click
// <div data-component="click" ...>
COMPONENT('click', function() {
	var self = this;

	self.make = function() {

		self.element.on('click', function() {
			self.get(self.path)();
		});

		var enter = self.attr('data-enter');
		if (!enter)
			return;

		$(enter).on('keydown', 'input', function(e) {
			if (e.keyCode !== 13)
				return;
			setTimeout(function() {
				if (self.element.get(0).disabled === true)
					return;
				self.get(self.path)();
			}, 100);
		});
	};

	self.readonly();
});