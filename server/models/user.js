const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	watchlist: [
		{
		  movieId: {
			type: Number,
			required: true,
		  },
		  title: {
			type: String,
			required: true,
		  },
		  posterPath: {
			type: String,
			required: true,
		  },
		},
	  ],
})

// Define schema methods
userSchema.methods = {
	// Compare passwords
    checkPassword: function (inputPassword) {
        const isMatch = bcrypt.compareSync(inputPassword.toString(), this.password);
        return isMatch;
    },
    hashPassword: function (plainTextPassword) {
        const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
        return hashedPassword;
    }
};

// Define hooks for pre-saving
userSchema.pre("save", async function (next) {
	if (this.isModified("password"))
		this.password = await bcrypt.hash(this.password, 8);
	next();
});

const User = mongoose.model('User', userSchema)
module.exports = User