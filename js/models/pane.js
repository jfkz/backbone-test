import { Model } from 'backbone';

class Pane extends Model {
  // Default attributes for the todo
  defaults() {
    return {
      title: '',
      active: true
    };
  }

  toggle() {
    this.save({
      active: !this.get('active')
    });
  }
}

export default Pane;
