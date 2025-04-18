import { TaskEntity } from '../../modules/tasks/tasks.entity';
import { UserEntity } from '../../modules/users/users.entity';
import { TeamEntity } from '../../modules/teams/teams.entity';
import { TagEntity } from '../../modules/tags/tags.entity';

export function generateData(items: any[], take: string[]) {
  return items.map((item: any) => generateItem(item, take));
}

function generateItem(item: any, take: string[]) {
  const data = {
    id: (el: any) => ({ label: `#${el?.id}` }),
    username: (el: any) => ({ label: el?.username }),
    email: (el: any) => ({ label: el?.email }),
    phone: (el: any) => ({ label: el?.phone }),
    firstName: (el: any) => ({ label: el?.firstName }),
    middleName: (el: any) => ({ label: el?.middleName }),
    lastName: (el: any) => ({ label: el?.lastName }),
    avatar: (el: any) => ({ img: el?.avatar }),
    title: (el: any) => ({ label: el?.title }),
    description: (el: any) => ({ label: el?.description }),
    object: (el: any) => ({ json: el?.object }),
    attachments: (el: any) => ({ label: el?.attachments?.length }),
    estimate: (el: any) => ({ label: el?.estimate }),
    value: (el: any) => ({ label: el?.value }),
    priority: (el: any) => ({
      label: el?.priority?.title,
      url: `priorities/${el?.priority?.id}`,
    }),
    column: (el: any) => ({
      label: el?.column?.title,
      url: `columns/${el?.column?.id}`,
    }),
    board: (el: any) => ({
      label: el?.board?.title,
      url: `boards/${el?.board?.id}`,
    }),
    project: (el: any) => ({
      label: el?.project?.title,
      url: `projects/${el?.project?.id}`,
    }),
    task: (el: any) => ({
      label: el?.task?.title,
      url: `tasks/${el?.task?.id}`,
    }),
    relationType: (el: any) => ({
      label: el?.relationType?.title,
      url: `relationTypes/${el?.relationType?.id}`,
    }),
    notificationType: (el: any) => ({
      label: el?.notificationType?.title,
      url: `notificationTypes/${el?.notificationType?.id}`,
    }),
    commentType: (el: any) => ({
      label: el?.commentType?.title,
      url: `commentTypes/${el?.commentType?.id}`,
    }),
    visibilityType: (el: any) => ({
      label: el?.visibilityType()?.title,
      url: `visibilityTypes/${el?.visibilityType?.id}`,
    }),
    role: (el: any) => ({
      label: el?.role?.title,
      url: `roles/${el?.role?.id}`,
    }),
    creator: (el: any) => ({
      label: `${el?.creator?.lastName} ${el?.creator?.firstName} ${el?.creator?.middleName}`,
      url: `users/${el?.creator?.id}`,
      img: el?.creator?.avatar,
    }),
    user: (el: any) => ({
      label: `${el?.user?.lastName} ${el?.user?.firstName} ${el?.user?.middleName}`,
      url: `users/${el?.user?.id}`,
      img: el?.user?.avatar,
    }),
    visibility: (el: any) => ({
      label: el?.visibility?.title,
      url: `visibilities/${el?.visibility?.id}`,
    }),
    relatedTasks: (el: any) => ({
      labels: el?.relatedTasks?.map((el: TaskEntity) => el.title),
      urls: el?.relatedTasks?.map((el: TaskEntity) => `tasks/${el.id}`),
    }),
    relatedUsers: (el: any) => ({
      labels: el?.relatedUsers?.map((el: UserEntity) => el.username),
      urls: el?.relatedTasks?.map((el: UserEntity) => `tasks/${el.id}`),
    }),
    teams: (el: any) => ({
      labels: el?.teams?.map((el: TeamEntity) => el.title),
      urls: el?.teams()?.map((el: TeamEntity) => `teams/${el.id}`),
    }),
    tags: (el: any) => ({
      labels: el?.tags?.map((el: TagEntity) => el.title),
      urls: el?.tags()?.map((el: TagEntity) => `tags/${el.id}`),
    }),
    createdAt: (el: any) => ({ label: el?.createdAt }),
    updatedAt: (el: any) => ({ label: el?.updatedAt }),
    deletedAt: (el: any) => ({ label: el?.deletedAt }),
  };

  const resp = {};

  for (const el of take) {
    resp[el] = data[el](item);
  }

  return resp;
}
