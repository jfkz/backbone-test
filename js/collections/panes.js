import _ from 'underscore';
import { Collection } from 'backbone';
import Store from 'backbone.localstorage';
import Pane from 'models/pane';

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

  // // Filter down the list of all todo items that are finished.
  // completed() {
  //   return this.where({completed: true});
  // }
  //
  // // Filter down the list to only todo items that are still not finished.
  // remaining() {
  //   return this.where({completed: false});
  // }

  // We keep the panes in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder() {
    return this.length ? this.last().get('order') + 1 : 1;
  }
}

export default new PanesCollection();
