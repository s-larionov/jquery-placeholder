(function($) {// secure $ jQuery alias
/*******************************************************************************************/
// jquery-placeholder.js - rev 1
// Copyright (c) 2011, Larry (http://larionov.biz)
// Liscensed under the BSD License (BSD-LICENSE.txt)
// Created: 2011-07-25
/*******************************************************************************************/

$.Placeholder = function(element, config) {
	var self = this;

	this.element= $(element);
	this.config	= $.extend({}, this.defaultConfig, config || {});
	this.config.isPassword = (this.element.attr('type') == 'password');

	this.element.focus(function() {self.hide();})
		.blur(function() {self.tryShow();});
	this.init()
		.tryShow();

	this.element.parents('form').submit(function() {
		self.hide();
	});
};

$.Placeholder.prototype.defaultConfig = {
	placeholder: null,
	classPlaceholder: 'placeholder'
};

/**
 * @return {$.Placeholder}
 */
$.Placeholder.prototype.tryShow = function() {
	var value = $.trim(this.element.val());
	if (value == '' || value == this.config.placeholder) {
		this.element
			.addClass(this.config.classPlaceholder)
			.val(this.config.placeholder);
		if (this.config.isPassword) {
			this.element.prop('type', 'text');
		}
	}
	return this;
};

/**
 * @return {$.Placeholder}
 */
$.Placeholder.prototype.hide = function() {
	if ($.trim(this.element.val()) == this.config.placeholder) {
		this.element
			.removeClass(this.config.classPlaceholder)
			.val('');
		if (this.config.isPassword) {
			this.element.prop('type', 'password');
		}
	}
	return this;
};

/**
 * @return {$.Placeholder}
 */
$.Placeholder.prototype.init = function() {
	this.config.placeholder = this.preparePlaceholder();
	return this;
};

/**
 * @return {String}
 */
$.Placeholder.prototype.preparePlaceholder = function() {
	return this.element.data('placeholder') || this.config.placeholder;
};

/**
 * @param {jQuery} config
 */
$.fn.Placeholder = function(config) {
	return this.each(function() {
		new $.Placeholder(this, config);
	});
}

// Автоматический вызов для всех, у кого есть атрибут data-placeholder
$(function() {
	$('input[data-placeholder],textarea[data-placeholder]').Placeholder();
});

})(jQuery);
