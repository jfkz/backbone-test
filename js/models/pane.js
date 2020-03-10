import { Model } from 'backbone';

class Pane extends Model {
  // Default attributes for the pane
  defaults() {
    return {
      title: '',
      header: '',
      cover: '',
      active: true,
      cssClass: '',
      content: ''
    };
  }

  getClass() {
    var cssClass = '';
    if (!this.get('active')) {
      cssClass += ' uk-section-muted';
    }
    if (this.get('header') || this.get('title')) {
      cssClass += ' uk-text-center';
    }
    if (this.get('cover')) {
      cssClass += ' uk-cover-container';
      // cssClass += ' uk-inline';
    }
    return cssClass;
  }

  getCssProperties() {
    if (this.get('cover')) {
      return {
        'uk-height-viewport': true
      };
    }
    return {};
  }

  toggle() {
    this.save({
      active: !this.get('active')
    });
  }
}

export default Pane;
