import { User } from '../database/sequelize.js';
import bcrypt from 'bcrypt';

export function userLogin(app) {
  app.post('/api/login', (req, res) => {
    console.log('req.body:', req.body);

    User.findOne({ where: { username: req.body.username } }).then(user => {

      if (!user) {
        const message = `L'utilisateur demandé n'existe pas.`
        return res.status(404).json({ message })
      }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if (!isPasswordValid) {
          const message = `Le mot de passe saisi n'est pas correct`
          return res.status(401).json({ message })
        }

        const message = `L'utilisateur a été connecté avec succès`
        return res.json({ message, data: { id: user.id, username: user.username } })
      })
    })
    .catch(error => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
      return res.status(500).json({ message, data: error })
    })
  })
}