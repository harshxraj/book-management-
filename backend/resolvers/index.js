import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import bookResolver from "./book.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, bookResolver]);

export default mergedResolvers;
