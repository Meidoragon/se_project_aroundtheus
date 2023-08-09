
/**
 * Code for real time* form validity checking.
 * *or at least as real time as is feasible. ie: every time the user makes a change to a form
 */
export class FormValidator{
  /**
   * 
   * @param {Object} options Object containing settings to use for validation 
   * @param {Element} element element object for which to enable validation
   */
  constructor(options, element){
    this.formSelector = options.formSelector;
    this.inputSelector = options.inputSelector;
    this.submitButtonClass = options.submitButtonClass;
    this.inactiveButtonClass = options.inactiveButtonClass;
    this.inputErrorClass = options.inputErrorClass;
    this.errorClass = options.errorClass;
  }
}