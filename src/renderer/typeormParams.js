import { deleteUndefineds } from '../utils/common';

export const typeormParams = (param, req, res) => {
  switch (param.type) {
    case 'typeorm.findOne': {
      const { db } = req.app.locals;
      const { entity, ...rest } = param.content;
      const where = deleteUndefineds({ ...rest.where });

      db.getRepository(entity)
        .findOne({
          ...rest,
          where,
        })
        .then((result) => {
          res.json(result);
        });
      break;
    }
    case 'typeorm.find': {
      const { db } = req.app.locals;
      const { entity, ...rest } = param.content;
      const where = deleteUndefineds({ ...rest.where });

      db.getRepository(entity)
        .find({
          ...rest,
          where,
        })
        .then((result) => {
          res.json(result);
        });
      break;
    }
    case 'typeorm.create': {
      const { db } = req.app.locals;
      const repo = db.getRepository(param.content.entity);
      const newDocument = param.content.fields(req);
      repo.save(newDocument).then((saved) => {
        res.json(saved);
      });
      break;
    }
    case 'typeorm.delete': {
      try {
        const { db } = req.app.locals;
        const params = param.content.fields(req);
        const repo = db.getRepository(param.content.entity);
        const where = deleteUndefineds(params);

        const isID = !!params.id;

        repo
          .findOne(isID ? params.id : where)
          .then((found) => {
            if (!found) {
              res.send('Nothing to remove');
              return;
            }

            repo.remove(found).then(() => {
              res.json('Removed');
            });
          })
          .catch((err) => {
            res.statusCode = 500;
            res.end(err.message);
          });
      } catch (error) {
        console.error(error.message);
      }
      break;
    }
    default:
      break;
  }
};
