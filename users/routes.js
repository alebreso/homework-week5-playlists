const {Router} = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/users', (req, res, next) => {
	if(req.body.password === req.body.confirm){
		const user = {
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
		}
		User
			.create(user)
			.then(entity => {
				res.send({
					id: entity.id,
					email: entity.email
				})
			})
			.catch(err => {
				console.error(err)
				res.status(500).send({
					message: 'Something went wrong'
				})
			})
	}else{
		res.status(422).send({message: 'password is not the same'})
	}
		
})

module.exports = router