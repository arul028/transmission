/*
 *	Copyright © Dave Perrett and Malcolm Jarvis
 *	This code is licensed under the GPL version 2.
 *	For more details, see http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * Class Dialog
 */

function Dialog(){
	this.initialize();
}

Dialog.prototype = {

	/*
	 * Constructor
	 */
	initialize: function() {
		
		/*
		 * Private Interface Variables
		 */
		this._container = $('#dialog_container');
		this._heading = $('#dialog_heading');
		this._message = $('#dialog_message');
		this._cancel_button = $('#dialog_cancel_button');
		this._confirm_button = $('#dialog_confirm_button');
		this._callback_function = '';
		this._callback_data = null;
		
		// Observe the buttons
		this._cancel_button.bind('click', {dialog: this}, this.onCancelClicked);
		this._confirm_button.bind('click', {dialog: this}, this.onConfirmClicked);
	},





	/*--------------------------------------------
	 *
	 *  E V E N T   F U N C T I O N S
	 *
	 *--------------------------------------------*/

	hideDialog: function()
	{
		$('body.dialog_showing').removeClass('dialog_showing');
		this._container.hide();
		transmission.hideMobileAddressbar();
		transmission.updateButtonStates();
	},

	onCancelClicked: function(event)
	{
		event.data.dialog.hideDialog();
	},

	onConfirmClicked: function(event)
	{
		var dialog = event.data.dialog;
		eval(dialog._callback_function + "(dialog._callback_data)");
		dialog.hideDialog();
	},

	/*--------------------------------------------
	 *
	 *  I N T E R F A C E   F U N C T I O N S
	 *
	 *--------------------------------------------*/

	/*
	 * Display a confirm dialog
	 */
	confirm: function(dialog_heading, dialog_message, confirm_button_label,
	                  callback_function, callback_data, cancel_button_label)
	{
		if (!isMobileDevice)
			$('.dialog_container').hide();
		setInnerHTML(this._heading[0], dialog_heading);
		setInnerHTML(this._message[0], dialog_message);
		setInnerHTML(this._cancel_button[0], (cancel_button_label == null) ? 'Cancel' : cancel_button_label);
		setInnerHTML(this._confirm_button[0], confirm_button_label);
		this._confirm_button.show();
		this._callback_function = callback_function;
		this._callback_data = callback_data;
		$('body').addClass('dialog_showing');
		this._container.show();
		transmission.updateButtonStates();
		if (isMobileDevice)
			transmission.hideMobileAddressbar();
	},

	/*
	 * Display an alert dialog
	 */
	alert: function(dialog_heading, dialog_message, cancel_button_label) {
		if (!isMobileDevice)
			$('.dialog_container').hide();
		setInnerHTML(this._heading[0], dialog_heading);
		setInnerHTML(this._message[0], dialog_message);
		// jquery::hide() doesn't work here in Safari for some odd reason
		this._confirm_button.css('display', 'none');
		setInnerHTML(this._cancel_button[0], cancel_button_label);
		// Just in case
		$('#upload_container').hide();
		$('body').addClass('dialog_showing');
		transmission.updateButtonStates();
		if (isMobileDevice)
			transmission.hideMobileAddressbar();
		this._container.show();
	}
	

}
