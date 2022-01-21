type DocbaseUser = {
  id: number;
  name: string;
  profile_image_url: string;
};

type DocbaseTag = {
  name: string;
};

type DocbaseComment = {
  id: number;
  body: string;
  created_at: Date;
  user: DocbaseUser;
};

type DocbaseGroup = {
  id: number;
  name: string;
};

type DocbaseAttachment = {
  id: string;
  name: string;
  size: number;
  url: string;
  markdown: string;
  created_at: Date;
};

export type DocbasePost = {
  id: number;
  title: string;
  body: string;
  draft: boolean;
  archived: boolean;
  url: string;
  created_at: Date;
  updated_at: Date;
  tags: DocbaseTag[];
  scope: string;
  sharing_url: string;
  representative_image_url: string;
  user: DocbaseUser;
  stars_count: number;
  good_jobs_count: number;
  comments: DocbaseComment[];
  groups: DocbaseGroup[];
  attachments: DocbaseAttachment[];
};
