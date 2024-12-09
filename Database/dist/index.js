"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  catalogService: () => catalog_default,
  prisma: () => prismaClient_default,
  userService: () => user_default
});
module.exports = __toCommonJS(src_exports);

// src/services/catalog.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var CatalogService = class {
  getAllProducts() {
    return __async(this, null, function* () {
      return yield prisma.product.findMany();
    });
  }
  createProduct(data) {
    return __async(this, null, function* () {
      return yield prisma.product.create({
        data
      });
    });
  }
  getProductById(id) {
    return __async(this, null, function* () {
      return yield prisma.product.findUnique({
        where: { id }
      });
    });
  }
  updateProduct(id, data) {
    return __async(this, null, function* () {
      return yield prisma.product.updateMany({
        where: { id },
        data
      });
    });
  }
  deleteProduct(id) {
    return __async(this, null, function* () {
      const deletedProduct = yield prisma.product.deleteMany({
        where: { id }
      });
      return deletedProduct.count > 0;
    });
  }
};
var catalog_default = new CatalogService();

// src/services/user.ts
var import_client2 = require("@prisma/client");
var import_bcryptjs = __toESM(require("bcryptjs"));
var prisma2 = new import_client2.PrismaClient();
var SALT_ROUNDS = 10;
var UserService = class {
  // Get user by user ID
  getUserById(id) {
    return __async(this, null, function* () {
      return prisma2.user.findUnique({ where: { id } });
    });
  }
  // Get user by email
  getUserByEmail(email) {
    return __async(this, null, function* () {
      return prisma2.user.findUnique({ where: { email } });
    });
  }
  // Create a user with an encrypted password
  createUser(email, password, name) {
    return __async(this, null, function* () {
      return prisma2.user.create({
        data: { email, password, name }
      });
    });
  }
  // Get user by Google ID
  getUserByGoogleId(googleId) {
    return __async(this, null, function* () {
      return prisma2.user.findUnique({ where: { googleId } });
    });
  }
  // Create a user with Google authentication
  createUserWithGoogle(email, googleId, name) {
    return __async(this, null, function* () {
      const hashedPassword = yield import_bcryptjs.default.hash(googleId, SALT_ROUNDS);
      return prisma2.user.create({
        data: { email, googleId, password: hashedPassword, name }
      });
    });
  }
  // Verify password during login
  verifyPassword(plainPassword, hashedPassword) {
    return __async(this, null, function* () {
      return import_bcryptjs.default.compare(plainPassword, hashedPassword);
    });
  }
  // Update user password
  updatePassword(userId, newPassword) {
    return __async(this, null, function* () {
      return prisma2.user.update({
        where: { id: userId },
        data: { password: newPassword }
      });
    });
  }
};
var user_default = new UserService();

// src/prismaClient.ts
var import_client3 = require("@prisma/client");
var prisma3 = new import_client3.PrismaClient();
var prismaClient_default = prisma3;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  catalogService,
  prisma,
  userService
});
//# sourceMappingURL=index.js.map