import express from 'express';
import mongoose from 'mongoose';
import TermModel from './models/Term.js';
import appSrc from './app.js';

const Term = TermModel(mongoose);

const DBURL = 'mongodb+srv://glossary_reader:glossary_reader@cluster0.n7zyl.mongodb.net/mongodemo?retryWrites=true&w=majority';

try {
    await mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });

    const app = appSrc(express, mongoose, Term);

    app.listen(process.env.PORT ?? 3000);
} catch (e) {
    console.log(e.codeName);
}
