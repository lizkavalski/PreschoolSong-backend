"use strict";
class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(idOrConditions) {
    if (idOrConditions) {
      if (typeof idOrConditions === 'object') {
        return this.model.findOne({ where: idOrConditions });
      } else {
        return this.model.findOne({ where: { id: idOrConditions } });
      }
    } else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  update(id, data) {
    return this.model
      .findOne({ where: { id } })
      .then((record) => record.update(data));
  }

  delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

module.exports = DataCollection;
