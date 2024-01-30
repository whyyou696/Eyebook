const { database } = require("../config/mongodb")

class User {
    static async getAllUser() {
        const users = database.collection("users")
        const user = await users.find().toArray()
        return user
    }

    static async addUser(user) {
        const users = database.collection("users")
        const newUser = await users.insertOne(user)
        return newUser
    }
}

module.exports = User