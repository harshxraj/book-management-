import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./user.typeDef.js";
import courseTypeDef from "./course.typeDef.js";
import lectureTypeDef from "./lecture.typeDef.js";
import bookTypeDef from "./book.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, bookTypeDef]);

export default mergedTypeDefs;
