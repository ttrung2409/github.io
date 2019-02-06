export default class RepositoryBase {
  constructor(modelDef) {
    this.modelDef = modelDef;
  }

  get(id) {
    return this.modelDef.findById(id).then(model => {
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
    }); 
  }

  delete(where, { transaction } = {}) {
    return this.modelDef.destroy(where, {
      transaction
    }); 
  }  
}
