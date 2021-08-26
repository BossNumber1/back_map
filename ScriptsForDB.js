let db;

module.exports = class ScriptsForDB {
    static setDB(newDB) {
        db = newDB;
    }

    // добавляем юзера
    static async saveUser(userData) {
        const { login, password } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `INSERT INTO userData (login, password) VALUES (?, ?)`,
                [login, password],
                (err) => (err ? reject(err) : resolve(true))
            )
        );
    }

    // получаем юзера
    static async getUserData(userData) {
        const { login } = userData;
        return new Promise((resolve, reject) =>
            db.get(
                "SELECT * FROM userData WHERE login = ?",
                [login],
                (err, row) =>
                    err ? reject(err) : !row ? resolve(null) : resolve(row)
            )
        );
    }

    // добавляем координаты и имя балуна
    static async saveBaloon(userData) {
        const { id_user, name, latitude, longitude } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `INSERT INTO mapData (id_user, name, latitude, longitude) VALUES (?, ?, ?, ?)`,
                [id_user, name, latitude, longitude],
                (err) => (err ? reject(err) : resolve("Метка - в базе"))
            )
        );
    }

    // получаем координаты и имя балуна
    static async getBaloons(userData) {
        const { id_user } = userData;
        return new Promise((resolve, reject) =>
            db.all(
                "SELECT * FROM mapData WHERE id_user = ?",
                [id_user],
                (err, row) =>
                    err ? reject(err) : !row ? resolve(null) : resolve([...row])
            )
        );
    }

    // обновляем координаты и имя балуна
    static async updateBaloon(userData) {
        const { id_user, name, latitude, longitude } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `UPDATE mapData SET name = ?, latitude = ?, longitude = ? WHERE id_user = ?`,
                [name, latitude, longitude, id_user],
                (err) => (err ? reject(err) : resolve("Метка обновлена"))
            )
        );
    }

    // удаляем балун
    static async deleteBaloon(userData) {
        const { id_user, name } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `DELETE FROM mapData WHERE id_user = ? AND name = ?`,
                [id_user, name],
                (err) => (err ? reject(err) : resolve("Метка удалена"))
            )
        );
    }
};
