import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import courseResolver from "./course.resolver.js";
import lectureResolver from "./lecture.resolver.js";
import bookResolver from "./book.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, bookResolver]);

export default mergedResolvers;
