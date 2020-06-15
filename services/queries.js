"use strict";

const saveData = function (model, data) {
  return model.create(data);
};

const findOne = function (model, query) {
  return model.findOne(query);
};

const update = function (model, dataToUpdate, options) {
  return model.update(dataToUpdate, options);
};

const findAndCountAll = function (model, options) {
  return model.findAndCountAll(options);
};

//
const findAndCountAllWithReferences = function (
  model,
  options,
  include
) {
  options = {
    ...options,
    include: include
  };
  
  return model.findAndCountAll(options);
};

module.exports = {
  update: update,
  findOne: findOne,
  saveData: saveData,
  findAndCountAll: findAndCountAll,
  findAndCountAllWithReferences: findAndCountAllWithReferences,
};
