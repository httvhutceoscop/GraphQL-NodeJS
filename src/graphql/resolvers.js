import sequelize from '../models'

export default function resolvers () {
  const models = sequelize.models

  return {
    RootQuery: {
      user (root, { id }, context) {
        return models.User.findByPk(id, context)
      },
      users (root, args, context) {
        return models.User.findAll({}, context)
      },
      project: (root, { id }, context) => {
        return models.Project.findByPk(id, context)
      },
      projects (root, args, context) {
        return models.Project.findAll({}, context)
      },
      task: (root, { id }, context) => {
        return models.Task.findByPk(id, context)
      },
      tasks: (root, args, context) => {
        return models.Task.findAll({}, context)
      }
    },

    User: {
      projects (user) {
        return user.getProjects()
      }
    },

    Project: {
      tasks (project) {
        return project.getTasks()
      }
    },

    RootMutation: {
      createUser: async (root, { input }, context) => {
        const user = await models.User.create(input)
        return user
      },
      updateUser: async (root, { id, input }, context) => {
        await models.User.update(input, {
          where: { id: id }
        })
        const user = await models.User.findByPk(id)
        return user
      },
      removeUser: async (root, { id }, context) => {
        await models.User.destroy({ where: { id: id } })
        const user = await models.User.findByPk(id)
        return user
      }
    }
  }
}
