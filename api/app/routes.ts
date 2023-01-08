import log4js, {Logger} from "log4js";
import {Express} from "express";
import sequelize from "./modules/sequelize";
import Note from "./modules/note";

const log: Logger = log4js.getLogger("routes");

export default {
    configure: async (app: Express): Promise<void> => {

        await sequelize.configure();

        app.post("/note", async (req, res) => {
            try {
                return res.json(await Note.create(req.body));
            } catch (err) {
                log.error("Failed to post a note.", err);
                return res.status(500).json(err);
            }
        });

        app.get("/notes", async (req, res) => {
            try {
                return res.json(await Note.findAll());
            } catch (err) {
                return res.status(500).json(err);
            }
        });

        app.delete("/note", async (req, res) => {
            const id = req.body?.id;
            try {
                return res.json(await Note.destroy({where: {id}}));
            } catch (err) {
                log.error(`Failed to delete a note with id = ${id}.`, err);
                return res.status(500).json(err);
            }
        });
    },
};
