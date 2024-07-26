import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
} from "@/lib/appwrite/config";

// APPWRITE API
export const createUserAccount = async ({
  email,
  password,
  name,
  username,
}) => {
  try {
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name,
    );

    if (!userAccount)
      throw new Error("Error:", "There was a problem by creating the account.");

    const avatarUrl = avatars.getInitials(name);

    const userDB = await saveUserToDB({
      accountId: userAccount.$id,
      name: userAccount.name,
      username,
      email: userAccount.email,
      avatarUrl,
    });

    // create friendship user

    if (userDB) {
      const friendshipUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.friendshipCollectionId,
        ID.unique(),
        {
          user: userDB.$id,
        },
      );

      if (!friendshipUser) throw new Error("Error creating friendship user");
    }

    return userDB;
  } catch (error) {
    throw Error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const userSession = await account.createEmailPasswordSession(
      email,
      password,
    );

    return userSession;
  } catch (error) {
    throw new Error(
      "Error:",
      "There was a problem by getting the user account to get a session.",
    );
  }
};

export const getCurrentUser = async () => {
  try {
    //1.- get the session to check if there is an active session
    const currentSession = await account.getSession("current");
    console.log(currentSession);
    if (!currentSession) return null;

    //2.- if there is a session, get the account.
    const currentAccount = await account.get();

    if (!currentAccount.emailVerification)
      throw new Error("Account is not verified. Please verify account");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", [currentAccount.$id])],
    );

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const logout = async () => {
  try {
    const deleteSession = await account.deleteSession("current");

    if (deleteSession) return { status: "OK" };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

// HELPER FUNCTIONS
const saveUserToDB = async ({
  accountId,
  name,
  username,
  email,
  avatarUrl,
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      { accountId, name, username, email, avatarUrl },
    );

    return newUser;
  } catch (error) {
    throw new Error(`Error by saving user in database, ${error.message}`);
  }
};

export const createUserAccountWithVerification = async ({
  email,
  password,
  name,
  username,
}) => {
  try {
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name,
    );

    if (!userAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(name);

    // Crear una sesión temporal para enviar el correo de verificación
    await account.createEmailPasswordSession(email, password);

    // Enviar el correo de verificación
    await account.createVerification(appwriteConfig.emailVerificationURL);

    // Cerrar la sesión temporal
    await account.deleteSession("current");

    const userDB = await saveUserToDB({
      accountId: userAccount.$id,
      name: userAccount.name,
      username,
      email: userAccount.email,
      avatarUrl,
    });

    // create friendship user

    if (userDB) {
      const friendshipUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.friendshipCollectionId,
        ID.unique(),
        {
          user: userDB.$id,
        },
      );

      if (!friendshipUser) throw new Error("Failed to create friendship user");
    }
    return userDB;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Registration failed: ${error.message}`
        : "Registration failed due to an unknown error";

    throw new Error(errorMessage);
  }
};

export const loginWithVerification = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    if (!session)
      throw new Error("There was a problem creating the user session.");

    // Espera un momento para asegurar que la sesión se ha establecido
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = await account.get();

    if (!user.emailVerification) {
      await account.deleteSession("current");
      throw new Error(
        "The email is not verified. Please enter a valid email or create an account",
      );
    }

    return session;
  } catch (error) {
    if (error.type === "user_invalid_credentials") {
      throw new Error("Invalid email or password.");
    } else {
      throw error;
    }
  }
};

export const updateVerificationEmail = async ({ userId, secret }) => {
  try {
    const verification = await account.updateVerification(userId, secret);

    return verification;
  } catch (error) {
    throw new Error("There was an error verifying the email");
  }
};
