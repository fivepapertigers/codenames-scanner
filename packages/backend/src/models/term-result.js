import DataStore from "./util/data-store";

export default class TermResult {

  static collection = "term-results";

  constructor(id, term) {
    this.id = id;
    this.term = term;
  }

  async save() {
    const { id, term } = this;
    await DataStore.save(TermResult.collection, this.id, { id, term });
    return;
  }
}
