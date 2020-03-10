import { Model } from 'backbone';
import { loremIpsum } from "lorem-ipsum";


class Pane extends Model {
  // Default attributes for the pane
  defaults() {
    return {
      title: '',
      class: '',
      active: true,
      content: loremIpsum({ count: 5, units: "sentences" })
    };
  }

  toggle() {
    this.save({
      active: !this.get('active')
    });
  }
}

export default Pane;
