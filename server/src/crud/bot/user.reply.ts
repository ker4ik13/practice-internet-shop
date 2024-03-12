import { User } from 'src/crud/user/user.schema';

export const userReply = (user: User) => {
  return `
	${
    user.blocked.isBlocked
      ? `<b>Аккаунт забанен!</b>\nПричина: ${user.blocked.blockReason}\n`
      : ''
  }
	<b>Имя:</b> ${user.info.firstName}
	<b>Фамилия:</b> ${user.info.lastName}
	<b>Email:</b> ${user.email}
	<b>Дата регистрации:</b> ${new Date(user.private.createdAt).toLocaleString(
    'ru',
  )}
	`;
};

// <b>Роли:</b> ${user.roles.map((role) => role.label)}
