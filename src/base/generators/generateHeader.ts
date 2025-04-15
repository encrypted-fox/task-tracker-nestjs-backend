import { I18nContext } from 'nestjs-i18n';

export function generateHeader(i18n: I18nContext, take: string[]) {
  const list = [
    {
      name: 'id',
      label: i18n.t('crud.id'),
      style: 'width: 100px;',
    },
    {
      name: 'username',
      label: i18n.t('crud.username'),
      style: 'width: 175px;',
    },
    {
      name: 'email',
      label: i18n.t('crud.email'),
      style: 'width: 175px;',
    },
    {
      name: 'phone',
      label: i18n.t('crud.phone'),
      style: 'width: 175px;',
    },
    {
      name: 'firstName',
      label: i18n.t('crud.firstName'),
      style: 'width: 175px;',
    },
    {
      name: 'middleName',
      label: i18n.t('crud.middleName'),
      style: 'width: 175px;',
    },
    {
      name: 'lastName',
      label: i18n.t('crud.lastName'),
      style: 'width: 175px;',
    },
    {
      name: 'avatar',
      label: i18n.t('crud.avatar'),
      style: 'width: 140px;',
    },
    {
      name: 'title',
      label: i18n.t('crud.title'),
      style: 'width: 175px;',
    },
    {
      name: 'description',
      label: i18n.t('crud.description'),
      style: 'width: 250px;',
    },
    {
      name: 'object',
      label: i18n.t('crud.object'),
      style: 'width: 250px;',
    },
    {
      name: 'attachments',
      label: i18n.t('crud.attachments'),
      style: 'width: 100px;',
    },
    {
      name: 'estimate',
      label: i18n.t('crud.estimate'),
      style: 'width: 200px;',
    },
    {
      name: 'value',
      label: i18n.t('crud.value'),
      style: 'width: 100px;',
    },
    {
      name: 'priority',
      label: i18n.t('crud.priority'),
      style: 'width: 140px;',
    },
    {
      name: 'column',
      label: i18n.t('crud.column'),
      style: 'width: 175px;',
    },
    {
      name: 'board',
      label: i18n.t('crud.board'),
      style: 'width: 140px;',
    },
    {
      name: 'project',
      label: i18n.t('crud.project'),
      style: 'width: 250px;',
    },
    {
      name: 'task',
      label: i18n.t('crud.task'),
      style: 'width: 175px;',
    },
    {
      name: 'relationType',
      label: i18n.t('crud.relationType'),
      style: 'width: 200px;',
    },
    {
      name: 'notificationType',
      label: i18n.t('crud.notificationType'),
      style: 'width: 200px;',
    },
    {
      name: 'role',
      label: i18n.t('crud.role'),
      style: 'width: 140px;',
    },
    {
      name: 'creator',
      label: i18n.t('crud.creator'),
      style: 'width: 250px;',
    },
    {
      name: 'relatedTasks',
      label: i18n.t('crud.relatedTasks'),
      style: 'width: 175px;',
    },
    {
      name: 'relatedUsers',
      label: i18n.t('crud.relatedUsers'),
      style: 'width: 175px;',
    },
    {
      name: 'teams',
      label: i18n.t('crud.teams'),
      style: 'width: 175px;',
    },
    {
      name: 'tags',
      label: i18n.t('crud.tags'),
      style: 'width: 100px;',
    },
    {
      name: 'createdAt',
      label: i18n.t('crud.createdAt'),
      style: 'width: 200px;',
    },
    {
      name: 'updatedAt',
      label: i18n.t('crud.updatedAt'),
      style: 'width: 200px;',
    },
    {
      name: 'deletedAt',
      label: i18n.t('crud.deletedAt'),
      style: 'width: 200px;',
    },
  ];

  return list.filter((item) => item.name in take);
}
