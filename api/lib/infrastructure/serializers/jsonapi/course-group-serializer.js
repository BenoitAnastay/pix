const JSONAPISerializer = require('./jsonapi-serializer');

class courseGroupSerializer extends JSONAPISerializer {

  constructor() {
    super('course-group');
  }

  serialize(modelObject) {
    const response = super.serialize(modelObject);
    response.included = [];
    if (modelObject.courses) {
      for (const course of modelObject.courses) {
        response.included.push(this.serializeIncluded(course));
      }
    }

    return response;
  }

  serializeArray(modelObjects) {
    const response = {};
    response.data = [];
    response.included = [];
    for (const modelObject of modelObjects) {
      response.data.push(this.serializeModelObject(modelObject));

      if (modelObject.courses) {
        for (const course of modelObject.courses) {
          response.included.push(this.serializeIncluded(course));
        }
      }
    }
    return response;
  }

  serializeAttributes(model, serializedModel) {
    serializedModel.attributes['name'] = model.name;
  }

  serializeRelationships(model, serializedModel) {

    if (model.courses) {
      serializedModel.relationship = {
        courses: {
          data: []
        }
      };

      for (const course of model.courses) {
        serializedModel.relationship.courses.data.push({
          'id': course.id,
          'type': 'courses'
        });
      }
    }
  }

  serializeIncluded(course) {
    return {
      'type': 'courses',
      'id': course.id,
      attributes: {
        'name': course.name,
        'description': course.description,
        'image-url': course.imageUrl
      }
    };
  }

  deserialize() {
  }

}

module.exports = new courseGroupSerializer();
