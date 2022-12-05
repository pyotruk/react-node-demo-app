import dotenv from "dotenv";
import {Sequelize} from "sequelize";
import log4js, {Logger} from "log4js";

dotenv.config();
const log: Logger = log4js.getLogger("sequelize");

const DB_URI = process.env.NODE_ENV === "dev"
    ? "sqlite::memory:"
    : `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}/${process.env.MYSQL_DATABASE}`;
const sequelize = new Sequelize(DB_URI);

export default {
    configure: async (): Promise<void> => {
        try {
            await sequelize.authenticate();

            // creates tables if they don't exist, but doesn't drop any
            await sequelize.sync({force: false});
        } catch (err) {
            log.fatal(`Failed to connect to DB_URI - ${DB_URI}`, err);
        }
    },
    getInstance: (): Sequelize => sequelize,
};