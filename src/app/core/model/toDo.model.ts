export class getListToDoModel {
  unitId?: string;
  ownerId?: string;
  assigner?: string;
  assignee?: string;
  pageNumber: number;
  pageSize: number;
}

export class createToDoModel {
  title?: string;
  description?: string;
  priority?: number;
  status?: number;
  createdDate?: string;
  modifiedDate?: string;
  dueDate?: string;
  owner?: string;
  ownerName?: string;
  assigner?: string;
  assignee?: string;
  assigneeName?: string;
  unitId?: string;
}
export class updateToDoModel {
  id?: string;
  title?: string;
  description?: string;
  priority?: number;
  status?: number;
  createdDate?: string;
  modifiedDate?: string;
  dueDate?: string;
  owner?: string;
  ownerName?: string;
  assigner?: string;
  assignee?: string;
  assigneeName?: string;
  unitId?: string;
}
