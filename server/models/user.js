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

    static async getByUsername({ username}) {
        const users = database.collection("users")
        const user = await users.findOne({ username })
        return user
    }

    static async getByEmail({ email }) {
        const users = database.collection("users")
        const user = await users.findOne({ email })
        return user
    }
}

module.exports = User