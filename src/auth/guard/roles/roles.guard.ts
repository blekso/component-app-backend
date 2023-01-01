import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

let globalRole;

export const RolesGuard = (role: string): Type<RoleGuardMixin> => {
  globalRole = role;
  const guard = mixin(RoleGuardMixin);
  return guard;
};

class RoleGuardMixin implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!globalRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return globalRole === user.role;
  }
}
