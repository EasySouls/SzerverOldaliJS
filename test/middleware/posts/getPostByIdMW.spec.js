var expect = require('chai').expect;
var getPostByIdMW = require('../../../middleware/posts/getPostByIdMW');

describe('Middleware getPostByIdMW', () => {
  it('should set res.locals', async () => {
    const mw = getPostByIdMW({
      Post: {
        findOne: async (id) => {
          expect(id).to.be.eql({ _id: '123' });
          return { _id: '123' };
        },
      },
      User: {
        findOne: async (id) => {
          return { _id: '321' };
        },
      },
    });

    const resMock = {
      locals: {},
    };

    await mw(
      {
        params: { postId: '123' },
      },
      resMock,
      (err) => {
        expect(err).to.be.undefined;
        expect(resMock.locals.post).to.be.eql({
          _id: '123',
          author: { _id: '321' },
        });
      }
    );
  });

  it('should call next with error when no postId is provided', async () => {
    const mw = getPostByIdMW({
      Post: {
        findOne: async (id) => {
          return { _id: '123' };
        },
      },
      User: {
        findOne: async (id) => {
          return { _id: '321' };
        },
      },
    });

    const resMock = {
      locals: {},
    };

    await mw(
      {
        params: { definitelyNotAPostId: 'something else' },
      },
      resMock,
      (err) => {
        expect(err.message).to.be.eql('ID is required');
        expect(resMock.locals.post).to.be.undefined;
      }
    );
  });

  it('should call next with error when the is a database error', async () => {
    const mw = getPostByIdMW({
      Post: {
        findOne: async (id) => {
          expect(id).to.be.eql({ _id: '123' });
          throw 'Database error';
        },
      },
      User: {
        findOne: async (id) => {
          return { _id: '321' };
        },
      },
    });

    const resMock = {
      locals: {},
    };

    await mw(
      {
        params: { postId: '123' },
      },
      resMock,
      (err) => {
        expect(err).to.be.eql('Database error');
        expect(resMock.locals.post).to.be.undefined;
      }
    );
  });
});
