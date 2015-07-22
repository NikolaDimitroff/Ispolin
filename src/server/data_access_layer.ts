/// <reference path="../../typings/bunyan/bunyan.d.ts" />
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

"use strict";
import bunyan = require("bunyan");
import mongoose = require("mongoose");

export default class DataAccessLayer {
    public static instance: DataAccessLayer;

    // A function that is already bound to this
    public onError: (err: string) => void;

    private db: mongoose.Connection;
    private logger: bunyan.Logger;

    constructor(url: string, logger: bunyan.Logger) {
        this.logger = logger;
        this.onError = (error: string) => this.onErrorCallback(error);

        mongoose.connect(url);
        this.db = mongoose.connection;
        this.db.on("error", console.error.bind(console, "connection error:"));
        this.db.once("open", () => {
            this.logger.info("DB Connection opened...");
        });
        DataAccessLayer.instance = this;
    }

    public onErrorCallback(message: string): void {
        if (message) {
            this.logger.error("A DB error occurred! %s", message);
        }
    };
}