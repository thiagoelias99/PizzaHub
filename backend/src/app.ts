// import "./translation/YupTranslate";
import "dotenv/config";

import { server } from "./server";
import { Knex } from "./database/knex";

const startServer = () => {
    const port = process.env.PORT || 3333;
    server.listen(port, () => {
        const data = new Date();
        console.log(
            `Node server started in ${data} at "http://localhost:${port}"`
        );
    });
};

//Automatically run migration if not localhost
if (process.env.IS_LOCALHOST !== "true") {
    console.log("Running migration");

    /* Knex.migrate
        .latest()
        .then(() => {
            Knex.seed
                .run()
                .then(() => startServer())
                .catch(console.log);
        })
        .catch(console.log); */
    Knex.migrate
        .latest()
        .then(() => startServer())
        .catch(console.log);
} else {
    startServer();
}