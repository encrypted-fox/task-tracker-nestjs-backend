import { TasksEntity } from '../../modules/tasks/tasks.entity';
import { UsersEntity } from '../../modules/users/users.entity';
import { TeamsEntity } from '../../modules/teams/teams.entity';
import { TagsEntity } from '../../modules/tags/tags.entity';

export type DataPart = {
  json?: string;
  img?: string;
  label?: string;
  url?: string;
};

export type DataItem = { [key: string]: DataPart | DataPart[] };

export type Data = DataItem[];

export type DataFunctionList = {
  [key: string]: (el: any) => DataPart | DataPart[];
};

export function generateData(items: any[], take: string[]): Data {
  return items.map((item: any) => generateItem(item, take));
}

function generateItem(item: any, take: string[]): DataItem {
  const data: DataFunctionList = {
    id: (el: any): DataPart => ({ label: `#${el?.id}` }),
    username: (el: any): DataPart => ({ label: el?.username }),
    email: (el: any): DataPart => ({ label: el?.email }),
    phone: (el: any): DataPart => ({ label: el?.phone }),
    firstName: (el: any): DataPart => ({ label: el?.firstName }),
    middleName: (el: any): DataPart => ({ label: el?.middleName }),
    lastName: (el: any): DataPart => ({ label: el?.lastName }),
    avatar: (el: any): DataPart => ({ img: el?.avatar }),
    title: (el: any): DataPart => ({ label: el?.title }),
    description: (el: any): DataPart => ({ label: el?.description }),
    object: (el: any): DataPart => ({ json: el?.object }),
    attachments: (el: any): DataPart => ({ label: el?.attachments?.length }),
    estimate: (el: any): DataPart => ({ label: el?.estimate }),
    value: (el: any): DataPart => ({ label: el?.value }),
    priority: (el: any): DataPart => ({
      label: el?.priority?.title,
      url: `priorities/${el?.priority?.id}`,
    }),
    column: (el: any): DataPart => ({
      label: el?.column?.title,
      url: `columns/${el?.column?.id}`,
    }),
    board: (el: any): DataPart => ({
      label: el?.board?.title,
      url: `boards/${el?.board?.id}`,
    }),
    project: (el: any): DataPart => ({
      label: el?.project?.title,
      url: `projects/${el?.project?.id}`,
    }),
    task: (el: any): DataPart => ({
      label: el?.task?.title,
      url: `tasks/${el?.task?.id}`,
    }),
    relationType: (el: any): DataPart => ({
      label: el?.relationType?.title,
      url: `relationTypes/${el?.relationType?.id}`,
    }),
    notificationType: (el: any): DataPart => ({
      label: el?.notificationType?.title,
      url: `notificationTypes/${el?.notificationType?.id}`,
    }),
    commentType: (el: any): DataPart => ({
      label: el?.commentType?.title,
      url: `commentTypes/${el?.commentType?.id}`,
    }),
    visibilityType: (el: any): DataPart => ({
      label: el?.visibilityType()?.title,
      url: `visibilityTypes/${el?.visibilityType?.id}`,
    }),
    role: (el: any): DataPart => ({
      label: el?.role?.title,
      url: `roles/${el?.role?.id}`,
    }),
    creator: (el: any): DataPart => ({
      label: `${el?.creator?.lastName} ${el?.creator?.firstName} ${el?.creator?.middleName}`,
      url: `users/${el?.creator?.id}`,
      img: el?.creator?.avatar,
    }),
    user: (el: any): DataPart => ({
      label: `${el?.user?.lastName} ${el?.user?.firstName} ${el?.user?.middleName}`,
      url: `users/${el?.user?.id}`,
      img: el?.user?.avatar,
    }),
    visibility: (el: any): DataPart => ({
      label: el?.visibility?.title,
      url: `visibilities/${el?.visibility?.id}`,
    }),
    relatedTasks: (el: any): DataPart[] =>
      el?.relatedTasks?.map(
        (el: TasksEntity): DataPart => ({
          label: el.title,
          url: `tasks/${el.id}`,
        }),
      ),
    relatedUsers: (el: any): DataPart[] =>
      el?.relatedUsers?.map(
        (el: UsersEntity): DataPart => ({
          label: el?.username,
          url: `users/${el.id}`,
        }),
      ),
    teams: (el: any): DataPart[] =>
      el?.teams?.map(
        (el: TeamsEntity): DataPart => ({
          label: el?.title,
          url: `teams/${el.id}`,
        }),
      ),
    tags: (el: any): DataPart[] =>
      el?.tags?.map(
        (el: TagsEntity): DataPart => ({
          label: el?.title,
          url: `tags/${el.id}`,
        }),
      ),
    createdAt: (el: any): DataPart => ({ label: el?.createdAt }),
    updatedAt: (el: any): DataPart => ({ label: el?.updatedAt }),
    deletedAt: (el: any): DataPart => ({ label: el?.deletedAt }),
  };

  const resp: DataItem = {};

  for (const el of take) {
    resp[el] = data[el](item);
  }

  return resp;
}
