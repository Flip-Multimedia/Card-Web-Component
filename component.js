module.exports.CoreComponent = class TextBlockComponent {
  
  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getCategory() {
    return 'Content';
  } 

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDescription() {
    return 'Customizable text block component.';
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDefault() {
    const TYPES = require(__dirname + '/../../utils.js').componentTypes;

    return {
      image: 'https://www.ipabp.org/bundles/faraipgis/images/default_thumbnail.jpg',
      title: 'Business Service',
      body: "Here you can provide more information about the service that you can offer your customers.",
      buttons: [{
        title: 'Learn More',
        class: 'btn btn-primary',
        link: '#'
      }]
    }
  }

  /**
   *
   *
   * @static
   * @param {*} component
   * @return {*} 
   */
  static render(component) {
    const getStyles = require(__dirname + '/../../utils.js').componentTypes.getStyles;

    let buttons = "";
    if(component.buttons && component.buttons.length > 0) {
      for(let button of component.buttons) {
        buttons += `<a class="button ${button.class}" href='${button.link}'>${button.title}</a>`;
      }
    }

    return `
      <div data-type='component' data-drag='no-drag' data-component-type="${component.type}" class='component-dynamic' style="${getStyles(component, 'wrap')}">
        <div data-type='position-wrap' style='${getStyles(component, 'positionWrap')}'>
          
          <div class='card'>
            <img data-attribute='image' class='card-img' src='${component.image}'>
            <div class='card-body' style="${getStyles(component, 'cardBody')}">
              <h5 data-attribute="title" style="${getStyles(component, 'title')}" class='card-title'>${component.title}</h5>
              <p data-attribute="body" style="${getStyles(component, 'body')}">${component.body}</p>
                  
              <div class='buttons-wrap'>
                ${buttons}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Creates an instance of TextBlockComponent.
   * @param {*} component
   */
  constructor(component) {
    this.type = 'cardComponent';

    this.title = '';
    this.image = '';
    this.body = '';

    this.styles = {
      wrap: {
        width: '100%',
        "min-height": '55px',
      },
      cardBody: {
        "border-style": "solid"
      },
      title: {
        "font-size": "16px"
      },

      body: {
        "font-size": "12px"
      }
    };
    this.alignContent = 'left';
    this.buttons = [];

    if(component.title) {
      this.title = component.title;
    }

    if(component.image) {
      this.image = component.image;
    }

    if(component.body) {
      this.body = component.body;
    }

    if(component.alignContent) {
      this.alignContent = component.alignContent;
    }

    if(component.buttons) {
      this.buttons = component.buttons;
    }

    this.defineEditorUI();
  }

  /**
   *
   *
   */
  defineEditorUI() {
    const TYPES = require('../../utils.js').componentTypes;
    const ui = new TYPES.EditorUI();

    // UI section for setting the title of the text component. 
    ui.addSection(new TYPES.EditorUISection('Update Card Component', [
      new TYPES.EditorUIAttribute({
        label: 'Update Image',
        uiInputType: 'image',

        // update the title attribute of this object.
        targetAttribute: 'image'
      }),

      new TYPES.EditorUIAttribute({
        label: 'Set Title Text',
        uiInputType: 'text',

        // update the title attribute of this object.
        targetAttribute: 'title'
      }),

      new TYPES.EditorUIAttribute({
        label: 'Set Content',
        uiInputType: 'textarea',

        // update the title attribute of this object.
        targetAttribute: 'body'
      })
    ]));

    // UI section for the card body border
    ui.addSection(new TYPES.EditorUISection('Update Content Border', [
      new TYPES.EditorUIAttribute({
        label: 'Update Border Width',
        uiInputType: 'numberPx',

        isStylesAttribute: true,
        targetStyleElement: 'cardBody',
        targetAttribute: 'border-width'
      })
    ]));

    // ui.addSection(new module.exports.EditorUISection('Update Text Style', [
    //   new module.exports.EditorUIAttribute({
    //     label: 'Set Title Colour',
    //     uiInputType: 'colour',

    //     // update the title attribute of this object.
    //     isStylesAttribute: true,
    //     targetStyleElement: 'wrap',
    //     targetAttribute: 'color'
    //   }),
    // ]));

    this.editorUi = ui;
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getType() {
    return 'textBlockComponent';
  }

  /**
   *
   *
   * @param {*} style
   * @param {*} value
   */
  setStyle(style, value) {
    this.styles[style] = value;
  }

  /**
   *
   *
   * @param {*} button
   */
  addButton(button) {
    if(button.title) {

      // append default link.
      if(!button.link) {
        button.link = '#';
      }

      // append the default styles from the users pallet.
      if(!button.styles) {
        button.styles = {};
      } 

      // push the button to the button stack.
      this.buttons.push(button); 
    }
    else {
      throw 'Button must provide a title.';
    }
  }
} 