import { GoogleOAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new GoogleOAuthGuard()).toBeDefined();
  });
});
