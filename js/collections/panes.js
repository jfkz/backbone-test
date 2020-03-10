import _ from 'underscore';
import { Collection } from 'backbone';
import Store from 'backbone.localstorage';
import Pane from 'models/pane';
import { loremIpsum } from "lorem-ipsum";

class PanesCollection extends Collection {
  constructor(models, options) {
    // Reference to this collection's model.
    this.model = Pane;

    // Save all of the todo items under the `"panes"` namespace.
    this.localStorage = new Store('panes-collection');

    // panes are sorted by their original insertion order.
    this.comparator = 'order';

    super(models, options);
  }

  fabriq (paneClass) {
    switch (paneClass) {
      case 'cover':
        return {
          cover: 'images/1.jpg',
          title: loremIpsum({ count: 5, units: "words" }),
          header: loremIpsum({ count: 3, units: "words" }),
          content: loremIpsum({ count: 1, units: "sentences" }),
          order: this.nextOrder()
        };
      case 'title':
        return {
          title: loremIpsum({ count: 5, units: "words" }),
          header: loremIpsum({ count: 3, units: "words" }),
          content: loremIpsum({ count: 1, units: "sentences" }),
          order: this.nextOrder()
        };
      case 'pane':
      default:
        return {
          content: loremIpsum({ count: 5, units: "sentences" }),
          order: this.nextOrder()
        };
    }
  }

  clone(params) {
    delete params.id;
    params.order = params.order + (1 - (params.order - Math.floor(params.order))) / 2;
    console.log(params.order);
    return this.create(params);
  }

  // We keep the panes in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder() {
    return this.length ? Math.ceil(this.last().get('order')) + 1 : 1;
  }
}

export default new PanesCollection();
