export type TableItem = {
  outerClass?: string;
  outerStyle?: string;
  innerClass?: string;
  innerStyle?: string;
  iconPrepend?: string;
  iconAppend?: string;
};

export type Table = { [key: string]: TableItem };

export function generateTable(take: string[]): Table {
  const list: Table = {
    id: {
      outerStyle: 'width: 100px;',
      innerClass: 'badge badge-secondary',
    },
    username: {
      outerStyle: 'width: 175px;',
      innerStyle: 'font-weight: bold; text-decoration: underline;',
      innerClass: 'text-primary text-ellipsis',
    },
    email: {
      outerStyle: 'width: 175px;',
      innerClass: 'text-primary text-ellipsis',
    },
    phone: {
      outerStyle: 'width: 175px;',
      innerClass: 'text-primary text-ellipsis',
    },
    firstName: {
      outerStyle: 'width: 175px;',
      innerClass: 'text-primary text-ellipsis',
    },
    middleName: {
      outerStyle: 'width: 175px;',
      innerClass: 'text-primary text-ellipsis',
    },
    lastName: {
      outerStyle: 'width: 175px;',
      innerClass: 'text-primary text-ellipsis',
    },
    avatar: {
      outerStyle: 'width: 140px;',
      innerClass: 'link text-ellipsis',
    },
    title: {
      outerStyle: 'width: 175px;',
      innerStyle: 'font-weight: bold; text-decoration: underline;',
      innerClass: 'text-primary text-ellipsis',
    },
    description: {
      outerStyle: 'width: 250px;',
      innerClass: 'text-primary text-ellipsis',
    },
    object: {
      outerStyle: 'width: 250px;',
      innerClass: 'text-primary text-ellipsis',
    },
    attachments: {
      iconAppend: 'attachment',
      outerStyle: 'width: 100px;',
      innerClass: 'text-primary text-ellipsis',
    },
    tags: {
      outerStyle: 'width: 100px;',
      innerClass: 'text-primary text-ellipsis',
    },
    estimate: {
      outerStyle: 'width: 200px;',
      innerClass: 'text-primary text-ellipsis',
      iconPrepend: 'estimate',
    },
    value: {
      outerStyle: 'width: 100px;',
      innerClass: 'text-primary text-ellipsis',
    },
    priority: {
      outerStyle: 'width: 140px;',
      innerClass: 'link text-ellipsis',
    },
    column: {
      outerStyle: 'width: 175px;',
      innerClass: 'link text-ellipsis',
    },
    board: {
      outerStyle: 'width: 140px;',
      innerClass: 'link text-ellipsis',
    },
    project: {
      outerStyle: 'width: 140px;',
      innerClass: 'link text-ellipsis',
    },
    task: {
      outerStyle: 'width: 175px;',
      innerClass: 'link text-ellipsis',
    },
    relationType: {
      outerStyle: 'width: 200px;',
      innerClass: 'link text-ellipsis',
    },
    notificationType: {
      outerStyle: 'width: 200px;',
      innerClass: 'link text-ellipsis',
    },
    commentType: {
      outerStyle: 'width: 200px;',
      innerClass: 'link text-ellipsis',
    },
    visibilityType: {
      outerStyle: 'width: 200px;',
      innerClass: 'link text-ellipsis',
    },
    role: {
      outerStyle: 'width: 175px;',
      innerClass: 'link text-ellipsis',
    },
    creator: {
      outerStyle: 'width: 250px;',
      innerClass: 'link text-ellipsis',
    },
    visibility: {
      outerStyle: 'width: 250px;',
      innerClass: 'link text-ellipsis',
    },
    user: {
      outerStyle: 'width: 250px;',
      innerClass: 'link text-ellipsis',
    },
    relatedTasks: {
      outerStyle: 'width: 175px;',
      innerClass: 'link text-ellipsis',
    },
    relatedUsers: {
      outerStyle: 'width: 175px;',
      innerClass: 'link text-ellipsis',
    },
    teams: {
      outerStyle: 'width: 175px;',
      innerClass: 'link text-ellipsis',
    },
    createdAt: {
      outerStyle: 'width: 250px;',
      innerClass: 'text-primary text-ellipsis',
    },
    updatedAt: {
      outerStyle: 'width: 250px;',
      innerClass: 'text-primary text-ellipsis',
    },
    deletedAt: {
      outerStyle: 'width: 250px;',
      innerClass: 'text-primary text-ellipsis',
    },
  };

  const taken: Table = {};

  for (const key in Object.keys(list)) {
    if (key in take) taken[key] = list[key];
  }

  return taken;
}
