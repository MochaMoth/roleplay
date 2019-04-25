const express = require("express");
const routes = require("./");
const controllers = require("../controllers");

const router = express.Router();

module.exports = router
    .get("/list/:start/:quantity", controllers.story.listStory)
    .get("/genre/list", controllers.story.listGenre)
    .get("/chapter/view/:story_id/:chapter_name", controllers.story.chapter)
    .post("/apply", controllers.story.apply)
    .post("/accept", controllers.story.acceptApplication)
    .post("/deny", controllers.story.denyApplication)

    .get("/:genre", controllers.story.genre)
    //.get("/", controllers.story.index)
    .post("/create", controllers.story.create)
    .get("/view/:story_id", controllers.story.story)
    .post("/chapter/create", controllers.story.create_chapter)