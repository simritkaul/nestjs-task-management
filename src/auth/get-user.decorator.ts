import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

/**
 * Route handler parameter decorator. Extracts the user from the `req` object and populates the decorated
 * parameter with the value of user.
 *
 * For example:
 * ```typescript
 * async create(@GetUser() user: User)
 * ```
 *
 * @see [Request object](https://docs.nestjs.com/controllers#request-object)
 *
 */
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
