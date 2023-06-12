"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = __importDefault(require("../models/Todo"));
const mongoose_1 = __importDefault(require("mongoose"));
const asyncHandler = require('express-async-handler');
const getTodos = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const todos = yield Todo_1.default.aggregate([
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: 'tasks',
                localField: 'tasks',
                foreignField: '_id',
                as: 'tasks',
            },
        },
        {
            $project: {
                title: 1,
                tasks: {
                    _id: 1,
                    title: 1,
                    completed: 1,
                },
            },
        },
    ]);
    return res.status(200).json({ todos });
}));
module.exports = { getTodos };
