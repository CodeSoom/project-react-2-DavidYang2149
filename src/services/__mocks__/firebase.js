jest.mock('firebase', () => ({
  firestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      add: jest.fn().mockResolvedValue({
        id: 'abc123',
      }),
    }),
    FieldValue: {
      serverTimestamp: jest.fn().mockResolvedValue('MOCK_TIME'),
    },
  }),
  auth: jest.fn().mockReturnValue({
    createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
    signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => Promise.resolve(true)),
    onAuthStateChanged: jest.fn(),
    currentUser: {
      sendEmailVerification: jest.fn(() => Promise.resolve(true)),
      email: 'testman@gmail.com',
    },
  }),
}));
