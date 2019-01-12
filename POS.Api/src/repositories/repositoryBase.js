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

  create(plainModel) {
    return this.modelDef.create(plainModel).then(model => {
      return model.get({ plain: true });
    });
  }

  update(id, plainModel) {
    return this.modelDef.findById(id).then(model => {
      if (!!model) {
        return model.update(plainModel).then(() => plainModel);
      }      
    });    
  }

  delete(id) {
    return this.modelDef.findById(id).then(model => model.destroy());
  }

  search(params, where) {
    return this.modelDef.findAndCountAll({
      where,
      order: [[params.orderBy, !!params.isDesc ? 'desc' : 'asc']],
      offset: (params.currentPage - 1) * params.pageSize,
      limit: params.pageSize
    }).then(result => {
      result.rows = result.rows.map(x => x.get({ plain: true }));
      return result;
    });;
  }
}
