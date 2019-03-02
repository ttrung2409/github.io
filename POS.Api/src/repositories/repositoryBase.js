export default class RepositoryBase {
  constructor(modelDef) {
    this.modelDef = modelDef;
  }

  get(id, { includeDeleted } = {}) {
    return this.modelDef.findById(id, {
      paranoid: includeDeleted ? false : true
    }).then(model => {
      return !!model ? model.get({ plain: true }) : null;
    });
  }

  all() {    
    return this.modelDef.findAll().then(models => models.map(x => x.get({ plain: true })));
  }

  create(plainModel, { transaction } = {}) {    
    return this.modelDef.create(plainModel, { transaction }).then(model => {
      return model.get({ plain: true });
    });
  } 

  update(plainModel, where, { transaction } = {}) {
    return this.modelDef.update(plainModel, {
      where,
      transaction
    }).then(() => {
      return this.modelDef.findOne({ where }).then(model => model.get({ plain: true }));
    }); 
  }

  updateOne(plainModel, where, { transaction } = {}) {
    return this.modelDef.update(plainModel, {
      where,
      transaction
    }).then(() => {
      return this.modelDef.findOne({ where }).then(model => model.get({ plain: true }));
    });
  }

  delete(where, { transaction } = {}) {
    return this.modelDef.destroy(where, {
      transaction
    }); 
  }  
}
