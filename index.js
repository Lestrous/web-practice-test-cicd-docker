import express from 'express';
import bodyParser from 'body-parser';
import { createReadStream } from 'fs';
import crypto from 'crypto';
import http from 'http';
import mongoose from 'mongoose';
import request from 'request';
import pug from 'pug';
import zombie from 'zombie';
// eslint-disable-next-line import/extensions
import UserModel from './models/User.js';
// eslint-disable-next-line import/extensions
import appSrc from './app.js';

const User = UserModel(mongoose);

const app = appSrc(
    express,
    bodyParser,
    createReadStream,
    crypto,
    http,
    mongoose,
    User,
    request,
    pug,
    zombie,
);

app.listen(process.env.PORT ?? 4321);
