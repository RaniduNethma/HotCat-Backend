export const checkRole = (user: any, requiredRoles: string[]) => {
  if (!user) throw new Error('Unauthorized!');
  if (!requiredRoles.includes(user.role)) {
    throw new Error('Forbidden!');
  }
};
