export default {
  buildUserData: (user) => {
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      isAnonymous: user.isAnonymous,
      photoURL: user.photoURL
    };
  }
};
