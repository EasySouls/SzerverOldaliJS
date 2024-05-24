var expect = require('chai').expect;
var createPostMW = require('../../../middleware/posts/createPostMW');

describe('Middleware createPostMW', () => {
  it('should call next with error if req.title or req.content is undefined', async () => {
    const mw = createPostMW({
      Post: {},
    });

    const resMock = {
      locals: {},
    };

    const reqMock = {
      body: {},
    };

    await mw(reqMock, resMock, (err) => {
      expect(err.message).to.be.eql('Title and content are required');
      expect(resMock.locals.post).to.be.undefined;
    });
  });

  it('should set res.locals.post', async () => {
    class Post {
      async save() {}
    }
    const mw = createPostMW({
      Post: Post,
    });

    const resMock = {
      redirect: (url) => {
        expect(url).to.be.eql('/');
      },
      locals: {
        post: undefined,
      },
    };

    const reqMock = {
      body: {
        title: 'Title',
        content: 'Content',
      },
      user: {
        _id: '123',
      },
    };

    await mw(reqMock, resMock, (err) => {
      expect(err).to.be.undefined;
      expect(resMock.locals.post).to.be.eql({
        title: 'Title',
        body: 'Content',
        createdAt: new Date(),
        _author: '123',
      });
    });
  });

  it('should call next with error when save fails', async () => {
    class Post {
      async save() {
        throw 'Error';
      }
    }
    const mw = createPostMW({
      Post: Post,
    });

    const resMock = {
      redirect: (url) => {},
      locals: {
        post: undefined,
      },
    };

    const reqMock = {
      body: {
        title: 'Title',
        content: 'Content',
      },
      user: {
        _id: '123',
      },
    };

    await mw(reqMock, resMock, (err) => {
      expect(err).to.be.eql('Error');
    });
  });
});
