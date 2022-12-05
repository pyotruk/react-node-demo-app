import express, {Express} from "express";
import routes from "./routes";
import request from "supertest";
import cors from "cors";
import http from "http";
import Note from "./modules/note";

const api: Express = express();
api.use(express.json());
api.use(cors());

beforeAll(async () => {
    await routes.configure(api);
    http.createServer(api);
});

describe("testing-api-routes", () => {
    it("GET /notes - returns HTTP 200 & empty list", async () => {
        const {body} = await request(api).get("/notes");
        expect(body.length).toEqual(0);
    });

    it("POST /note - returns HTTP 200 & newly created note", async () => {
        const {body} = await request(api).post("/note").send({"text": "foo"});

        expect(body.hasOwnProperty("id")).toEqual(true);
        expect(body["id"]).toEqual(1);

        expect(body.hasOwnProperty("text")).toEqual(true);
        expect(body["text"]).toEqual("foo");
    });

    it("GET /notes - returns HTTP 200 & newly created note", async () => {
        const {body} = await request(api).get("/notes");

        expect(body.length).toEqual(1);
        const note: Note = body[0];

        expect(note.hasOwnProperty("id")).toEqual(true);
        expect(note["id"]).toEqual(1);

        expect(note.hasOwnProperty("text")).toEqual(true);
        expect(note["text"]).toEqual("foo");
    });
});