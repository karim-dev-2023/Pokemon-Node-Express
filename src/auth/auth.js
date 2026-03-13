import jwt from 'jsonwebtoken'
import { private_key } from './private_key.js'

export default function authMdlr(req, res, next) {
  const authorizationHeader = req.headers.authorization
  console.log("authorisation header = " + authorizationHeader);

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }

  const token = authorizationHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, private_key)
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      return res.status(401).json({ message })
    } else {
      next()
    }
  } catch (error) {
    const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`
    return res.status(401).json({ message, data: error })
  }
}