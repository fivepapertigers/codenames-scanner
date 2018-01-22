import DataStore from "./util/data-store";

export default class TermResult {

  static collection = "term-results";

  constructor(id, term, confidence) {
    this.id = id;
    this.term = term;
    this.confidence = confidence;
  }

  async save() {
    const { id, term, confidence } = this;
    await DataStore.save(TermResult.collection, this.id, { id, term, confidence });
    return;
  }

  location() {
    return `${TermResult.collection}/${this.id}`;
  }

}
