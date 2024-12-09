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

// src/services/catalog.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient();
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
import { PrismaClient as PrismaClient2 } from "@prisma/client";
import bcrypt from "bcryptjs";
var prisma2 = new PrismaClient2();
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
      const hashedPassword = yield bcrypt.hash(googleId, SALT_ROUNDS);
      return prisma2.user.create({
        data: { email, googleId, password: hashedPassword, name }
      });
    });
  }
  // Verify password during login
  verifyPassword(plainPassword, hashedPassword) {
    return __async(this, null, function* () {
      return bcrypt.compare(plainPassword, hashedPassword);
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
import { PrismaClient as PrismaClient3 } from "@prisma/client";
var prisma3 = new PrismaClient3();
var prismaClient_default = prisma3;
export {
  catalog_default as catalogService,
  prismaClient_default as prisma,
  user_default as userService
};
//# sourceMappingURL=index.mjs.map