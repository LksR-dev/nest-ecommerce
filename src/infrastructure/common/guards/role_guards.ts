import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/domain/adapters/role_enum';
import { ROLES_KEY } from '../decorators/role_decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.matchesRoles(requiredRoles, user.role);
  }

  matchesRoles(roles: Role[], userRole: string) {
    return roles.some((role) => role === userRole);
  }
}
