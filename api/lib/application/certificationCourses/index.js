const certificationCourseController = require('./certification-course-controller');

exports.register = function(server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/api/admin/certifications/{id}/details',
      config: {
        handler: certificationCourseController.computeResult,
        tags: ['api']
      }
    },
    {
      method: 'GET',
      path: '/api/admin/certifications/{id}',
      config: {
        handler: certificationCourseController.getResult,
        tags: ['api']
      }
    },
    {
      method: 'PATCH',
      path: '/api/certification-courses/{id}',
      config: {
        handler: certificationCourseController.update,
        tags: ['api']
      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'certification-courses-api',
  version: '1.0.0'
};
